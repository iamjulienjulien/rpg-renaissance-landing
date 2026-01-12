// src/app/api/subscribe/unsubscribe/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "node:crypto";

/* ============================================================================
HELPERS
============================================================================ */

function jsonError(message: string, status = 400) {
    return NextResponse.json({ error: message }, { status });
}

function safeTrim(x: unknown): string {
    return typeof x === "string" ? x.trim() : "";
}

function sha256(value: string) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

/* ============================================================================
POST /api/subscribe/unsubscribe
Body: { token: string }
============================================================================ */

export async function POST(req: Request) {
    let body: any;
    try {
        body = await req.json();
    } catch {
        return jsonError("Invalid JSON body", 400);
    }

    const token = safeTrim(body?.token);
    if (!token) return jsonError("Missing token", 400);

    const token_hash = sha256(token);
    const supabase = supabaseAdmin();

    try {
        // 1) find token
        // On supporte 2 schémas:
        // - soit tu ajoutes des tokens unsubscribe dans newsletter_optin_tokens (purpose='unsubscribe')
        // - soit tu as une table dédiée newsletter_unsubscribe_tokens (pas créée ici)
        //
        // Ici: on utilise newsletter_optin_tokens avec purpose='unsubscribe'
        const { data: tok, error: tokErr } = await supabase
            .from("newsletter_optin_tokens")
            .select("id,subscriber_id,expires_at,confirmed_at,revoked_at,purpose")
            .eq("token_hash", token_hash)
            .eq("purpose", "unsubscribe")
            .maybeSingle();

        // Réponse neutre (anti-enumeration)
        if (tokErr || !tok?.id) {
            return NextResponse.json(
                { ok: true, message: "Si l’adresse existe, elle sera désinscrite." },
                { status: 200 }
            );
        }

        if (tok.revoked_at) {
            return NextResponse.json(
                { ok: true, message: "Si l’adresse existe, elle sera désinscrite." },
                { status: 200 }
            );
        }

        const expiresAt = tok.expires_at ? new Date(tok.expires_at).getTime() : 0;
        if (!expiresAt || Date.now() > expiresAt) {
            return NextResponse.json(
                { ok: true, message: "Si l’adresse existe, elle sera désinscrite." },
                { status: 200 }
            );
        }

        const nowIso = new Date().toISOString();

        // 2) Mark token used (confirmed_at)
        await supabase
            .from("newsletter_optin_tokens")
            .update({ confirmed_at: nowIso })
            .eq("id", tok.id);

        // 3) Update subscriber -> unsubscribed
        // (Choisis ton vocabulaire de status; ici j'utilise 'unsubscribed')
        await supabase
            .from("newsletter_subscribers")
            .update({
                status: "unsubscribed",
                unsubscribed_at: nowIso,
            })
            .eq("id", tok.subscriber_id);

        // 4) Log consent event
        await supabase.from("newsletter_consent_events").insert({
            subscriber_id: tok.subscriber_id,
            event_type: "unsubscribe",
            source: "list_unsubscribe",
            consent_version: "v1",
            privacy_policy_version: "2026-01-11",
        });

        return NextResponse.json(
            { ok: true, message: "Tu es bien désinscrit. Merci d’avoir voyagé avec nous 🧭" },
            { status: 200 }
        );
    } catch {
        // réponse neutre
        return NextResponse.json(
            { ok: true, message: "Si l’adresse existe, elle sera désinscrite." },
            { status: 200 }
        );
    }
}

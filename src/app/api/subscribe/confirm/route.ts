// src/app/api/subscribe/confirm/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "node:crypto";

/* ============================================================================
HELPERS
============================================================================ */

function sha256(value: string) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

function safeTrim(x: unknown): string {
    return typeof x === "string" ? x.trim() : "";
}

/* ============================================================================
GET /api/subscribe/confirm?token=...
============================================================================ */

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = safeTrim(url.searchParams.get("token"));

    const siteUrl = safeTrim(process.env.NEXT_PUBLIC_SITE_URL) || url.origin;

    const redirectOk = NextResponse.redirect(new URL("/?confirmed=1", siteUrl), 302);
    const redirectFail = NextResponse.redirect(new URL("/?confirmed=0", siteUrl), 302);

    if (!token) return redirectFail;

    const token_hash = sha256(token);
    const supabase = supabaseAdmin();

    try {
        // 1) Find token row
        const { data: tok, error: tokErr } = await supabase
            .from("newsletter_optin_tokens")
            .select("id,subscriber_id,expires_at,confirmed_at,revoked_at")
            .eq("token_hash", token_hash)
            .maybeSingle();

        if (tokErr || !tok?.id) return redirectFail;

        if (tok.revoked_at) return redirectFail;

        // Déjà confirmé: OK (idempotent)
        if (tok.confirmed_at) return redirectOk;

        const expiresAt = tok.expires_at ? new Date(tok.expires_at).getTime() : 0;
        if (!expiresAt || Date.now() > expiresAt) return redirectFail;

        const nowIso = new Date().toISOString();

        // 2) Mark token confirmed
        const { error: markErr } = await supabase
            .from("newsletter_optin_tokens")
            .update({ confirmed_at: nowIso })
            .eq("id", tok.id);

        if (markErr) return redirectFail;

        // 3) Update subscriber status -> confirmed
        const { error: subErr } = await supabase
            .from("newsletter_subscribers")
            .update({
                status: "confirmed",
                confirmed_at: nowIso,
            })
            .eq("id", tok.subscriber_id);

        if (subErr) return redirectFail;

        // 4) Log RGPD event: confirm
        // ✅ event_at default now() donc pas besoin de le passer
        await supabase.from("newsletter_consent_events").insert({
            subscriber_id: tok.subscriber_id,
            event_type: "confirm",
            source: "double_opt_in",
            consent_version: "v1",
            privacy_policy_version: "2026-01-11",
        });

        return redirectOk;
    } catch {
        return redirectFail;
    }
}

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

function json(body: any, status = 200) {
    return NextResponse.json(body, { status });
}

/* ============================================================================
GET /api/subscribe/confirm?token=...
============================================================================ */

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = safeTrim(url.searchParams.get("token"));

    if (!token) {
        return json({ ok: false, reason: "missing_token" }, 400);
    }

    const token_hash = sha256(token);
    const supabase = supabaseAdmin();

    try {
        // 1) Lookup token
        const { data: tok, error: tokErr } = await supabase
            .from("newsletter_optin_tokens")
            .select("id,subscriber_id,expires_at,confirmed_at,revoked_at")
            .eq("token_hash", token_hash)
            .maybeSingle();

        if (tokErr || !tok) {
            return json({ ok: false, reason: "invalid" }, 404);
        }

        if (tok.revoked_at) {
            return json({ ok: false, reason: "revoked" }, 400);
        }

        // Déjà confirmé → idempotent
        if (tok.confirmed_at) {
            return json({ ok: true, already: true }, 200);
        }

        const expiresAt = tok.expires_at ? new Date(tok.expires_at).getTime() : 0;
        if (!expiresAt || Date.now() > expiresAt) {
            return json({ ok: false, reason: "expired" }, 400);
        }

        const nowIso = new Date().toISOString();

        // 2) Mark token confirmed
        const { error: markErr } = await supabase
            .from("newsletter_optin_tokens")
            .update({ confirmed_at: nowIso })
            .eq("id", tok.id);

        if (markErr) {
            return json({ ok: false, reason: "token_update_failed" }, 500);
        }

        // 3) Update subscriber
        const { error: subErr } = await supabase
            .from("newsletter_subscribers")
            .update({
                status: "confirmed",
                confirmed_at: nowIso,
            })
            .eq("id", tok.subscriber_id);

        if (subErr) {
            return json({ ok: false, reason: "subscriber_update_failed" }, 500);
        }

        // 4) RGPD event
        await supabase.from("newsletter_consent_events").insert({
            subscriber_id: tok.subscriber_id,
            event_type: "confirm",
            source: "double_opt_in",
            consent_version: "v1",
            privacy_policy_version: "2026-01-11",
        });

        return json({ ok: true }, 200);
    } catch (e) {
        return json({ ok: false, reason: "server_error" }, 500);
    }
}

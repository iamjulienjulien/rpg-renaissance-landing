// src/app/api/subscribe/unsubscribe/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "node:crypto";
import { Resend } from "resend";

/* ============================================================================
I18N (server)
============================================================================ */

type ApiLocale = "fr" | "en";

function getReqLocale(req: Request): ApiLocale {
    const raw = (req.headers.get("x-locale") || "").toLowerCase();
    return raw === "fr" ? "fr" : "en"; // fallback en
}

const MESSAGES: Record<ApiLocale, { neutral: string; success: string }> = {
    fr: {
        neutral: "Si l’adresse existe, elle sera désinscrite.",
        success: "Tu es bien désinscrit. Merci d’avoir voyagé avec nous 🧭",
    },
    en: {
        neutral: "If the address exists, it will be unsubscribed.",
        success: "You’ve been unsubscribed. Thanks for traveling with us 🧭",
    },
};

/* ============================================================================
HELPERS
============================================================================ */

function json(body: any, status = 200) {
    return NextResponse.json(body, { status });
}

function safeTrim(x: unknown): string {
    return typeof x === "string" ? x.trim() : "";
}

function sha256(value: string) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

async function updateResendContactUnsubscribed(args: {
    resendContactId: string;
    unsubscribedAtIso: string;
}) {
    const apiKey = safeTrim(process.env.RESEND_API_KEY);
    if (!apiKey) throw new Error("Missing env: RESEND_API_KEY");

    const resend = new Resend(apiKey);

    const updated = await resend.contacts.update({
        id: args.resendContactId,
        unsubscribed: true,
        properties: {
            status: "unsubscribed",
            unsubscribed_at: args.unsubscribedAtIso,
        },
    });

    if (updated?.error) {
        throw new Error(updated.error.message || "Resend: failed to update contact");
    }

    const contactId = args.resendContactId;
    const segmentId = safeTrim(process.env.RESEND_SEGMENT_ID);
    if (!segmentId) console.warn("[resend] Missing env: RESEND_SEGMENT_ID");

    const removed = await resend.contacts.segments.remove({
        contactId,
        segmentId,
    });

    if (removed?.error) {
        throw new Error(removed.error.message || "Resend: failed to remove contact from segment");
    }
}

/* ============================================================================
POST /api/subscribe/unsubscribe
Body: { token: string }
============================================================================ */

export async function POST(req: Request) {
    const locale = getReqLocale(req);
    const msg = MESSAGES[locale];

    let body: any;
    try {
        body = await req.json();
    } catch {
        // Réponse neutre (anti-enumeration), localisée
        return json({ ok: true, message: msg.neutral }, 200);
    }

    const token = safeTrim(body?.token);
    if (!token) {
        return json({ ok: true, message: msg.neutral }, 200);
    }

    const token_hash = sha256(token);
    const supabase = supabaseAdmin();

    try {
        const { data: tok, error: tokErr } = await supabase
            .from("newsletter_optin_tokens")
            .select("id,subscriber_id,expires_at,confirmed_at,revoked_at,purpose")
            .eq("token_hash", token_hash)
            .eq("purpose", "unsubscribe")
            .maybeSingle();

        // Toujours neutre si doute / pas trouvé / invalide
        if (tokErr || !tok?.id) {
            return json({ ok: true, message: msg.neutral }, 200);
        }

        if (tok.revoked_at) {
            return json({ ok: true, message: msg.neutral }, 200);
        }

        const expiresAt = tok.expires_at ? new Date(tok.expires_at).getTime() : 0;
        if (!expiresAt || Date.now() > expiresAt) {
            return json({ ok: true, message: msg.neutral }, 200);
        }

        const nowIso = new Date().toISOString();

        if (!tok.confirmed_at) {
            await supabase
                .from("newsletter_optin_tokens")
                .update({ confirmed_at: nowIso })
                .eq("id", tok.id);
        }

        await supabase
            .from("newsletter_subscribers")
            .update({ status: "unsubscribed", unsubscribed_at: nowIso })
            .eq("id", tok.subscriber_id);

        try {
            const { data: sub } = await supabase
                .from("newsletter_subscribers")
                .select("resend_contact_id")
                .eq("id", tok.subscriber_id)
                .maybeSingle();

            if (sub?.resend_contact_id) {
                await updateResendContactUnsubscribed({
                    resendContactId: sub.resend_contact_id,
                    unsubscribedAtIso: nowIso,
                });
            }
        } catch (e) {
            console.error("[resend] unsubscribe sync failed", e);
        }

        await supabase.from("newsletter_consent_events").insert({
            subscriber_id: tok.subscriber_id,
            event_type: "unsubscribe",
            source: "list_unsubscribe",
            consent_version: "v1",
            privacy_policy_version: "2026-01-11",
        });

        // Success localisé
        return json({ ok: true, message: msg.success }, 200);
    } catch {
        return json({ ok: true, message: msg.neutral }, 200);
    }
}

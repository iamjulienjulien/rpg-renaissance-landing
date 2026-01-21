// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/subscribeSchema";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "node:crypto";
import { Resend } from "resend";
import { CONFIRM_EMAIL_COPY, type ConfirmEmailLocale } from "./confirm-email.copy";

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

function makeToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString("hex");
}

// ✅ Ne stocke JAMAIS l’IP brute
function hashIp(rawIp: string | null, salt: string) {
    if (!rawIp) return null;
    return sha256(`${rawIp}:${salt}`);
}

// best-effort extraction
function getClientIp(headers: Headers) {
    return (
        headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headers.get("x-real-ip") ?? null
    );
}

function getLandingContext(headers: Headers) {
    const userAgent = headers.get("user-agent");
    const referrer = headers.get("referer");

    let landingPath: string | null = null;
    let origin: string | null = null;

    try {
        const u = new URL(referrer ?? "");
        landingPath = u.pathname;
        origin = u.origin;
    } catch {}

    let utm: Record<string, string | null> = {
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_term: null,
        utm_content: null,
    };

    try {
        const u = new URL(referrer ?? "");
        utm = {
            utm_source: u.searchParams.get("utm_source"),
            utm_medium: u.searchParams.get("utm_medium"),
            utm_campaign: u.searchParams.get("utm_campaign"),
            utm_term: u.searchParams.get("utm_term"),
            utm_content: u.searchParams.get("utm_content"),
        };
    } catch {}

    const locale = headers.get("accept-language")?.split(",")[0] ?? null;

    return { userAgent, referrer, landingPath, origin, locale, utm };
}

function buildSiteUrl(origin: string | null) {
    const env = safeTrim(process.env.NEXT_PUBLIC_SITE_URL);
    const candidate = env || safeTrim(origin) || "http://localhost:3000";

    try {
        const u = new URL(candidate);
        return u.toString().replace(/\/$/, "");
    } catch {
        return "http://localhost:3000";
    }
}

// helper à ajouter dans route.ts (près des autres helpers)
function pickLocale(args: { referrer: string | null; acceptLanguage: string | null }): "fr" | "en" {
    // 1) ?lang=xx dans l’URL de provenance
    if (args.referrer) {
        try {
            const u = new URL(args.referrer);
            const qp = (u.searchParams.get("lang") ?? "").toLowerCase();
            if (qp === "fr" || qp === "en") return qp;
        } catch {}
    }

    // 2) Accept-Language
    const al = (args.acceptLanguage ?? "").toLowerCase();
    if (al.startsWith("fr")) return "fr";
    if (al.startsWith("en")) return "en";

    return "en";
}

function withLang(url: string, locale: "fr" | "en") {
    try {
        const u = new URL(url);
        u.searchParams.set("lang", locale);
        return u.toString();
    } catch {
        // fallback ultra safe (au cas où)
        const sep = url.includes("?") ? "&" : "?";
        return `${url}${sep}lang=${locale}`;
    }
}

/* ============================================================================
RESEND CONTACTS
============================================================================ */

async function upsertResendContact(args: {
    email: string;
    locale: string | null;
    landingPath: string | null;
    utm: Record<string, string | null>;
}) {
    const apiKey = safeTrim(process.env.RESEND_API_KEY);
    if (!apiKey) throw new Error("Missing env: RESEND_API_KEY");

    const resend = new Resend(apiKey);

    // Custom properties Resend (clé/valeur simples)
    const properties: Record<string, string> = {
        status: "pending",
    };

    if (args.locale) properties.locale = args.locale;
    if (args.landingPath) properties.landing_path = args.landingPath;

    for (const [k, v] of Object.entries(args.utm)) {
        if (v) properties[k] = v;
    }

    try {
        const created = await resend.contacts.create({
            email: args.email,
            unsubscribed: true,
            properties,
        });

        if (created?.error) {
            throw new Error(created.error.message);
        }

        if (created?.data?.id) {
            const contactId = created?.data?.id;

            const segmentId = safeTrim(process.env.RESEND_SEGMENT_ID);
            if (!segmentId) console.warn("[resend] Missing env: RESEND_SEGMENT_ID");

            const added = await resend.contacts.segments.add({
                contactId,
                segmentId,
            });
            if (added?.error) {
                throw new Error(added.error.message);
            }

            return created.data.id;
        }

        throw new Error("Resend: unexpected contacts.create response");
    } catch (err: any) {
        /**
         * Cas important:
         * Resend renvoie une erreur si le contact existe déjà.
         * On NE FAIL PAS, on considère que le contact existe.
         *
         * Comme Resend ne permet pas toujours un retrieve by email,
         * on adopte une stratégie simple:
         * - on log
         * - on retourne null
         * - la DB reste source de vérité
         */
        const message = String(err?.message ?? "");

        if (message.toLowerCase().includes("exist")) {
            console.warn("[resend] contact already exists for", args.email);
            return null;
        }

        throw err;
    }
}

/* ============================================================================
EMAIL (Resend) — double opt-in + List-Unsubscribe
============================================================================ */

async function sendDoubleOptInEmail(args: {
    email: string;
    confirmUrl: string;
    unsubscribeUrl: string;
    locale: ConfirmEmailLocale;
}) {
    const apiKey = safeTrim(process.env.RESEND_API_KEY);
    if (!apiKey) throw new Error("Missing env: RESEND_API_KEY");

    const from =
        safeTrim(process.env.RESEND_FROM_EMAIL) || "RPG Renaissance <onboarding@resend.dev>";

    const replyTo = safeTrim(process.env.RESEND_REPLY_TO) || undefined;

    const t = <K extends keyof typeof CONFIRM_EMAIL_COPY>(key: K) =>
        CONFIRM_EMAIL_COPY[key][args.locale];

    const subject = t("subject");
    const preheader = t("preheader");

    const html = `
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
  ${preheader}
</div>

<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; background:#0b0f1a; color:#ffffff; padding:24px; border-radius:14px;">
  <div style="max-width:560px;margin:0 auto;">
    <h1 style="margin:0 0 10px; font-size:20px; font-weight:700;">
      ${t("title")}
    </h1>

    <p style="margin:0 0 14px; color:rgba(255,255,255,0.82); line-height:1.6;">
      ${t("p1_before_brand")}<strong>RPG Renaissance</strong>${t("p1_after_brand")}
    </p>

    <div style="margin:18px 0 16px;">
      <a href="${args.confirmUrl}"
         style="display:inline-block;background:#ffffff;color:#0b0f1a;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:12px;">
        ${t("cta_confirm")}
      </a>
    </div>

    <p style="margin:0 0 10px; color:rgba(255,255,255,0.62); font-size:12px; line-height:1.5;">
      ${t("fallback_link")}
      <br/>
      <span style="word-break:break-all;color:rgba(255,255,255,0.78);">${args.confirmUrl}</span>
    </p>

    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.10); margin:18px 0;" />

    <p style="margin:0; color:rgba(255,255,255,0.50); font-size:12px; line-height:1.6;">
      ${t("footer_ignore")}
      <br/>
      <span style="color:rgba(255,255,255,0.45);">
        ${t("footer_unsubscribe_label")}
        <a href="${
            args.unsubscribeUrl
        }" style="color:rgba(255,255,255,0.75); text-decoration:underline;">
          ${args.unsubscribeUrl}
        </a>
      </span>
    </p>
  </div>
</div>
`.trim();

    const text = `
${t("text_title")}

${t("text_p1")}

${args.confirmUrl}

${t("text_ignore")}

${t("text_unsub")}
${args.unsubscribeUrl}
`.trim();

    const resend = new Resend(apiKey);
    const entityRefId = crypto.randomUUID();

    const { error } = await resend.emails.send({
        from,
        to: args.email,
        subject,
        html,
        text,
        replyTo,
        headers: {
            "X-Entity-Ref-ID": entityRefId,
            "List-Unsubscribe": `<${args.unsubscribeUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
    });

    if (error) throw new Error(error.message || "Resend: failed to send email");
}

/* ============================================================================
POST /api/subscribe
============================================================================ */

export async function POST(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return jsonError("Invalid JSON body", 400);
    }

    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
        return jsonError(parsed.error.issues[0]?.message ?? "Invalid payload", 400);
    }

    const email = safeTrim(parsed.data.email).toLowerCase();
    const consent = parsed.data.consent === true;

    if (!email) return jsonError("Email required", 400);
    if (!consent) return jsonError("Consent required", 400);

    const headers = req.headers;

    const ipSalt = safeTrim(process.env.IP_HASH_SALT);
    if (!ipSalt) return jsonError("Missing env: IP_HASH_SALT", 500);

    const rawIp = getClientIp(headers);
    const ip_hash = hashIp(rawIp, ipSalt);

    const { userAgent, referrer, landingPath, origin, locale, utm } = getLandingContext(headers);
    const siteUrl = buildSiteUrl(origin);

    const supabase = supabaseAdmin();

    try {
        // 0) lookup existing
        const { data: existing, error: existingErr } = await supabase
            .from("newsletter_subscribers")
            .select("id,status,email")
            .eq("email", email)
            .maybeSingle();

        if (existingErr) return jsonError("Unable to save subscription", 500);

        // Déjà confirmé => OK silencieux
        if (existing?.id && (existing.status === "confirmed" || existing.status === "subscribed")) {
            return NextResponse.json({ ok: true, already: true }, { status: 200 });
        }

        // bounced/complained => OK silencieux
        if (existing?.id && (existing.status === "complained" || existing.status === "bounced")) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const nowIso = new Date().toISOString();

        // 1) Upsert subscriber en pending (+ meta RGPD)
        const { data: subscriber, error: upsertErr } = await supabase
            .from("newsletter_subscribers")
            .upsert(
                {
                    id: existing?.id ?? undefined,
                    email,
                    status: "pending",

                    consent_given: true,
                    consent_at: nowIso,
                    consent_version: "v1",
                    privacy_policy_version: "2026-01-11",
                    consent_source: "landing_form",

                    locale,
                    user_agent: userAgent,
                    referrer,
                    landing_path: landingPath,
                    ...utm,

                    ip_hash,

                    last_optin_sent_at: nowIso,
                },
                { onConflict: "email" }
            )
            .select("id,email,status")
            .single();

        if (upsertErr || !subscriber?.id) {
            return jsonError("Unable to save subscription", 500);
        }

        // 1bis) Create contact in Resend (CRM)
        let resend_contact_id: string | null = null;

        try {
            resend_contact_id = await upsertResendContact({
                email,
                locale,
                landingPath,
                utm,
            });
        } catch (e) {
            // Choix volontaire: on ne bloque PAS l’inscription
            console.error("[resend] contact create failed", e);
        }

        // Stockage si on a un id
        if (resend_contact_id) {
            await supabase
                .from("newsletter_subscribers")
                .update({
                    resend_contact_id,
                    resend_contact_status: "pending",
                    resend_contact_updated_at: nowIso,
                })
                .eq("id", subscriber.id);
        }

        // 2) Create double opt-in token (store ONLY hash)
        const rawToken = makeToken(32);
        const token_hash = sha256(rawToken);
        const expiresAtIso = new Date(Date.now() + 48 * 3600 * 1000).toISOString();

        // Invalider anciens tokens actifs (double opt-in)
        await supabase
            .from("newsletter_optin_tokens")
            .update({ revoked_at: nowIso })
            .eq("subscriber_id", subscriber.id)
            .eq("purpose", "double_opt_in")
            .is("confirmed_at", null)
            .is("revoked_at", null);

        const { error: tokErr } = await supabase.from("newsletter_optin_tokens").insert({
            subscriber_id: subscriber.id,
            token_hash,
            purpose: "double_opt_in",
            expires_at: expiresAtIso,
            sent_at: nowIso,

            landing_path: landingPath,
            referrer,
            ...utm,
            ip_hash,
            user_agent: userAgent,
        });

        if (tokErr) return jsonError("Unable to create confirmation token", 500);

        // 2bis) Create unsubscribe token (store ONLY hash)
        // (long TTL: 30 jours, ajustable)
        const rawUnsubToken = makeToken(32);
        const unsub_token_hash = sha256(rawUnsubToken);
        const unsubExpiresAtIso = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();

        // Invalider anciens tokens actifs (unsubscribe)
        await supabase
            .from("newsletter_optin_tokens")
            .update({ revoked_at: nowIso })
            .eq("subscriber_id", subscriber.id)
            .eq("purpose", "unsubscribe")
            .is("confirmed_at", null)
            .is("revoked_at", null);

        const { error: unsubErr } = await supabase.from("newsletter_optin_tokens").insert({
            subscriber_id: subscriber.id,
            token_hash: unsub_token_hash,
            purpose: "unsubscribe",
            expires_at: unsubExpiresAtIso,
            sent_at: nowIso,

            landing_path: landingPath,
            referrer,
            ...utm,
            ip_hash,
            user_agent: userAgent,
        });

        if (unsubErr) return jsonError("Unable to create unsubscribe token", 500);

        // 3) Log RGPD event
        await supabase.from("newsletter_consent_events").insert({
            subscriber_id: subscriber.id,
            event_type: "subscribe_request",
            source: "landing_form",
            consent_version: "v1",
            privacy_policy_version: "2026-01-11",
            landing_path: landingPath,
            referrer,
            ...utm,
            ip_hash,
            user_agent: userAgent,
        });

        // 4) Send email (Resend)
        try {
            const acceptLanguage = headers.get("accept-language");
            const emailLocale = pickLocale({ referrer, acceptLanguage });

            const confirmUrl = withLang(
                `${siteUrl}/subscribe/confirm?token=${encodeURIComponent(rawToken)}`,
                emailLocale
            );

            const unsubscribeUrl = withLang(
                `${siteUrl}/unsubscribe?token=${encodeURIComponent(rawUnsubToken)}`,
                emailLocale
            );

            await sendDoubleOptInEmail({
                email,
                confirmUrl,
                unsubscribeUrl,
                locale: emailLocale,
            });
        } catch (e) {
            return jsonError(e instanceof Error ? e.message : "Email send failed", 500);
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return jsonError("Server error", 500);
    }
}

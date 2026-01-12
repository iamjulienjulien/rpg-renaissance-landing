// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/subscribeSchema";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "node:crypto";
import { Resend } from "resend";

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
        // valide et normalise
        const u = new URL(candidate);
        return u.toString().replace(/\/$/, "");
    } catch {
        return "http://localhost:3000";
    }
}

/* ============================================================================
EMAIL (Resend)
============================================================================ */

async function sendDoubleOptInEmail(args: { email: string; confirmUrl: string }) {
    const apiKey = safeTrim(process.env.RESEND_API_KEY);
    if (!apiKey) throw new Error("Missing env: RESEND_API_KEY");

    const from =
        safeTrim(process.env.RESEND_FROM_EMAIL) || "RPG Renaissance <onboarding@resend.dev>";

    const subject = "Confirme ton inscription à RPG Renaissance ✨";

    const html = `
<div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; background:#0b0f1a; color:#fff; padding:28px; border-radius:16px;">
  <div style="max-width:560px;margin:0 auto;">
    <h1 style="margin:0 0 10px; font-size:22px; letter-spacing:-0.02em;">
      Active ta quête: confirmation requise 🗡️
    </h1>
    <p style="margin:0 0 16px; color:rgba(255,255,255,0.78); line-height:1.6;">
      Tu as demandé à rejoindre la liste <b>RPG Renaissance</b>.
      Clique sur le bouton ci-dessous pour confirmer (double opt-in).
    </p>

    <div style="margin:22px 0;">
      <a href="${args.confirmUrl}"
         style="display:inline-block; background:#ffffff; color:#0b0f1a; text-decoration:none; font-weight:700; padding:12px 16px; border-radius:14px;">
        ✅ Confirmer mon email
      </a>
    </div>

    <p style="margin:0 0 12px; color:rgba(255,255,255,0.62); font-size:12px; line-height:1.5;">
      Si le bouton ne fonctionne pas, copie-colle ce lien:
      <br/>
      <span style="word-break:break-all; color:rgba(255,255,255,0.75);">${args.confirmUrl}</span>
    </p>

    <p style="margin:18px 0 0; color:rgba(255,255,255,0.45); font-size:12px;">
      Si tu n’es pas à l’origine de cette demande, ignore simplement cet email.
    </p>
  </div>
</div>
`.trim();

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
        from,
        to: args.email,
        subject,
        html,
    });

    if (error) {
        // error.message existe généralement, mais on reste safe
        throw new Error(error.message || "Resend: failed to send email");
    }
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

        // Déjà confirmé => OK silencieux (anti-spam / anti-leak)
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

        // 2) Create a double opt-in token (store ONLY hash)
        const rawToken = makeToken(32);
        const token_hash = sha256(rawToken);
        const expiresAtIso = new Date(Date.now() + 48 * 3600 * 1000).toISOString();

        // Invalider anciens tokens actifs (best effort)
        await supabase
            .from("newsletter_optin_tokens")
            .update({ revoked_at: nowIso })
            .eq("subscriber_id", subscriber.id)
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
        const confirmUrl = `${siteUrl}/api/subscribe/confirm?token=${rawToken}`;

        try {
            await sendDoubleOptInEmail({ email, confirmUrl });
        } catch (e) {
            // Choix produit:
            // A) retourner 500 pour que le front affiche "réessaie"
            // B) retourner 200 pour ne pas aider les abuseurs (email enumeration)
            // Ici je garde 500 car tu es en phase build, c’est plus simple à débug.
            return jsonError(e instanceof Error ? e.message : "Email send failed", 500);
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return jsonError("Server error", 500);
    }
}

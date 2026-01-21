// src/components/Landing/SubscribeForm.tsx
"use client";

import React, { useMemo, useState } from "react";
import { subscribeSchema } from "@/lib/subscribeSchema";
import { SUBSCRIBE_COPY, type SubscribeLocale, type SubscribeCopyKey } from "./subscribe.copy";
import { track } from "@/helpers/plausible";
import { useLocale } from "@/components/I18n/LocaleProvider";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function SubscribeForm() {
    const locale = useLocale() as SubscribeLocale;
    const t = <K extends SubscribeCopyKey>(key: K) => SUBSCRIBE_COPY[key][locale];

    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(true);
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    const canSubmit = useMemo(() => {
        return email.trim().length > 3 && consent && !loading;
    }, [email, consent, loading]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOk(null);
        setErr(null);

        const parsed = subscribeSchema.safeParse({ email: email.trim(), consent });
        if (!parsed.success) {
            setErr(parsed.error.issues[0]?.message ?? (t("error_invalid_form") as string));
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(parsed.data),
            });

            const j = await res.json().catch(() => null);

            if (!res.ok) {
                track("subscribe_error");
                setErr((j?.error as string) || (t("error_generic") as string));
                return;
            }
            track("subscribe_submit");
            setOk("check-email");
            setEmail("");
        } catch {
            setErr(t("error_network") as string);
        } finally {
            setLoading(false);
        }
    };

    if (ok === "check-email") {
        return (
            <div className="rounded-2xl bg-sky-500/10 ring-1 ring-sky-500/20 p-5">
                <div className="text-sm font-semibold text-sky-100">{t("success_title")}</div>

                <div className="mt-2 text-sm text-sky-100/80 leading-relaxed">
                    {t("success_body_line1")}
                    <br />
                    {t("success_body_line2")}
                </div>

                <div className="mt-3 text-xs text-sky-100/70">{t("success_hint_spam")}</div>

                <div className="mt-4 text-[11px] text-sky-100/60">{t("fineprint_unsubscribe")}</div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-black/35 ring-1 ring-white/10 p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="text-sm font-semibold text-white/90">{t("title")}</div>
                    <div className="mt-1 text-xs text-white/60">{t("subtitle")}</div>
                </div>
                <div className="text-xs rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-white/70">
                    {t("badge_early")}
                </div>
            </div>

            <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("email_placeholder")}
                    type="email"
                    autoComplete="email"
                    className={cn(
                        "h-11 w-full rounded-2xl bg-black/30 px-4 text-sm text-white/90",
                        "ring-1 ring-white/10 outline-none placeholder:text-white/40",
                        "focus:ring-2 focus:ring-white/25"
                    )}
                />
                <p className="mt-1 text-xs text-white/50 leading-relaxed max-w-xl">
                    {t("helper_invite")}
                </p>

                <label className="flex items-center gap-2 text-xs text-white/60">
                    <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                    />
                    {t("consent_label")}
                </label>

                <button
                    type="submit"
                    disabled={!canSubmit}
                    className={cn(
                        "h-11 rounded-2xl font-semibold transition",
                        canSubmit
                            ? "bg-white text-black hover:bg-white/90"
                            : "bg-white/10 text-white/40 ring-1 ring-white/10 cursor-not-allowed"
                    )}
                >
                    {loading ? t("cta_loading") : t("cta_submit")}
                </button>

                {err ? (
                    <div className="text-xs text-red-300 bg-red-500/10 ring-1 ring-red-500/20 rounded-2xl px-3 py-2">
                        {err}
                    </div>
                ) : null}

                <div className="text-[11px] text-white/45">{t("fineprint_unsubscribe")}</div>
            </form>
        </div>
    );
}

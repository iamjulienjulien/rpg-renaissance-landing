import type { Metadata } from "next";
import React from "react";

import { getRequestLocale } from "@/components/I18n/getRequestLocale";
import { PRIVACY_COPY, type PrivacyLocale, type PrivacyCopyKey } from "./privacy.copy";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-3xl bg-black/25 ring-1 ring-white/10 p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-semibold text-white/90">{title}</h2>
            <div className="text-sm text-white/70 leading-relaxed space-y-2">{children}</div>
        </section>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getRequestLocale()) as PrivacyLocale;
    const t = <K extends PrivacyCopyKey>(key: K) => PRIVACY_COPY[key][locale];

    return {
        title: t("meta_title"),
        description: t("meta_description"),
        alternates: { canonical: "/privacy" },
        robots: { index: true, follow: true },
    };
}

export default async function PrivacyPage() {
    const locale = (await getRequestLocale()) as PrivacyLocale;
    const t = <K extends PrivacyCopyKey>(key: K) => PRIVACY_COPY[key][locale];

    return (
        <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
            <header className="mb-10 space-y-3">
                <p className="text-xs tracking-[0.22em] text-white/55 uppercase">{t("kicker")}</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {t("page_title")}
                </h1>
                <p className="text-sm text-white/60">
                    {t("last_update_label")} <b>{t("last_update_date")}</b>
                </p>
            </header>

            <div className="space-y-4">
                <Section title={t("section_controller_title")}>
                    <p>
                        {t("controller_p1").replace("RPG Renaissance", "")}
                        <b>RPG Renaissance</b>.
                    </p>
                    <p>
                        {t("controller_contact_label")}{" "}
                        <a className="underline" href="mailto:hello@rpg-renaissance.com">
                            hello@rpg-renaissance.com
                        </a>
                    </p>
                </Section>

                <Section title={t("section_collected_title")}>
                    <p>{t("collected_intro")}</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t("collected_item_email")}</li>
                        <li>{t("collected_item_consent")}</li>
                        <li>{t("collected_item_tech")}</li>
                        <li>{t("collected_item_referrer")}</li>
                        <li>{t("collected_item_iphash")}</li>
                    </ul>
                </Section>

                <Section title={t("section_purposes_title")}>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t("purposes_item_waitlist")}</li>
                        <li>{t("purposes_item_project_updates")}</li>
                        <li>{t("purposes_item_analytics")}</li>
                    </ul>
                </Section>

                <Section title={t("section_legal_basis_title")}>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <b>Consentement</b> :{" "}
                            {t("legal_basis_item_consent").replace("Consentement :", "").trim()}
                        </li>
                        <li>
                            <b>Intérêt légitime</b> :{" "}
                            {t("legal_basis_item_legitimate_interest")
                                .replace("Intérêt légitime :", "")
                                .trim()}
                        </li>
                    </ul>
                </Section>

                <Section title={t("section_recipients_title")}>
                    <p>{t("recipients_intro")}</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t("recipients_item_email_provider")}</li>
                        <li>{t("recipients_item_db")}</li>
                        <li>{t("recipients_item_hosting")}</li>
                        <li>{t("recipients_item_analytics")}</li>
                    </ul>
                </Section>

                <Section title={t("section_retention_title")}>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t("retention_item_waitlist")}</li>
                        <li>{t("retention_item_logs")}</li>
                        <li>{t("retention_item_consent_proof")}</li>
                    </ul>
                </Section>

                <Section title={t("section_rights_title")}>
                    <p>{t("rights_p1")}</p>
                    <p>
                        {t("rights_p2_label")}{" "}
                        <a className="underline" href="mailto:hello@rpg-renaissance.com">
                            hello@rpg-renaissance.com
                        </a>
                    </p>
                    <p>{t("rights_p3")}</p>
                </Section>

                <Section title={t("section_cookies_title")}>
                    <p>{t("cookies_p1")}</p>
                </Section>
            </div>
        </main>
    );
}

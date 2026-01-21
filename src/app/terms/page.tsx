import type { Metadata } from "next";
import React from "react";

import { getRequestLocale } from "@/components/I18n/getRequestLocale";
import { TERMS_COPY, type TermsLocale, type TermsCopyKey } from "./terms.copy";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-3xl bg-black/25 ring-1 ring-white/10 p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-semibold text-white/90">{title}</h2>
            <div className="text-sm text-white/70 leading-relaxed space-y-2">{children}</div>
        </section>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getRequestLocale()) as TermsLocale;
    const t = <K extends TermsCopyKey>(key: K) => TERMS_COPY[key][locale];

    return {
        title: t("meta_title"),
        description: t("meta_description"),
        alternates: { canonical: "/terms" },
        robots: { index: true, follow: true },
    };
}

export default async function TermsPage() {
    const locale = (await getRequestLocale()) as TermsLocale;
    const t = <K extends TermsCopyKey>(key: K) => TERMS_COPY[key][locale];

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
                <Section title={t("section_object_title")}>
                    <p>
                        {t("object_p1").replace("RPG Renaissance", "")}
                        <b>RPG Renaissance</b>,{" "}
                        {t("object_p1").split("RPG Renaissance,")[1]?.trim() ?? ""}
                    </p>
                </Section>

                <Section title={t("section_access_title")}>
                    <p>{t("access_p1")}</p>
                </Section>

                <Section title={t("section_waitlist_title")}>
                    <p>{t("waitlist_p1")}</p>
                </Section>

                <Section title={t("section_wellbeing_title")}>
                    <p>
                        <b>{t("wellbeing_p1")}</b>
                    </p>
                    <p>{t("wellbeing_p2")}</p>
                    <p>{t("wellbeing_p3")}</p>
                    <p>{t("wellbeing_p4")}</p>
                </Section>

                <Section title={t("section_liability_title")}>
                    <p>{t("liability_p1")}</p>
                    <p>{t("liability_p2")}</p>
                </Section>

                <Section title={t("section_ip_title")}>
                    <p>{t("ip_p1")}</p>
                </Section>

                <Section title={t("section_changes_title")}>
                    <p>{t("changes_p1")}</p>
                </Section>

                <Section title={t("section_contact_title")}>
                    <p>
                        {t("contact_p1_label")}{" "}
                        <a className="underline" href="mailto:hello@rpg-renaissance.com">
                            hello@rpg-renaissance.com
                        </a>
                    </p>
                </Section>
            </div>
        </main>
    );
}

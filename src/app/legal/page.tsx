import type { Metadata } from "next";
import React from "react";
import { getRequestLocale } from "@/components/I18n/getRequestLocale";
import { LEGAL_COPY, type LegalLocale, type LegalCopyKey } from "./legal.copy";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-3xl bg-black/25 ring-1 ring-white/10 p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-semibold text-white/90">{title}</h2>
            <div className="text-sm text-white/70 leading-relaxed space-y-2">{children}</div>
        </section>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getRequestLocale()) as LegalLocale;
    const t = <K extends LegalCopyKey>(key: K) => LEGAL_COPY[key][locale];

    return {
        title: t("meta_title"),
        description: t("meta_description"),
        alternates: { canonical: "/legal" },
        robots: { index: true, follow: true },
    };
}

export default async function LegalPage() {
    const locale = (await getRequestLocale()) as LegalLocale;
    const t = <K extends LegalCopyKey>(key: K) => LEGAL_COPY[key][locale];

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
                <Section title={t("section_publisher_title")}>
                    <p>
                        {t("publisher_intro").replace("RPG Renaissance", "")}
                        <b>RPG Renaissance</b>.
                    </p>

                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            {t("publisher_list_name_label")} <b>Julien Julien</b>
                        </li>
                        <li>
                            {t("publisher_list_contact_label")}{" "}
                            <a className="underline" href="mailto:hello@rpg-renaissance.com">
                                hello@rpg-renaissance.com
                            </a>
                        </li>
                        <li>
                            {t("publisher_list_status_label")}{" "}
                            <b>Particulier (sans statut juridique à ce jour)</b>
                        </li>
                    </ul>

                    <p className="text-xs text-white/50">{t("publisher_law_note")}</p>
                </Section>

                <Section title={t("section_hosting_title")}>
                    <p>{t("hosting_intro")}</p>
                    <address className="mb-4">
                        <strong>Vercel Inc.</strong>
                        <br />
                        440 N Barranca Ave #4133
                        <br />
                        Covina, CA 91723
                        <br />
                        États-Unis <br />
                        <a
                            href="https://vercel.com"
                            target="_blank"
                            className="underline not-italic"
                        >
                            https://vercel.com
                        </a>
                    </address>
                    <p>{t("hosting_note")}</p>
                </Section>

                <Section title={t("section_ip_title")}>
                    <p>{t("ip_p1")}</p>
                    <p>{t("ip_p2")}</p>
                </Section>

                <Section title={t("section_liability_title")}>
                    <p>{t("liability_p1")}</p>
                    <p>{t("liability_p2")}</p>
                </Section>

                <div className="pt-6 text-xs text-white/50">
                    {t("footer_contact_question")}{" "}
                    <a className="underline" href="mailto:hello@rpg-renaissance.com">
                        hello@rpg-renaissance.com
                    </a>
                </div>
            </div>
        </main>
    );
}

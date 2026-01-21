import type { Metadata } from "next";
import React from "react";
import PlausibleEvent from "./plausible-event";

import { getRequestLocale } from "@/components/I18n/getRequestLocale";
import { CONFIRM_COPY, type ConfirmLocale, type ConfirmCopyKey } from "./confirm.copy";

type SearchParamsValue = string | string[] | undefined;
type SearchParamsShape = Record<string, SearchParamsValue>;

type Props = {
    searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
};

function pickFirst(v: SearchParamsValue): string | null {
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v[0] ?? null;
    return null;
}

async function confirmOptIn(token: string) {
    // ✅ côté server: utilise une URL “site” stable (NEXT_PUBLIC_SITE_URL)
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${base}/api/subscribe/confirm?token=${encodeURIComponent(token)}`, {
        cache: "no-store",
    });

    if (!res.ok) return { ok: false };
    return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getRequestLocale()) as ConfirmLocale;
    const t = <K extends ConfirmCopyKey>(key: K) => CONFIRM_COPY[key][locale];

    return {
        title: t("meta_title"),
        robots: { index: false, follow: true },
    };
}

export default async function SubscribeConfirmPage({ searchParams }: Props) {
    const locale = (await getRequestLocale()) as ConfirmLocale;
    const t = <K extends ConfirmCopyKey>(key: K) => CONFIRM_COPY[key][locale];

    const sp =
        searchParams && typeof (searchParams as any)?.then === "function"
            ? await (searchParams as Promise<SearchParamsShape>)
            : (searchParams as SearchParamsShape | undefined);

    const token = pickFirst(sp?.token)?.trim() ?? "";

    if (!token) {
        return (
            <ConfirmLayout>
                <Title>{t("invalid_title")}</Title>
                <Text>
                    {t("invalid_body_line1")}
                    <br />
                    {t("invalid_body_line2")}
                </Text>
            </ConfirmLayout>
        );
    }

    let result: any = null;

    try {
        result = await confirmOptIn(token);
    } catch {
        return (
            <ConfirmLayout>
                <Title>{t("error_title")}</Title>
                <Text>
                    {t("error_body_line1")}
                    <br />
                    {t("error_body_line2")}
                </Text>
            </ConfirmLayout>
        );
    }

    if (result?.already) {
        return (
            <ConfirmLayout>
                <PlausibleEvent name="subscribe_confirmed_already" />
                <Title>{t("already_title")}</Title>
                <Text>
                    {t("already_body_line1")}
                    <br />
                    {t("already_body_line2")}
                </Text>
                <PrimaryLink href="/">{t("already_cta")}</PrimaryLink>
            </ConfirmLayout>
        );
    }

    if (!result?.ok) {
        return (
            <ConfirmLayout>
                <Title>{t("failed_title")}</Title>
                <Text>
                    {t("failed_body_line1")}
                    <br />
                    {t("failed_body_line2")}
                </Text>
                <PrimaryLink href="/">{t("failed_cta")}</PrimaryLink>
            </ConfirmLayout>
        );
    }

    return (
        <ConfirmLayout>
            <PlausibleEvent name="subscribe_confirmed" />

            <Title>{t("ok_title")}</Title>

            <Text>
                {t("ok_body_line1_before_brand")} <b>{t("brand")}</b>{" "}
                {t("ok_body_line1_after_brand")}
                <br />
                {t("ok_body_line2")}
            </Text>

            <Divider />

            <Text subtle>
                {t("ok_subtle_line1")}
                <br />
                {t("ok_subtle_line2")}
            </Text>

            <PrimaryLink href="/">{t("ok_cta")}</PrimaryLink>
        </ConfirmLayout>
    );
}

/* ============================================================================
UI components (inline, simples)
============================================================================ */

function ConfirmLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-4">
            <div className="w-full max-w-md rounded-3xl bg-black/60 ring-1 ring-white/10 p-8 text-center backdrop-blur-xl space-y-5">
                {children}
            </div>
        </main>
    );
}

function Title({ children }: { children: React.ReactNode }) {
    return <h1 className="text-xl font-semibold tracking-tight text-white/90">{children}</h1>;
}

function Text({ children, subtle = false }: { children: React.ReactNode; subtle?: boolean }) {
    return (
        <p
            className={
                subtle
                    ? "text-sm text-white/50 leading-relaxed"
                    : "text-sm text-white/70 leading-relaxed"
            }
        >
            {children}
        </p>
    );
}

function Divider() {
    return <div className="h-px bg-white/10 my-2" />;
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
        >
            {children}
        </a>
    );
}

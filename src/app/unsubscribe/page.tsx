import UnsubscribeClient from "./unsubscribe-client";
import type { Metadata } from "next";

import { getRequestLocale } from "@/components/I18n/getRequestLocale";
import {
    UNSUBSCRIBE_COPY,
    type UnsubscribeLocale,
    type UnsubscribeCopyKey,
} from "./unsubscribe.copy";

export const dynamic = "force-dynamic";

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

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getRequestLocale()) as UnsubscribeLocale;
    const t = <K extends UnsubscribeCopyKey>(key: K) => UNSUBSCRIBE_COPY[key][locale];

    return {
        title: t("meta_title"),
        robots: { index: false, follow: true },
    };
}

export default async function UnsubscribePage({ searchParams }: Props) {
    const locale = (await getRequestLocale()) as UnsubscribeLocale;

    const sp =
        searchParams && typeof (searchParams as any)?.then === "function"
            ? await (searchParams as Promise<SearchParamsShape>)
            : (searchParams as SearchParamsShape | undefined);

    const token = pickFirst(sp?.token)?.trim() ?? "";

    return <UnsubscribeClient token={token} locale={locale} />;
}

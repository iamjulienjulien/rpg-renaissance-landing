// src/app/unsubscribe/page.tsx
import UnsubscribeClient from "./unsubscribe-client";

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

export default async function UnsubscribePage({ searchParams }: Props) {
    const sp =
        searchParams && typeof (searchParams as any)?.then === "function"
            ? await (searchParams as Promise<SearchParamsShape>)
            : (searchParams as SearchParamsShape | undefined);

    const token = pickFirst(sp?.token)?.trim() ?? "";

    return <UnsubscribeClient token={token} />;
}

import { cookies, headers } from "next/headers";
import type { AppLocale } from "./LocaleProvider";

export async function getRequestLocale(): Promise<AppLocale> {
    // 1) header posé par middleware
    const h = await headers();
    const fromHeader = h.get("x-locale");
    if (fromHeader === "fr" || fromHeader === "en") return fromHeader;

    // 2) cookie (fallback)
    const c = await cookies();
    const fromCookie = c.get("lang")?.value;
    if (fromCookie === "fr" || fromCookie === "en") return fromCookie;

    return "en";
}

import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = new Set(["en", "fr"] as const);
type Locale = "en" | "fr";

function normalizeLang(x: string | null): Locale | null {
    if (!x) return null;
    const v = x.toLowerCase();
    if (SUPPORTED.has(v as Locale)) return v as Locale;
    return null;
}

function detectFromAcceptLanguage(headerValue: string | null): Locale | null {
    if (!headerValue) return null;

    // Ex: "fr-FR,fr;q=0.9,en;q=0.8"
    const parts = headerValue
        .split(",")
        .map((s) => s.trim())
        .map((chunk) => {
            const [tag, ...rest] = chunk.split(";");
            const qPart = rest.find((x) => x.trim().startsWith("q="));
            const q = qPart ? Number(qPart.split("=")[1]) : 1;
            const base = tag.toLowerCase().split("-")[0]; // fr-FR -> fr
            return { base, q: Number.isFinite(q) ? q : 0 };
        })
        .sort((a, b) => b.q - a.q);

    for (const p of parts) {
        const v = normalizeLang(p.base);
        if (v) return v;
    }
    return null;
}

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // 1) query param ?lang=en|fr (prioritaire)
    const fromQuery = normalizeLang(url.searchParams.get("lang"));

    // 2) cookie
    const fromCookie = normalizeLang(req.cookies.get("lang")?.value ?? null);

    // 3) navigateur (Accept-Language)
    const fromHeader = detectFromAcceptLanguage(req.headers.get("accept-language"));

    const locale: Locale = fromQuery ?? fromCookie ?? fromHeader ?? "en";

    // Option A (simple): on stocke en cookie et on propage en header pour le layout
    const res = NextResponse.next({
        request: {
            headers: new Headers(req.headers),
        },
    });

    res.cookies.set("lang", locale, {
        path: "/",
        sameSite: "lax",
        // si tu veux persister longtemps:
        maxAge: 60 * 60 * 24 * 365,
    });

    res.headers.set("x-locale", locale);

    // Optionnel: si ?lang=xx était présent, tu peux le "nettoyer" via redirect vers l’URL sans param
    // (SEO + URLs propres). Décommente si tu veux ce comportement.
    //
    // if (fromQuery) {
    //     const clean = new URL(url.toString());
    //     clean.searchParams.delete("lang");
    //     const redirect = NextResponse.redirect(clean);
    //     redirect.cookies.set("lang", locale, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
    //     redirect.headers.set("x-locale", locale);
    //     return redirect;
    // }

    return res;
}

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)"],
};

// src/app/subscribe/confirm/page.tsx
import type { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
    title: "Confirmation",
    robots: {
        index: false,
        follow: true,
    },
};

type SearchParamsValue = string | string[] | undefined;
type SearchParamsShape = Record<string, SearchParamsValue>;

type Props = {
    // Next peut te passer soit un objet, soit une Promise (selon version / config)
    searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
};

function pickFirst(v: SearchParamsValue): string | null {
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v[0] ?? null;
    return null;
}

async function confirmOptIn(token: string) {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${base}/api/subscribe/confirm?token=${encodeURIComponent(token)}`, {
        cache: "no-store",
    });

    if (!res.ok) return { ok: false };
    return res.json();
}

export default async function SubscribeConfirmPage({ searchParams }: Props) {
    const sp =
        searchParams && typeof (searchParams as any)?.then === "function"
            ? await (searchParams as Promise<SearchParamsShape>)
            : (searchParams as SearchParamsShape | undefined);

    const token = pickFirst(sp?.token)?.trim() ?? "";

    console.log("t", token);

    if (!token) {
        return (
            <ConfirmLayout>
                <Title>❌ Lien invalide</Title>
                <Text>
                    Ce parchemin est illisible.
                    <br />
                    Le lien de confirmation est manquant ou incorrect.
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
                <Title>⚠️ Une magie a mal tourné</Title>
                <Text>
                    Impossible de confirmer ton inscription pour le moment.
                    <br />
                    Réessaie plus tard.
                </Text>
            </ConfirmLayout>
        );
    }

    if (result?.already) {
        return (
            <ConfirmLayout>
                <Title>✅ Déjà confirmé</Title>
                <Text>
                    Ta quête est déjà active.
                    <br />
                    Tu es bien inscrit à RPG Renaissance.
                </Text>
            </ConfirmLayout>
        );
    }

    if (!result?.ok) {
        return (
            <ConfirmLayout>
                <Title>❌ Confirmation échouée</Title>
                <Text>
                    Ce lien a peut-être expiré.
                    <br />
                    Tu peux recommencer depuis la page d’inscription.
                </Text>
                <PrimaryLink href="/">↩ Retour à la landing</PrimaryLink>
            </ConfirmLayout>
        );
    }

    useEffect(() => {
        if (window.plausible) {
            window.plausible("subscribe_confirmed");
        }
    }, []);

    return (
        <ConfirmLayout>
            <Title>✨ Quête confirmée</Title>
            <Text>
                Ton inscription à <b>RPG Renaissance</b> est validée.
                <br />
                L’aventure commencera bientôt.
            </Text>

            <Divider />

            <Text subtle>
                Tu recevras les prochaines nouvelles quand le moment sera juste.
                <br />
                Pas de spam. Pas de pression. Juste du sens.
            </Text>

            <PrimaryLink href="/">🏕️ Retour au camp de base</PrimaryLink>
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

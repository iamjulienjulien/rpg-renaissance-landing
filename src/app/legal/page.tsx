// src/app/legal/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions légales",
    description: "Mentions légales du site RPG Renaissance.",
    alternates: { canonical: "/legal" },
    robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-3xl bg-black/25 ring-1 ring-white/10 p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-semibold text-white/90">{title}</h2>
            <div className="text-sm text-white/70 leading-relaxed space-y-2">{children}</div>
        </section>
    );
}

export default function LegalPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
            <header className="mb-10 space-y-3">
                <p className="text-xs tracking-[0.22em] text-white/55 uppercase">Informations</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Mentions légales
                </h1>
                <p className="text-sm text-white/60">
                    Dernière mise à jour : <b>13/01/2026</b>
                </p>
            </header>

            <div className="space-y-4">
                <Section title="Éditeur du site">
                    <p>
                        Le présent site <b>RPG Renaissance</b> est édité par un particulier.
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            Nom : <b>Julien Julien</b>
                        </li>
                        <li>
                            Contact :{" "}
                            <a className="underline" href="mailto:hello@rpg-renaissance.com">
                                hello@rpg-renaissance.com
                            </a>
                        </li>
                        <li>
                            Statut : <b>Particulier (sans statut juridique à ce jour)</b>
                        </li>
                    </ul>
                    <p className="text-xs text-white/50">
                        Conformément à l’article 6, III-2 de la LCEN, les informations d’identité
                        complètes peuvent être communiquées aux autorités compétentes sur
                        réquisition.
                    </p>
                </Section>

                <Section title="Hébergement">
                    <p>Site hébergé par :</p>
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
                    <p>Les détails exacts peuvent évoluer au fil de la mise en production.</p>
                </Section>

                <Section title="Propriété intellectuelle">
                    <p>
                        L’ensemble des contenus présents sur ce site (textes, visuels, logos,
                        éléments graphiques, code, etc.) sont protégés par le droit d’auteur et
                        restent la propriété de leur auteur, sauf mention contraire.
                    </p>
                    <p>
                        Toute reproduction, représentation, modification ou exploitation non
                        autorisée est interdite.
                    </p>
                </Section>

                <Section title="Responsabilité">
                    <p>
                        Les informations et contenus proposés sur ce site sont fournis à titre
                        informatif. Malgré le soin apporté, l’éditeur ne peut garantir l’absence
                        d’erreurs ou d’omissions.
                    </p>
                    <p>L’utilisation du site se fait sous la responsabilité de l’utilisateur.</p>
                </Section>

                <div className="pt-6 text-xs text-white/50">
                    Besoin d’un point de contact ?{" "}
                    <a className="underline" href="mailto:hello@rpg-renaissance.com">
                        hello@rpg-renaissance.com
                    </a>
                </div>
            </div>
        </main>
    );
}

// src/app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conditions d’utilisation",
    description:
        "Conditions d’utilisation de la landing RPG Renaissance, et cadre de responsabilité.",
    alternates: { canonical: "/terms" },
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

export default function TermsPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
            <header className="mb-10 space-y-3">
                <p className="text-xs tracking-[0.22em] text-white/55 uppercase">Cadre</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Conditions d’utilisation
                </h1>
                <p className="text-sm text-white/60">
                    Dernière mise à jour : <b>13/01/2026</b>
                </p>
            </header>

            <div className="space-y-4">
                <Section title="Objet">
                    <p>
                        Les présentes conditions encadrent l’accès et l’utilisation du site{" "}
                        <b>RPG Renaissance</b>, notamment la consultation de la landing et
                        l’inscription à la liste d’attente.
                    </p>
                </Section>

                <Section title="Accès au site">
                    <p>
                        L’accès au site est gratuit (hors coûts d’accès internet). L’éditeur se
                        réserve le droit de modifier, suspendre ou interrompre tout ou partie du
                        site, temporairement ou définitivement, sans préavis.
                    </p>
                </Section>

                <Section title="Inscription à la liste d’attente">
                    <p>
                        L’inscription implique un double opt-in : un email de confirmation est
                        envoyé afin de valider l’adresse fournie. À tout moment, vous pouvez vous
                        désinscrire via le lien présent dans les emails.
                    </p>
                </Section>

                <Section title="Disclaimer Bien-Être (cadre narratif)">
                    <p>
                        <b>RPG Renaissance n’est pas un soin. C’est un espace de jeu.</b>
                    </p>
                    <p>
                        RPG Renaissance propose une approche narrative et introspective inspirée des
                        codes du jeu de rôle : quêtes, progression, rituels simples, symboles. Le
                        but est de créer un cadre pour avancer avec plus de clarté et d’élan, sans
                        injonction ni jugement.
                    </p>
                    <p>
                        Ce projet <b>ne remplace pas</b> un suivi médical, un accompagnement
                        psychologique, une thérapie ou un coaching professionnel. Aucun diagnostic
                        n’est posé. Aucune promesse de résultat n’est faite.
                    </p>
                    <p>
                        Chaque utilisateur reste <b>entièrement responsable</b> de ses décisions et
                        de l’usage qu’il fait des contenus. En cas de détresse ou de situation
                        urgente, il est essentiel de se tourner vers un professionnel de santé ou
                        les services compétents.
                    </p>
                </Section>

                <Section title="Responsabilité">
                    <p>
                        L’éditeur met tout en œuvre pour fournir des informations fiables et
                        maintenir le site accessible, mais ne garantit pas l’absence d’erreurs,
                        d’interruptions ou d’indisponibilités.
                    </p>
                    <p>
                        L’utilisateur utilise le site sous sa responsabilité exclusive. L’éditeur ne
                        pourra être tenu responsable des dommages directs ou indirects résultant de
                        l’utilisation du site.
                    </p>
                </Section>

                <Section title="Propriété intellectuelle">
                    <p>
                        Le site et ses contenus (textes, visuels, logo, éléments graphiques, code)
                        sont protégés. Toute reproduction ou exploitation non autorisée est
                        interdite.
                    </p>
                </Section>

                <Section title="Évolution des conditions">
                    <p>
                        Ces conditions peuvent être mises à jour. La date de dernière mise à jour
                        figure en haut de page.
                    </p>
                </Section>

                <Section title="Contact">
                    <p>
                        Pour toute question :{" "}
                        <a className="underline" href="mailto:hello@rpg-renaissance.com">
                            hello@rpg-renaissance.com
                        </a>
                    </p>
                </Section>
            </div>
        </main>
    );
}

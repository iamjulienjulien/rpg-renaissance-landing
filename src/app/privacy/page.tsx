// src/app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Politique de confidentialité",
    description: "Politique de confidentialité et informations RGPD pour RPG Renaissance.",
    alternates: { canonical: "/privacy" },
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

export default function PrivacyPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
            <header className="mb-10 space-y-3">
                <p className="text-xs tracking-[0.22em] text-white/55 uppercase">Données</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Politique de confidentialité
                </h1>
                <p className="text-sm text-white/60">
                    Dernière mise à jour : <b>13/01/2026</b>
                </p>
            </header>

            <div className="space-y-4">
                <Section title="Qui traite les données ?">
                    <p>
                        Le responsable de traitement est l’éditeur du site <b>RPG Renaissance</b>.
                    </p>
                    <p>
                        Contact :{" "}
                        <a className="underline" href="mailto:hello@rpg-renaissance.com">
                            hello@rpg-renaissance.com
                        </a>
                    </p>
                </Section>

                <Section title="Données collectées">
                    <p>
                        Lors d’une pré-inscription (newsletter / liste d’attente), nous collectons :
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Adresse email</li>
                        <li>Consentement (date, version)</li>
                        <li>Éléments techniques minimaux (user-agent, langue)</li>
                        <li>Contexte de provenance (page d’entrée, paramètres UTM si présents)</li>
                        <li>Empreinte technique pseudonymisée (adresse IP hashé)</li>
                    </ul>
                </Section>

                <Section title="Finalités">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            Gérer la liste d’attente et envoyer les emails de confirmation (double
                            opt-in)
                        </li>
                        <li>
                            Envoyer des informations liées au projet (lancement, ouverture des
                            tests, nouveautés)
                        </li>
                        <li>
                            Mesurer l’audience de façon respectueuse (analytics “soft” si activés)
                        </li>
                    </ul>
                </Section>

                <Section title="Base légale (RGPD)">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <b>Consentement</b> : inscription à la liste (double opt-in)
                        </li>
                        <li>
                            <b>Intérêt légitime</b> : comprendre l’usage du site de manière agrégée
                        </li>
                    </ul>
                </Section>

                <Section title="Destinataires & sous-traitants">
                    <p>
                        Les données peuvent être traitées via des prestataires techniques
                        nécessaires au fonctionnement :
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Fournisseur d’emailing (Resend)</li>
                        <li>Base de données / stockage (Supabase)</li>
                        <li>Hébergement / déploiement (Vercel)</li>
                        <li>Analytics (Plausible) si activé</li>
                    </ul>
                </Section>

                <Section title="Durées de conservation">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Liste d’attente : jusqu’au désabonnement ou suppression</li>
                        <li>Logs techniques : durée courte, strictement nécessaire</li>
                        <li>
                            Preuves de consentement : durée raisonnable pour justifier la conformité
                        </li>
                    </ul>
                </Section>

                <Section title="Vos droits">
                    <p>
                        Conformément au RGPD, vous disposez notamment des droits d’accès, de
                        rectification, d’effacement, d’opposition et de limitation.
                    </p>
                    <p>
                        Pour exercer vos droits :{" "}
                        <a className="underline" href="mailto:hello@rpg-renaissance.com">
                            hello@rpg-renaissance.com
                        </a>
                    </p>
                    <p>Vous pouvez également introduire une réclamation auprès de la CNIL.</p>
                </Section>

                <Section title="Cookies">
                    <p>
                        Le site peut fonctionner sans cookies. Si un outil analytics cookieless est
                        utilisé, il mesure l’audience de façon agrégée, sans profilage individuel.
                    </p>
                </Section>
            </div>
        </main>
    );
}

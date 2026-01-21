// Terms page copy
// - Tous les wordings du Terms, isolés et disponibles en FR/EN.

export type TermsLocale = "fr" | "en";

export type TermsCopyKey =
    | "meta_title"
    | "meta_description"
    | "kicker"
    | "page_title"
    | "last_update_label"
    | "last_update_date"
    | "section_object_title"
    | "object_p1"
    | "section_access_title"
    | "access_p1"
    | "section_waitlist_title"
    | "waitlist_p1"
    | "section_wellbeing_title"
    | "wellbeing_p1"
    | "wellbeing_p2"
    | "wellbeing_p3"
    | "wellbeing_p4"
    | "section_liability_title"
    | "liability_p1"
    | "liability_p2"
    | "section_ip_title"
    | "ip_p1"
    | "section_changes_title"
    | "changes_p1"
    | "section_contact_title"
    | "contact_p1_label";

export type TermsCopyRow = {
    key: TermsCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const TERMS_COPY_TABLE: TermsCopyRow[] = [
    {
        key: "meta_title",
        fr: "Conditions d’utilisation",
        en: "Terms of use",
        note: "Metadata title",
    },
    {
        key: "meta_description",
        fr: "Conditions d’utilisation de la landing RPG Renaissance, et cadre de responsabilité.",
        en: "Terms of use for the RPG Renaissance landing page, and liability framework.",
        note: "Metadata description",
    },

    { key: "kicker", fr: "Cadre", en: "Framework" },
    { key: "page_title", fr: "Conditions d’utilisation", en: "Terms of use" },

    { key: "last_update_label", fr: "Dernière mise à jour :", en: "Last updated:" },
    { key: "last_update_date", fr: "13/01/2026", en: "2026-01-13", note: "Date affichée" },

    { key: "section_object_title", fr: "Objet", en: "Purpose" },
    {
        key: "object_p1",
        fr: "Les présentes conditions encadrent l’accès et l’utilisation du site RPG Renaissance, notamment la consultation de la landing et l’inscription à la liste d’attente.",
        en: "These terms govern access to and use of the RPG Renaissance website, including viewing the landing page and joining the waitlist.",
    },

    { key: "section_access_title", fr: "Accès au site", en: "Access to the website" },
    {
        key: "access_p1",
        fr: "L’accès au site est gratuit (hors coûts d’accès internet). L’éditeur se réserve le droit de modifier, suspendre ou interrompre tout ou partie du site, temporairement ou définitivement, sans préavis.",
        en: "Access to the website is free of charge (excluding your internet access costs). The publisher reserves the right to modify, suspend, or discontinue all or part of the website, temporarily or permanently, without prior notice.",
    },

    {
        key: "section_waitlist_title",
        fr: "Inscription à la liste d’attente",
        en: "Waitlist signup",
    },
    {
        key: "waitlist_p1",
        fr: "L’inscription implique un double opt-in : un email de confirmation est envoyé afin de valider l’adresse fournie. À tout moment, vous pouvez vous désinscrire via le lien présent dans les emails.",
        en: "Signup uses double opt-in: a confirmation email is sent to validate the provided address. You can unsubscribe at any time using the link in the emails.",
    },

    {
        key: "section_wellbeing_title",
        fr: "Disclaimer Bien-Être (cadre narratif)",
        en: "Well-being disclaimer (narrative framework)",
    },
    {
        key: "wellbeing_p1",
        fr: "RPG Renaissance n’est pas un soin. C’est un espace de jeu.",
        en: "RPG Renaissance is not medical care. It’s a play space.",
        note: "Phrase forte (souvent en gras dans le rendu)",
    },
    {
        key: "wellbeing_p2",
        fr: "RPG Renaissance propose une approche narrative et introspective inspirée des codes du jeu de rôle : quêtes, progression, rituels simples, symboles. Le but est de créer un cadre pour avancer avec plus de clarté et d’élan, sans injonction ni jugement.",
        en: "RPG Renaissance offers a narrative, introspective approach inspired by role-playing games: quests, progression, simple rituals, symbols. The goal is to create a framework to move forward with more clarity and momentum, without pressure or judgment.",
    },
    {
        key: "wellbeing_p3",
        fr: "Ce projet ne remplace pas un suivi médical, un accompagnement psychologique, une thérapie ou un coaching professionnel. Aucun diagnostic n’est posé. Aucune promesse de résultat n’est faite.",
        en: "This project does not replace medical care, psychological support, therapy, or professional coaching. No diagnosis is provided. No results are guaranteed.",
    },
    {
        key: "wellbeing_p4",
        fr: "Chaque utilisateur reste entièrement responsable de ses décisions et de l’usage qu’il fait des contenus. En cas de détresse ou de situation urgente, il est essentiel de se tourner vers a professional de santé ou les services compétents.",
        en: "Each user remains fully responsible for their decisions and how they use the content. In case of distress or an urgent situation, please seek help from a healthcare professional or the appropriate emergency services.",
        note: "EN plus direct, plus standard. (Tu peux garder FR strict si tu veux.)",
    },

    { key: "section_liability_title", fr: "Responsabilité", en: "Liability" },
    {
        key: "liability_p1",
        fr: "L’éditeur met tout en œuvre pour fournir des informations fiables et maintenir le site accessible, mais ne garantit pas l’absence d’erreurs, d’interruptions ou d’indisponibilités.",
        en: "The publisher makes best efforts to provide reliable information and keep the website accessible, but does not guarantee the absence of errors, interruptions, or downtime.",
    },
    {
        key: "liability_p2",
        fr: "L’utilisateur utilise le site sous sa responsabilité exclusive. L’éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de l’utilisation du site.",
        en: "Users access and use the website at their sole responsibility. The publisher shall not be liable for any direct or indirect damages resulting from use of the website.",
    },

    { key: "section_ip_title", fr: "Propriété intellectuelle", en: "Intellectual property" },
    {
        key: "ip_p1",
        fr: "Le site et ses contenus (textes, visuels, logo, éléments graphiques, code) sont protégés. Toute reproduction ou exploitation non autorisée est interdite.",
        en: "The website and its content (texts, visuals, logo, graphic elements, code) are protected. Any unauthorized reproduction or use is prohibited.",
    },

    { key: "section_changes_title", fr: "Évolution des conditions", en: "Changes to these terms" },
    {
        key: "changes_p1",
        fr: "Ces conditions peuvent être mises à jour. La date de dernière mise à jour figure en haut de page.",
        en: "These terms may be updated. The last updated date is shown at the top of the page.",
    },

    { key: "section_contact_title", fr: "Contact", en: "Contact" },
    { key: "contact_p1_label", fr: "Pour toute question :", en: "For any questions:" },
];

export const TERMS_COPY = TERMS_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<TermsCopyKey, { fr: string; en: string }>);

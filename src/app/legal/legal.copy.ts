// Legal page copy
// - Tous les wordings du Legal, isolés et disponibles en FR/EN.

export type LegalLocale = "fr" | "en";

export type LegalCopyKey =
    | "meta_title"
    | "meta_description"
    | "kicker"
    | "page_title"
    | "last_update_label"
    | "last_update_date"
    | "section_publisher_title"
    | "publisher_intro"
    | "publisher_list_name_label"
    | "publisher_list_contact_label"
    | "publisher_list_status_label"
    | "publisher_law_note"
    | "section_hosting_title"
    | "hosting_intro"
    | "hosting_note"
    | "section_ip_title"
    | "ip_p1"
    | "ip_p2"
    | "section_liability_title"
    | "liability_p1"
    | "liability_p2"
    | "footer_contact_question";

export type LegalCopyRow = {
    key: LegalCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const LEGAL_COPY_TABLE: LegalCopyRow[] = [
    {
        key: "meta_title",
        fr: "Mentions légales",
        en: "Legal notice",
        note: "Metadata title",
    },
    {
        key: "meta_description",
        fr: "Mentions légales du site RPG Renaissance.",
        en: "Legal notice for the RPG Renaissance website.",
        note: "Metadata description",
    },

    { key: "kicker", fr: "Informations", en: "Information" },
    { key: "page_title", fr: "Mentions légales", en: "Legal notice" },

    { key: "last_update_label", fr: "Dernière mise à jour :", en: "Last updated:" },
    { key: "last_update_date", fr: "13/01/2026", en: "2026-01-13", note: "Date affichée" },

    { key: "section_publisher_title", fr: "Éditeur du site", en: "Website publisher" },
    {
        key: "publisher_intro",
        fr: "Le présent site RPG Renaissance est édité par un particulier.",
        en: "This website, RPG Renaissance, is published by an individual.",
    },
    { key: "publisher_list_name_label", fr: "Nom :", en: "Name:" },
    { key: "publisher_list_contact_label", fr: "Contact :", en: "Contact:" },
    {
        key: "publisher_list_status_label",
        fr: "Statut :",
        en: "Status:",
    },
    {
        key: "publisher_law_note",
        fr: "Conformément à l’article 6, III-2 de la LCEN, les informations d’identité complètes peuvent être communiquées aux autorités compétentes sur réquisition.",
        en: "In accordance with Article 6, III-2 of the LCEN (French law), full identity details may be provided to the competent authorities upon request.",
        note: "Note légale, EN explicite le contexte",
    },

    { key: "section_hosting_title", fr: "Hébergement", en: "Hosting" },
    { key: "hosting_intro", fr: "Site hébergé par :", en: "Website hosted by:" },
    {
        key: "hosting_note",
        fr: "Les détails exacts peuvent évoluer au fil de la mise en production.",
        en: "Exact details may change as the project is deployed and updated.",
    },

    { key: "section_ip_title", fr: "Propriété intellectuelle", en: "Intellectual property" },
    {
        key: "ip_p1",
        fr: "L’ensemble des contenus présents sur ce site (textes, visuels, logos, éléments graphiques, code, etc.) sont protégés par le droit d’auteur et restent la propriété de leur auteur, sauf mention contraire.",
        en: "All content on this website (texts, visuals, logos, graphic elements, code, etc.) is protected by copyright and remains the property of its author, unless stated otherwise.",
    },
    {
        key: "ip_p2",
        fr: "Toute reproduction, représentation, modification ou exploitation non autorisée est interdite.",
        en: "Any unauthorized reproduction, distribution, modification, or use is prohibited.",
    },

    { key: "section_liability_title", fr: "Responsabilité", en: "Liability" },
    {
        key: "liability_p1",
        fr: "Les informations et contenus proposés sur ce site sont fournis à titre informatif. Malgré le soin apporté, l’éditeur ne peut garantir l’absence d’erreurs ou d’omissions.",
        en: "The information and content provided on this website are for informational purposes only. Despite our best efforts, the publisher cannot guarantee the absence of errors or omissions.",
    },
    {
        key: "liability_p2",
        fr: "L’utilisation du site se fait sous la responsabilité de l’utilisateur.",
        en: "Use of this website is at the user’s own risk.",
    },

    {
        key: "footer_contact_question",
        fr: "Besoin d’un point de contact ?",
        en: "Need a contact point?",
    },
];

export const LEGAL_COPY = LEGAL_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<LegalCopyKey, { fr: string; en: string }>);

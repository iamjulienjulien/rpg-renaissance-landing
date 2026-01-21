// Unsubscribe page copy
// - Tous les wordings de la page /unsubscribe, isolés et disponibles en FR/EN.

export type UnsubscribeLocale = "fr" | "en";

export type UnsubscribeCopyKey =
    | "meta_title"
    | "title"
    | "lead"
    | "missing_link_title"
    | "missing_link_hint"
    | "cta_processing"
    | "cta_success"
    | "cta_default"
    | "fineprint_resubscribe"
    | "error_missing_token"
    | "error_generic"
    | "error_network"
    | "success_generic";

export type UnsubscribeCopyRow = {
    key: UnsubscribeCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const UNSUBSCRIBE_COPY_TABLE: UnsubscribeCopyRow[] = [
    { key: "meta_title", fr: "Désinscription", en: "Unsubscribe", note: "Metadata title" },

    { key: "title", fr: "Se désinscrire", en: "Unsubscribe" },
    {
        key: "lead",
        fr: "Tu peux te retirer de la liste RPG Renaissance à tout moment.",
        en: "You can leave the RPG Renaissance list at any time.",
    },

    {
        key: "missing_link_title",
        fr: "Oups, le lien de désinscription est incomplet.",
        en: "Oops, this unsubscribe link is incomplete.",
    },
    {
        key: "missing_link_hint",
        fr: "Reviens depuis le lien “Se désinscrire” dans l’email.",
        en: "Please use the “Unsubscribe” link from the email.",
    },

    { key: "cta_processing", fr: "⏳ Traitement…", en: "⏳ Processing…" },
    { key: "cta_success", fr: "✅ Désinscrit", en: "✅ Unsubscribed" },
    { key: "cta_default", fr: "Me désinscrire", en: "Unsubscribe me" },

    {
        key: "fineprint_resubscribe",
        fr: "Tu peux te réinscrire quand tu veux via la landing.",
        en: "You can re-subscribe anytime from the landing page.",
    },

    {
        key: "error_missing_token",
        fr: "Lien invalide (token manquant).",
        en: "Invalid link (missing token).",
    },
    {
        key: "error_generic",
        fr: "Impossible de traiter la demande.",
        en: "We couldn’t process your request.",
    },
    {
        key: "error_network",
        fr: "Erreur réseau. Réessaie.",
        en: "Network error. Please try again.",
    },

    { key: "success_generic", fr: "Tu as bien été désinscrit.", en: "You’ve been unsubscribed." },
];

export const UNSUBSCRIBE_COPY = UNSUBSCRIBE_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<UnsubscribeCopyKey, { fr: string; en: string }>);

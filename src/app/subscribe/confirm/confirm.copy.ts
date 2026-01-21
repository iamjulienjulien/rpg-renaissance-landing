// Subscribe confirm page copy
// - Tous les wordings de confirmation, isolés et disponibles en FR/EN.

export type ConfirmLocale = "fr" | "en";

export type ConfirmCopyKey =
    | "meta_title"
    | "invalid_title"
    | "invalid_body_line1"
    | "invalid_body_line2"
    | "error_title"
    | "error_body_line1"
    | "error_body_line2"
    | "already_title"
    | "already_body_line1"
    | "already_body_line2"
    | "already_cta"
    | "failed_title"
    | "failed_body_line1"
    | "failed_body_line2"
    | "failed_cta"
    | "ok_title"
    | "ok_body_line1_before_brand"
    | "brand"
    | "ok_body_line1_after_brand"
    | "ok_body_line2"
    | "ok_subtle_line1"
    | "ok_subtle_line2"
    | "ok_cta";

export type ConfirmCopyRow = {
    key: ConfirmCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const CONFIRM_COPY_TABLE: ConfirmCopyRow[] = [
    { key: "meta_title", fr: "Confirmation", en: "Confirmation", note: "Metadata title" },

    // Missing token
    { key: "invalid_title", fr: "❌ Lien invalide", en: "❌ Invalid link" },
    {
        key: "invalid_body_line1",
        fr: "Ce parchemin est illisible.",
        en: "This scroll is unreadable.",
    },
    {
        key: "invalid_body_line2",
        fr: "Le lien de confirmation est manquant ou incorrect.",
        en: "The confirmation link is missing or incorrect.",
    },

    // Network / server error
    { key: "error_title", fr: "⚠️ Une magie a mal tourné", en: "⚠️ Magic misfired" },
    {
        key: "error_body_line1",
        fr: "Impossible de confirmer ton inscription pour le moment.",
        en: "We can’t confirm your signup right now.",
    },
    { key: "error_body_line2", fr: "Réessaie plus tard.", en: "Try again later." },

    // Already confirmed
    { key: "already_title", fr: "✅ Déjà confirmé", en: "✅ Already confirmed" },
    {
        key: "already_body_line1",
        fr: "Ta quête est déjà active.",
        en: "Your quest is already active.",
    },
    {
        key: "already_body_line2",
        fr: "Tu es bien inscrit à RPG Renaissance.",
        en: "You’re already signed up for RPG Renaissance.",
    },
    { key: "already_cta", fr: "🏕️ Retour au camp de base", en: "🏕️ Back to base camp" },

    // Invalid/expired token
    { key: "failed_title", fr: "❌ Confirmation échouée", en: "❌ Confirmation failed" },
    {
        key: "failed_body_line1",
        fr: "Ce lien a peut-être expiré.",
        en: "This link may have expired.",
    },
    {
        key: "failed_body_line2",
        fr: "Tu peux recommencer depuis la page d’inscription.",
        en: "You can start again from the signup page.",
    },
    { key: "failed_cta", fr: "↩ Retour à la landing", en: "↩ Back to the landing page" },

    // Success
    { key: "ok_title", fr: "✨ Quête confirmée", en: "✨ Quest confirmed" },
    {
        key: "ok_body_line1_before_brand",
        fr: "Ton inscription à",
        en: "Your signup for",
        note: "Utilisé avec <b>{brand}</b>",
    },
    { key: "brand", fr: "RPG Renaissance", en: "RPG Renaissance", note: "Nom produit" },
    {
        key: "ok_body_line1_after_brand",
        fr: "est validée.",
        en: "is confirmed.",
    },
    {
        key: "ok_body_line2",
        fr: "L’aventure commencera bientôt.",
        en: "The adventure will begin soon.",
    },

    {
        key: "ok_subtle_line1",
        fr: "Tu recevras les prochaines nouvelles quand le moment sera juste.",
        en: "You’ll get the next updates when the timing is right.",
    },
    {
        key: "ok_subtle_line2",
        fr: "Pas de spam. Pas de pression. Juste du sens.",
        en: "No spam. No pressure. Just meaning.",
    },
    { key: "ok_cta", fr: "🏕️ Retour au camp de base", en: "🏕️ Back to base camp" },
];

export const CONFIRM_COPY = CONFIRM_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<ConfirmCopyKey, { fr: string; en: string }>);

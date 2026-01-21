// SubscribeForm copy
// - Tous les wordings du formulaire d’inscription, isolés et disponibles en FR/EN.

export type SubscribeLocale = "fr" | "en";

export type SubscribeCopyKey =
    | "title"
    | "subtitle"
    | "badge_early"
    | "email_placeholder"
    | "helper_invite"
    | "consent_label"
    | "cta_submit"
    | "cta_loading"
    | "success_title"
    | "success_body_line1"
    | "success_body_line2"
    | "success_hint_spam"
    | "fineprint_unsubscribe"
    | "error_invalid_form"
    | "error_generic"
    | "error_network";

export type SubscribeCopyRow = {
    key: SubscribeCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const SUBSCRIBE_COPY_TABLE: SubscribeCopyRow[] = [
    {
        key: "title",
        fr: "Entrer dans la liste",
        en: "Join the list",
    },
    {
        key: "subtitle",
        fr: "News rares, utiles, et un peu épiques. 📨",
        en: "Rare, useful, and slightly epic updates. 📨",
    },
    {
        key: "badge_early",
        fr: "Early",
        en: "Early",
        note: "Badge statique",
    },
    {
        key: "email_placeholder",
        fr: "ton@email.com",
        en: "your@email.com",
    },
    {
        key: "helper_invite",
        fr: "Tu recevras une invitation quand un nouveau chapitre s’ouvre.",
        en: "You’ll receive an invitation when a new chapter opens.",
    },
    {
        key: "consent_label",
        fr: "J’accepte de recevoir des emails sur RPG Renaissance.",
        en: "I agree to receive emails about RPG Renaissance.",
    },
    {
        key: "cta_submit",
        fr: "✨ Me prévenir",
        en: "✨ Notify me",
    },
    {
        key: "cta_loading",
        fr: "⏳ Inscription…",
        en: "⏳ Signing up…",
    },
    {
        key: "success_title",
        fr: "📬 Vérifie ta boîte mail",
        en: "📬 Check your inbox",
    },
    {
        key: "success_body_line1",
        fr: "Un email de confirmation vient de t’être envoyé.",
        en: "A confirmation email has just been sent to you.",
    },
    {
        key: "success_body_line2",
        fr: "Clique sur le lien à l’intérieur pour finaliser ton inscription.",
        en: "Click the link inside to complete your signup.",
    },
    {
        key: "success_hint_spam",
        fr: "👉 Pense à vérifier les spams ou promotions.",
        en: "👉 Don’t forget to check spam or promotions.",
    },
    {
        key: "fineprint_unsubscribe",
        fr: "Tu pourras te désinscrire à tout moment.",
        en: "You can unsubscribe at any time.",
    },
    {
        key: "error_invalid_form",
        fr: "Formulaire invalide",
        en: "Invalid form",
    },
    {
        key: "error_generic",
        fr: "Impossible de s’inscrire",
        en: "Unable to subscribe",
    },
    {
        key: "error_network",
        fr: "Erreur réseau",
        en: "Network error",
    },
];

export const SUBSCRIBE_COPY = SUBSCRIBE_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<SubscribeCopyKey, { fr: string; en: string }>);

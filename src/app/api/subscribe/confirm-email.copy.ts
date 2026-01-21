// src/app/api/subscribe/confirm-email.copy.ts
// Double opt-in email copy (FR/EN)

export type ConfirmEmailLocale = "fr" | "en";

export type ConfirmEmailCopyKey =
    | "subject"
    | "preheader"
    | "title"
    | "p1_before_brand"
    | "p1_after_brand"
    | "cta_confirm"
    | "fallback_link"
    | "footer_ignore"
    | "footer_unsubscribe_label"
    | "text_title"
    | "text_p1"
    | "text_fallback"
    | "text_ignore"
    | "text_unsub";

export const CONFIRM_EMAIL_COPY: Record<ConfirmEmailCopyKey, { fr: string; en: string }> = {
    subject: {
        fr: "Confirme ton inscription à RPG Renaissance ✨",
        en: "Confirm your signup to RPG Renaissance ✨",
    },
    preheader: {
        fr: "Dernière étape: confirme ton adresse email pour rejoindre la liste.",
        en: "Last step: confirm your email address to join the list.",
    },
    title: { fr: "Confirme ton email", en: "Confirm your email" },

    p1_before_brand: {
        fr: "Tu as demandé à rejoindre la liste ",
        en: "You requested to join the ",
    },
    p1_after_brand: {
        fr: ". Pour finaliser l’inscription (double opt-in), confirme ton adresse en cliquant ci-dessous.",
        en: " list. To complete signup (double opt-in), confirm your address by clicking below.",
    },

    cta_confirm: { fr: "Confirmer mon email", en: "Confirm my email" },

    fallback_link: {
        fr: "Si le bouton ne fonctionne pas, copie-colle ce lien:",
        en: "If the button doesn’t work, copy and paste this link:",
    },

    footer_ignore: {
        fr: "Si tu n’es pas à l’origine de cette demande, ignore simplement cet email.",
        en: "If you didn’t request this, simply ignore this email.",
    },

    footer_unsubscribe_label: {
        fr: "Se désinscrire:",
        en: "Unsubscribe:",
    },

    text_title: {
        fr: "CONFIRME TON EMAIL (RPG Renaissance)",
        en: "CONFIRM YOUR EMAIL (RPG Renaissance)",
    },
    text_p1: {
        fr: "Tu as demandé à rejoindre la liste RPG Renaissance.\nPour finaliser l’inscription (double opt-in), ouvre ce lien :",
        en: "You requested to join the RPG Renaissance list.\nTo complete signup (double opt-in), open this link:",
    },
    text_fallback: {
        fr: "Lien de confirmation :",
        en: "Confirmation link:",
    },
    text_ignore: {
        fr: "Si tu n’es pas à l’origine de cette demande, ignore cet email.",
        en: "If you didn’t request this, ignore this email.",
    },
    text_unsub: {
        fr: "Se désinscrire :",
        en: "Unsubscribe:",
    },
};

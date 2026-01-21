// Privacy page copy
// - Tous les wordings du Privacy, isolés et disponibles en FR/EN.

export type PrivacyLocale = "fr" | "en";

export type PrivacyCopyKey =
    | "meta_title"
    | "meta_description"
    | "kicker"
    | "page_title"
    | "last_update_label"
    | "last_update_date"
    | "section_controller_title"
    | "controller_p1"
    | "controller_contact_label"
    | "section_collected_title"
    | "collected_intro"
    | "collected_item_email"
    | "collected_item_consent"
    | "collected_item_tech"
    | "collected_item_referrer"
    | "collected_item_iphash"
    | "section_purposes_title"
    | "purposes_item_waitlist"
    | "purposes_item_project_updates"
    | "purposes_item_analytics"
    | "section_legal_basis_title"
    | "legal_basis_item_consent"
    | "legal_basis_item_legitimate_interest"
    | "section_recipients_title"
    | "recipients_intro"
    | "recipients_item_email_provider"
    | "recipients_item_db"
    | "recipients_item_hosting"
    | "recipients_item_analytics"
    | "section_retention_title"
    | "retention_item_waitlist"
    | "retention_item_logs"
    | "retention_item_consent_proof"
    | "section_rights_title"
    | "rights_p1"
    | "rights_p2_label"
    | "rights_p3"
    | "section_cookies_title"
    | "cookies_p1";

export type PrivacyCopyRow = {
    key: PrivacyCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const PRIVACY_COPY_TABLE: PrivacyCopyRow[] = [
    {
        key: "meta_title",
        fr: "Politique de confidentialité",
        en: "Privacy policy",
        note: "Metadata title",
    },
    {
        key: "meta_description",
        fr: "Politique de confidentialité et informations RGPD pour RPG Renaissance.",
        en: "Privacy policy and GDPR information for RPG Renaissance.",
        note: "Metadata description",
    },

    { key: "kicker", fr: "Données", en: "Data" },
    { key: "page_title", fr: "Politique de confidentialité", en: "Privacy policy" },

    { key: "last_update_label", fr: "Dernière mise à jour :", en: "Last updated:" },
    { key: "last_update_date", fr: "13/01/2026", en: "2026-01-13", note: "Date affichée" },

    {
        key: "section_controller_title",
        fr: "Qui traite les données ?",
        en: "Who processes the data?",
    },
    {
        key: "controller_p1",
        fr: "Le responsable de traitement est l’éditeur du site RPG Renaissance.",
        en: "The data controller is the publisher of the RPG Renaissance website.",
    },
    { key: "controller_contact_label", fr: "Contact :", en: "Contact:" },

    { key: "section_collected_title", fr: "Données collectées", en: "Data collected" },
    {
        key: "collected_intro",
        fr: "Lors d’une pré-inscription (newsletter / liste d’attente), nous collectons :",
        en: "When you pre-register (newsletter / waitlist), we collect:",
    },
    { key: "collected_item_email", fr: "Adresse email", en: "Email address" },
    {
        key: "collected_item_consent",
        fr: "Consentement (date, version)",
        en: "Consent (date, version)",
    },
    {
        key: "collected_item_tech",
        fr: "Éléments techniques minimaux (user-agent, langue)",
        en: "Minimal technical data (user agent, language)",
    },
    {
        key: "collected_item_referrer",
        fr: "Contexte de provenance (page d’entrée, paramètres UTM si présents)",
        en: "Referrer context (landing page, UTM parameters if present)",
    },
    {
        key: "collected_item_iphash",
        fr: "Empreinte technique pseudonymisée (adresse IP hashé)",
        en: "Pseudonymized technical fingerprint (hashed IP address)",
        note: "EN: hashed IP address",
    },

    { key: "section_purposes_title", fr: "Finalités", en: "Purposes" },
    {
        key: "purposes_item_waitlist",
        fr: "Gérer la liste d’attente et envoyer les emails de confirmation (double opt-in)",
        en: "Manage the waitlist and send confirmation emails (double opt-in)",
    },
    {
        key: "purposes_item_project_updates",
        fr: "Envoyer des informations liées au projet (lancement, ouverture des tests, nouveautés)",
        en: "Send project updates (launch, early access, new features)",
    },
    {
        key: "purposes_item_analytics",
        fr: "Mesurer l’audience de façon respectueuse (analytics “soft” si activés)",
        en: "Measure audience in a privacy-friendly way (light analytics if enabled)",
    },

    { key: "section_legal_basis_title", fr: "Base légale (RGPD)", en: "Legal basis (GDPR)" },
    {
        key: "legal_basis_item_consent",
        fr: "Consentement : inscription à la liste (double opt-in)",
        en: "Consent: signup to the list (double opt-in)",
    },
    {
        key: "legal_basis_item_legitimate_interest",
        fr: "Intérêt légitime : comprendre l’usage du site de manière agrégée",
        en: "Legitimate interest: understand website usage in an aggregated manner",
    },

    {
        key: "section_recipients_title",
        fr: "Destinataires & sous-traitants",
        en: "Recipients & processors",
    },
    {
        key: "recipients_intro",
        fr: "Les données peuvent être traitées via des prestataires techniques nécessaires au fonctionnement :",
        en: "Data may be processed by technical providers necessary for operation:",
    },
    {
        key: "recipients_item_email_provider",
        fr: "Fournisseur d’emailing (Resend)",
        en: "Email provider (Resend)",
    },
    {
        key: "recipients_item_db",
        fr: "Base de données / stockage (Supabase)",
        en: "Database / storage (Supabase)",
    },
    {
        key: "recipients_item_hosting",
        fr: "Hébergement / déploiement (Vercel)",
        en: "Hosting / deployment (Vercel)",
    },
    {
        key: "recipients_item_analytics",
        fr: "Analytics (Plausible) si activé",
        en: "Analytics (Plausible), if enabled",
    },

    { key: "section_retention_title", fr: "Durées de conservation", en: "Retention periods" },
    {
        key: "retention_item_waitlist",
        fr: "Liste d’attente : jusqu’au désabonnement ou suppression",
        en: "Waitlist: until you unsubscribe or request deletion",
    },
    {
        key: "retention_item_logs",
        fr: "Logs techniques : durée courte, strictement nécessaire",
        en: "Technical logs: short period, strictly necessary",
    },
    {
        key: "retention_item_consent_proof",
        fr: "Preuves de consentement : durée raisonnable pour justifier la conformité",
        en: "Proof of consent: a reasonable period to demonstrate compliance",
    },

    { key: "section_rights_title", fr: "Vos droits", en: "Your rights" },
    {
        key: "rights_p1",
        fr: "Conformément au RGPD, vous disposez notamment des droits d’accès, de rectification, d’effacement, d’opposition et de limitation.",
        en: "Under the GDPR, you have rights including access, rectification, erasure, objection, and restriction.",
    },
    { key: "rights_p2_label", fr: "Pour exercer vos droits :", en: "To exercise your rights:" },
    {
        key: "rights_p3",
        fr: "Vous pouvez également introduire une réclamation auprès de la CNIL.",
        en: "You may also lodge a complaint with the CNIL (French data protection authority).",
        note: "CNIL gardé tel quel + explicité en EN",
    },

    { key: "section_cookies_title", fr: "Cookies", en: "Cookies" },
    {
        key: "cookies_p1",
        fr: "Le site peut fonctionner sans cookies. Si un outil analytics cookieless est utilisé, il mesure l’audience de façon agrégée, sans profilage individuel.",
        en: "The website can operate without cookies. If cookieless analytics are used, they measure audience in an aggregated way, without individual profiling.",
    },
];

export const PRIVACY_COPY = PRIVACY_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<PrivacyCopyKey, { fr: string; en: string }>);

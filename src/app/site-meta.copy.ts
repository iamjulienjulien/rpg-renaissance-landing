// Site metadata copy
// - Textes SEO + social metadata, isolés et disponibles en FR/EN.

export type SiteMetaLocale = "fr" | "en";

export type SiteMetaCopyKey =
    | "site_name"
    | "default_title"
    | "description"
    | "keywords"
    | "og_locale"
    | "og_image_alt";

export type SiteMetaCopyRow = {
    key: SiteMetaCopyKey;
    fr: string | string[];
    en: string | string[];
    note?: string;
};

export const SITE_META_COPY_TABLE: SiteMetaCopyRow[] = [
    { key: "site_name", fr: "RPG Renaissance", en: "RPG Renaissance" },

    {
        key: "default_title",
        fr: "La renaissance, en mode jeu de rôle",
        en: "Reinvention, in role-playing mode",
        note: "Base du title default (utilisé dans template aussi)",
    },

    {
        key: "description",
        fr: "RPG Renaissance transforme la reconstruction personnelle en aventure jouable: un récit, des étapes, du sens. Inscris-toi pour rejoindre la quête.",
        en: "RPG Renaissance turns personal rebuilding into a playable adventure: a story, clear steps, real meaning. Sign up to join the quest.",
        note: "Meta description + OG/Twitter description",
    },

    {
        key: "keywords",
        fr: [
            "RPG Renaissance",
            "renaissance",
            "développement personnel",
            "jeu de rôle",
            "habitudes",
            "quêtes",
            "progression",
            "introspection",
        ],
        en: [
            "RPG Renaissance",
            "reinvention",
            "personal growth",
            "role-playing game",
            "habits",
            "quests",
            "progress",
            "introspection",
        ],
        note: "SEO keywords",
    },

    { key: "og_locale", fr: "fr_FR", en: "en_US", note: "OpenGraph locale" },

    { key: "og_image_alt", fr: "RPG Renaissance", en: "RPG Renaissance", note: "OG image alt" },
];

export const SITE_META_COPY = SITE_META_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<SiteMetaCopyKey, { fr: string | string[]; en: string | string[] }>);

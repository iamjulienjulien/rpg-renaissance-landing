// Features copy
// - Tous les wordings du bloc Features, isolés et disponibles en FR/EN.

export type FeaturesLocale = "fr" | "en";

export type FeaturesCopyKey =
    | "kicker"
    | "title"
    | "lead"
    | "sublead"
    | "item_01_title"
    | "item_01_desc"
    | "item_02_title"
    | "item_02_desc"
    | "item_03_title"
    | "item_03_desc"
    | "item_04_title"
    | "item_04_desc"
    | "item_05_title"
    | "item_05_desc"
    | "item_06_title"
    | "item_06_desc";

export type FeaturesCopyRow = {
    key: FeaturesCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const FEATURES_COPY_TABLE: FeaturesCopyRow[] = [
    {
        key: "kicker",
        fr: "Le concept",
        en: "The concept",
        note: "Petit titre (uppercase, tracking)",
    },
    {
        key: "title",
        fr: "Une app, un jeu, une montée en puissance",
        en: "An app, a game, a power-up",
    },
    {
        key: "lead",
        fr: "RPG Renaissance transforme ta progression personnelle en aventure: claire, épique, mesurable.",
        en: "RPG Renaissance turns personal growth into an adventure: clear, epic, measurable.",
    },
    {
        key: "sublead",
        fr: "Pour celles et ceux qui veulent avancer sans se flageller.",
        en: "For those who want to move forward without self-punishment.",
    },

    // Items
    {
        key: "item_01_title",
        fr: "Univers Renaissance",
        en: "Renaissance universe",
    },
    {
        key: "item_01_desc",
        fr: "Un imaginaire lumineux: transformation, reconstruction, puissance douce.",
        en: "A luminous world: transformation, rebuilding, gentle strength.",
    },

    {
        key: "item_02_title",
        fr: "Mission du quotidien",
        en: "Everyday missions",
    },
    {
        key: "item_02_desc",
        fr: "Transforme tes objectifs en missions jouables, avec étapes, récompenses et narration.",
        en: "Turn goals into playable missions, with steps, rewards, and storytelling.",
    },

    {
        key: "item_03_title",
        fr: "Système de progression",
        en: "Progression system",
    },
    {
        key: "item_03_desc",
        fr: "Renommée, niveaux, badges. Ton avancement devient visible et motivant.",
        en: "Renown, levels, badges. Your progress becomes visible and motivating.",
    },

    {
        key: "item_04_title",
        fr: "Maître du jeu IA",
        en: "AI Game Master",
    },
    {
        key: "item_04_desc",
        fr: "Un Maître du Jeu qui t’aide à clarifier, choisir, persister… sans te juger.",
        en: "A Game Master that helps you clarify, choose, persist… without judging you.",
    },

    {
        key: "item_05_title",
        fr: "Objets & rituels",
        en: "Items & rituals",
    },
    {
        key: "item_05_desc",
        fr: "Des routines packagées en “objets” et “sorts” que tu peux équiper.",
        en: "Routines packaged as “items” and “spells” you can equip.",
    },

    {
        key: "item_06_title",
        fr: "Avatar narratif",
        en: "Narrative avatar",
    },
    {
        key: "item_06_desc",
        fr: "Génère un portrait fantasy à partir de tes photos, pour incarner ton run.",
        en: "Generate a fantasy portrait from your photos to embody your run.",
    },
];

export const FEATURES_COPY = FEATURES_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<FeaturesCopyKey, { fr: string; en: string }>);

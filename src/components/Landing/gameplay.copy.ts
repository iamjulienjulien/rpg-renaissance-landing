// Gameplay copy
// - Tous les wordings du bloc Gameplay, isolés et disponibles en FR/EN.

export type GameplayLocale = "fr" | "en";

export type GameplayCopyKey =
    | "kicker"
    | "title"
    | "lead"
    | "sublead"
    | "step_01_title"
    | "step_01_desc"
    | "step_02_title"
    | "step_02_desc"
    | "step_03_title"
    | "step_03_desc"
    | "step_04_title"
    | "step_04_desc";

export type GameplayCopyRow = {
    key: GameplayCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const GAMEPLAY_COPY_TABLE: GameplayCopyRow[] = [
    {
        key: "kicker",
        fr: "La Boucle de jeu",
        en: "The gameplay loop",
        note: "Petit titre (uppercase, tracking)",
    },
    {
        key: "title",
        fr: "La progression, version RPG",
        en: "Progress, RPG-style",
    },
    {
        key: "lead",
        fr: "Pas de blabla. Une boucle simple, répétable, qui transforme tes journées en montée en puissance.",
        en: "No fluff. A simple, repeatable loop that turns your days into a steady power-up.",
    },
    {
        key: "sublead",
        fr: "Chaque journée devient une petite scène de jeu.",
        en: "Each day becomes a small game scene.",
    },

    // Steps
    {
        key: "step_01_title",
        fr: "Choisis une quête",
        en: "Choose a quest",
    },
    {
        key: "step_01_desc",
        fr: "Un objectif clair, transformé en mission jouable avec une récompense.",
        en: "A clear goal, turned into a playable mission with a reward.",
    },

    {
        key: "step_02_title",
        fr: "Joue dans la vraie vie",
        en: "Play in real life",
    },
    {
        key: "step_02_desc",
        fr: "Tu avances par micro-actions. Chaque pas est compté, pas jugé.",
        en: "You move forward through micro-actions. Every step is counted, not judged.",
    },

    {
        key: "step_03_title",
        fr: "Gagne de la Renommée",
        en: "Earn Renown",
    },
    {
        key: "step_03_desc",
        fr: "Badges, niveaux, momentum. Ton progrès devient visible.",
        en: "Badges, levels, momentum. Your progress becomes visible.",
    },

    {
        key: "step_04_title",
        fr: "Débloque un pouvoir",
        en: "Unlock a power",
    },
    {
        key: "step_04_desc",
        fr: "Rituels, inventaires, buffs. Tu t’équipes pour continuer.",
        en: "Rituals, inventories, buffs. You gear up to keep going.",
    },
];

export const GAMEPLAY_COPY = GAMEPLAY_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<GameplayCopyKey, { fr: string; en: string }>);

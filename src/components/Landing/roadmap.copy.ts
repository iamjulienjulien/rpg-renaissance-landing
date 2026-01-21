// Roadmap copy
// - Tous les wordings du bloc Roadmap, isolés et disponibles en FR/EN.

export type RoadmapLocale = "fr" | "en";

export type RoadmapCopyKey =
    | "kicker"
    | "title"
    | "lead"
    | "sublead"
    | "step_01_title"
    | "step_01_desc"
    | "step_01_badge"
    | "step_02_title"
    | "step_02_desc"
    | "step_02_badge"
    | "step_03_title"
    | "step_03_desc"
    | "step_03_badge"
    | "step_04_title"
    | "step_04_desc"
    | "step_04_badge"
    | "fineprint_invite_tests"
    | "closing_line";

export type RoadmapCopyRow = {
    key: RoadmapCopyKey;
    fr: string;
    en: string;
    note?: string;
};

export const ROADMAP_COPY_TABLE: RoadmapCopyRow[] = [
    {
        key: "kicker",
        fr: "La Roadmap",
        en: "The roadmap",
        note: "Petit titre (uppercase, tracking)",
    },
    {
        key: "title",
        fr: "Les prochains chapitres",
        en: "The next chapters",
    },
    {
        key: "lead",
        fr: "Une progression en étapes, comme une campagne: simple, lisible, solide.",
        en: "A step-by-step progression, like a campaign: simple, readable, sturdy.",
    },
    {
        key: "sublead",
        fr: "RPG Renaissance se construit comme une campagne : chapitre par chapitre.",
        en: "RPG Renaissance is built like a campaign: chapter by chapter.",
    },

    // Steps
    {
        key: "step_01_title",
        fr: "Prologue",
        en: "Prologue",
    },
    {
        key: "step_01_desc",
        fr: "Ouverture de la liste d’attente et premières démos (à venir).",
        en: "Waitlist opens and first demos (coming soon).",
    },
    {
        key: "step_01_badge",
        fr: "✅ En cours",
        en: "✅ In progress",
    },

    {
        key: "step_02_title",
        fr: "Alpha fermée",
        en: "Closed alpha",
    },
    {
        key: "step_02_desc",
        fr: "Démos du système de quêtes, avec progression et journal.",
        en: "Quest system demos, with progression and journal.",
    },
    {
        key: "step_02_badge",
        fr: "⏳ Cet hiver",
        en: "⏳ This winter",
    },

    {
        key: "step_03_title",
        fr: "Beta",
        en: "Beta",
    },
    {
        key: "step_03_desc",
        fr: "Première aventure complète : chapitres, quêtes, récompenses, narration.",
        en: "First complete adventure: chapters, quests, rewards, storytelling.",
    },
    {
        key: "step_03_badge",
        fr: "🛠️ Printemps 2026",
        en: "🛠️ Spring 2026",
    },

    {
        key: "step_04_title",
        fr: "Lancement",
        en: "Launch",
    },
    {
        key: "step_04_desc",
        fr: "Une saison, des chapitres, une renaissance collective.",
        en: "A season, chapters, a collective renaissance.",
    },
    {
        key: "step_04_badge",
        fr: "🔥 Été 2026",
        en: "🔥 Summer 2026",
    },

    // Outro lines
    {
        key: "fineprint_invite_tests",
        fr: "Tu veux participer aux premiers tests? Inscris-toi, et je te ping quand ça ouvre. 📨",
        en: "Want to join the first tests? Sign up and I’ll ping you when it opens. 📨",
    },
    {
        key: "closing_line",
        fr: "Tu n’as rien à réussir ici. Juste à jouer honnêtement 🤝",
        en: "You don’t have to prove anything here. Just play honestly. 🤝",
    },
];

export const ROADMAP_COPY = ROADMAP_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<RoadmapCopyKey, { fr: string; en: string }>);

// src/components/Landing/hero.copy.ts
// Hero copy
// - Tous les wordings du Hero, isolés et disponibles en FR/EN.

export type HeroLocale = "fr" | "en";

export type HeroCopyKey =
    | "brand_title"
    | "brand_tagline"
    | "cta_join_list"
    | "pill_boss_final"
    | "headline_line1"
    | "headline_line2"
    | "lead"
    | "sublead"
    | "badges"
    | "cta_notify_launch"
    | "cta_how_it_works"
    | "fineprint_no_spam"
    | "logo_alt_icon"
    | "logo_alt_main"
    | "subscribe_sr_title";

export type HeroCopyRow = {
    key: HeroCopyKey;
    fr: string | string[];
    en: string | string[];
    note?: string;
};

export const HERO_COPY_TABLE: HeroCopyRow[] = [
    { key: "brand_title", fr: "RPG Renaissance", en: "RPG Renaissance" },

    {
        key: "brand_tagline",
        fr: "✨ La renaissance, en mode jeu de rôle. 🧙",
        en: "✨ Reinvention, in role-playing mode. 🧙",
    },

    { key: "cta_join_list", fr: "✨ Rejoindre la liste", en: "✨ Join the list" },

    {
        key: "pill_boss_final",
        fr: "⚔️ Le jeu de rôle où le boss final, c’est tes propres limites.",
        en: "⚔️ The RPG where the final boss is your own limits.",
    },

    {
        key: "headline_line1",
        fr: "Deviens ton propre personnage.",
        en: "Become your own character.",
    },

    { key: "headline_line2", fr: "Écris ta Renaissance.", en: "Write your Renaissance." },

    {
        key: "lead",
        fr: "Un RPG introspectif, narratif et évolutif: tu choisis tes quêtes, tu gagnes de l’élan, tu débloques des pouvoirs… et tu avances dans la vraie vie. 🧠✨",
        en: "An introspective, narrative RPG that evolves with you: choose your quests, build momentum, unlock powers… and move forward in real life. 🧠✨",
    },

    {
        key: "sublead",
        fr: "Un jeu narratif pour transformer ta progression personnelle en aventure concrète.",
        en: "A narrative game that turns personal growth into a real, tangible adventure.",
    },

    {
        key: "badges",
        fr: [
            "🌍 Une aventure à vivre",
            "🧭 Un voyage guidé, pas imposé",
            "📜 Quêtes du quotidien",
            "🔮 Rituels simples, impact réel",
            "🎖️ Des preuves de chemin parcouru",
            "🔥 Te voir autrement",
        ],
        en: [
            "🌍 An adventure to live",
            "🧭 A guided journey, not imposed",
            "📜 Everyday quests",
            "🔮 Simple rituals, real impact",
            "🎖️ Proof of progress",
            "🔥 See yourself differently",
        ],
    },

    { key: "cta_notify_launch", fr: "🔥 Être prévenu du lancement", en: "🔥 Get launch updates" },

    { key: "cta_how_it_works", fr: "🧩 Comment ça fonctionne", en: "🧩 How it works" },

    {
        key: "fineprint_no_spam",
        fr: "Pas de spam. Juste un signal quand ton aventure peut commencer.",
        en: "No spam. Just a signal when your adventure can begin.",
    },

    {
        key: "logo_alt_icon",
        fr: "RPG Renaissance",
        en: "RPG Renaissance",
        note: "alt de l’icône 32px",
    },

    {
        key: "logo_alt_main",
        fr: "Logo RPG Renaissance",
        en: "RPG Renaissance logo",
        note: "alt du logo principal",
    },

    {
        key: "subscribe_sr_title",
        fr: "Rejoindre la liste",
        en: "Join the list",
        note: "sr-only title (accessibilité)",
    },
];

export const HERO_COPY = HERO_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<HeroCopyKey, { fr: string | string[]; en: string | string[] }>);

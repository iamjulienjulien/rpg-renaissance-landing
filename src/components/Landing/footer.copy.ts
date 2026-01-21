// Footer + RotatingFooterLine copy
// - Tous les wordings du footer, isolés et disponibles en FR/EN.

export type FooterLocale = "fr" | "en";

export type FooterCopyKey = "brand" | "link_legal" | "link_privacy" | "link_terms" | "lines";

export type FooterCopyRow = {
    key: FooterCopyKey;
    fr: string | string[];
    en: string | string[];
    note?: string;
};

export const FOOTER_COPY_TABLE: FooterCopyRow[] = [
    { key: "brand", fr: "RPG Renaissance", en: "RPG Renaissance" },

    { key: "link_legal", fr: "Mentions légales", en: "Legal notice" },
    { key: "link_privacy", fr: "Confidentialité", en: "Privacy" },
    { key: "link_terms", fr: "Conditions", en: "Terms" },

    {
        key: "lines",
        fr: [
            "Renaissance est un voyage, pas un bouton. (Même si on aime les boutons.)",
            "Renaissance est un chemin, pas un raccourci. (Désolé.)",
            "Renaissance ne règle pas ta vie. Elle t’aide à la traverser.",
            "Ce n’est pas une todo-list. C’est une histoire.",
            "Ici, les échecs donnent de l’XP.",
            "Pas de game over. Juste des checkpoints.",
            "Tu n’es pas en retard. Tu es en chemin.",
            "Aucun coach n’a été maltraité pendant le développement.",
            "Encore en alpha. Comme beaucoup de parcours humains.",
            "Bugs connus: doutes, fatigue, résistance au changement.",
            "Pas encore parfait. Et tant mieux.",
        ],
        en: [
            "Renaissance is a journey, not a button. (Even if we love buttons.)",
            "Renaissance is a path, not a shortcut. (Sorry.)",
            "Renaissance won’t fix your life. It helps you move through it.",
            "This isn’t a to-do list. It’s a story.",
            "Here, failures give XP.",
            "No game over. Just checkpoints.",
            "You’re not late. You’re on the way.",
            "No coaches were harmed during development.",
            "Still in alpha. Like many human journeys.",
            "Known bugs: doubt, fatigue, resistance to change.",
            "Not perfect yet. And that’s the point.",
        ],
        note: "Phrases tournantes du footer",
    },
];

export const FOOTER_COPY = FOOTER_COPY_TABLE.reduce((acc, row) => {
    acc[row.key] = { fr: row.fr, en: row.en };
    return acc;
}, {} as Record<FooterCopyKey, { fr: string | string[]; en: string | string[] }>);

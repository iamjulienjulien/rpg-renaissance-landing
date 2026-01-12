"use client";

import React, { useEffect, useMemo, useState } from "react";

const FOOTER_LINES = [
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
];

type RotatingFooterLineProps = {
    /** ms entre chaque phrase */
    intervalMs?: number;
    /** mélange l’ordre au chargement */
    shuffle?: boolean;
    /** démarrer sur une phrase aléatoire */
    startRandom?: boolean;
    className?: string;
};

function shuffleArray<T>(arr: T[]) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function RotatingFooterLine(props: RotatingFooterLineProps) {
    const { intervalMs = 6500, shuffle = false, startRandom = true, className } = props;

    const lines = useMemo(() => {
        const base = shuffle ? shuffleArray(FOOTER_LINES) : FOOTER_LINES;
        return base.length ? base : [""]; // safety
    }, [shuffle]);

    const [idx, setIdx] = useState(() => {
        if (!startRandom) return 0;
        return Math.floor(Math.random() * lines.length);
    });
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (lines.length <= 1) return;

        const fadeMs = 220; // léger, évite le côté “saccadé”
        const tick = () => {
            setVisible(false);
            window.setTimeout(() => {
                setIdx((prev) => (prev + 1) % lines.length);
                setVisible(true);
            }, fadeMs);
        };

        const t = window.setInterval(tick, Math.max(1500, intervalMs));
        return () => window.clearInterval(t);
    }, [intervalMs, lines.length]);

    const text = lines[idx] ?? "";

    return (
        <span
            className={[
                "transition-opacity duration-200",
                visible ? "opacity-100" : "opacity-0",
                className ?? "",
            ].join(" ")}
        >
            {text}
        </span>
    );
}

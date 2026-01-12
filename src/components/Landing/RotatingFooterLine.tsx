"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

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

    // ✅ SSR-safe: première peinture stable (pas de random / pas de shuffle)
    const [mounted, setMounted] = useState(false);

    // ✅ On fige la liste réelle dans un state, initialisé de façon déterministe
    const [lines, setLines] = useState<string[]>(() => (FOOTER_LINES.length ? FOOTER_LINES : [""]));

    // ✅ Index déterministe au départ (0)
    const [idx, setIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    // Monte côté client
    useEffect(() => {
        setMounted(true);
    }, []);

    // Après mount: on applique shuffle + startRandom (client-only)
    useEffect(() => {
        if (!mounted) return;

        const base = FOOTER_LINES.length ? FOOTER_LINES : [""];
        const nextLines = shuffle ? shuffleArray(base) : base;

        setLines(nextLines);

        if (startRandom && nextLines.length > 1) {
            setIdx(Math.floor(Math.random() * nextLines.length));
        } else {
            setIdx(0);
        }
    }, [mounted, shuffle, startRandom]);

    // Rotation
    useEffect(() => {
        if (!mounted) return;
        if (lines.length <= 1) return;

        const fadeMs = 220;
        const delay = Math.max(1500, intervalMs);

        const tick = () => {
            setVisible(false);
            window.setTimeout(() => {
                setIdx((prev) => (prev + 1) % lines.length);
                setVisible(true);
            }, fadeMs);
        };

        const t = window.setInterval(tick, delay);
        return () => window.clearInterval(t);
    }, [mounted, intervalMs, lines.length]);

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

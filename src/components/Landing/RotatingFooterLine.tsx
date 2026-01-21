"use client";

import React, { useEffect, useState } from "react";
import { FOOTER_COPY, type FooterLocale } from "./footer.copy";

type RotatingFooterLineProps = {
    /** locale du footer */
    locale?: FooterLocale;
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
    const {
        locale = "en",
        intervalMs = 6500,
        shuffle = false,
        startRandom = true,
        className,
    } = props;

    const baseLines = (FOOTER_COPY.lines[locale] as string[]) ?? [""];
    const safeBase = baseLines.length ? baseLines : [""];

    // ✅ SSR-safe: première peinture stable (pas de random / pas de shuffle)
    const [mounted, setMounted] = useState(false);

    // ✅ On fige la liste réelle dans un state, initialisé de façon déterministe
    const [lines, setLines] = useState<string[]>(() => safeBase);

    // ✅ Index déterministe au départ (0)
    const [idx, setIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    // Monte côté client
    useEffect(() => {
        setMounted(true);
    }, []);

    // Si la locale change, on remet une base déterministe SSR-safe, puis on re-randomize après mount
    useEffect(() => {
        const nextBase = (FOOTER_COPY.lines[locale] as string[]) ?? [""];
        setLines(nextBase.length ? nextBase : [""]);
        setIdx(0);
        setVisible(true);
    }, [locale]);

    // Après mount: on applique shuffle + startRandom (client-only)
    useEffect(() => {
        if (!mounted) return;

        const base = (FOOTER_COPY.lines[locale] as string[]) ?? [""];
        const nextLines = shuffle
            ? shuffleArray(base.length ? base : [""])
            : base.length
            ? base
            : [""];

        setLines(nextLines);

        if (startRandom && nextLines.length > 1) {
            setIdx(Math.floor(Math.random() * nextLines.length));
        } else {
            setIdx(0);
        }
    }, [mounted, shuffle, startRandom, locale]);

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

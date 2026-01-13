"use client";

export default function FilmGrain() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay transform-[translateZ(0)] will-change-[opacity]"
            style={{
                backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
            }}
        />
    );
}

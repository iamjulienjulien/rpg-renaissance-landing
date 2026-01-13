// src/components/Landing/BackgroundFX.tsx
"use client";

import dynamic from "next/dynamic";

const RunicParticles = dynamic(() => import("@/components/Landing/RunicParticles"), { ssr: false });
const CursorGlow = dynamic(() => import("@/components/Landing/CursorGlow"), { ssr: false });
const FilmGrain = dynamic(() => import("@/components/Landing/FilmGrain"), { ssr: false });

import Glow from "@/components/Landing/Glow";
import Sigils from "@/components/Landing/Sigils";

export default function BackgroundFX() {
    return (
        <div className="absolute inset-0">
            <Sigils />
            <RunicParticles density={52} />
            <Glow />
            <CursorGlow />
            <FilmGrain />
        </div>
    );
}

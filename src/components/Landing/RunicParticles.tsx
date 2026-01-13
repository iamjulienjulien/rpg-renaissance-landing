// src/components/Landing/RunicParticles.tsx
"use client";

import React, { useEffect, useMemo, useRef } from "react";

type Particle = {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    a: number;
    va: number;
    glyph: string;
};

const GLYPHS = [
    "ᚠ",
    "ᚢ",
    "ᚦ",
    "ᚨ",
    "ᚱ",
    "ᚲ",
    "ᚷ",
    "ᚹ",
    "ᚺ",
    "ᚾ",
    "ᛁ",
    "ᛃ",
    "ᛇ",
    "ᛈ",
    "ᛉ",
    "ᛋ",
    "ᛏ",
    "ᛒ",
    "ᛖ",
    "ᛗ",
    "⟡",
    "⌁",
    "⌬",
    "⟁",
    "⧈",
    "⧉",
    "⧗",
    "⧖",
];

function clamp(n: number, a: number, b: number) {
    return Math.max(a, Math.min(b, n));
}

export default function RunicParticles({
    density = 42,
    maxFps = 60,
}: {
    density?: number;
    maxFps?: number;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const prefersReduced = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    }, []);

    useEffect(() => {
        if (prefersReduced) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = 0;
        let h = 0;
        let raf = 0;

        const particles: Particle[] = [];

        const resize = () => {
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            w = Math.floor(canvas.clientWidth * dpr);
            h = Math.floor(canvas.clientHeight * dpr);
            canvas.width = w;
            canvas.height = h;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(1, 1);

            particles.length = 0;
            for (let i = 0; i < density; i++) {
                particles.push(spawn(w, h));
            }
        };

        const spawn = (W: number, H: number): Particle => {
            const r = Math.random() * 10 + 10;
            const speed = Math.random() * 0.12 + 0.04;
            const angle = Math.random() * Math.PI * 2;
            return {
                x: Math.random() * W,
                y: Math.random() * H,
                r,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                a: Math.random() * 0.55 + 0.12,
                va: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? -1 : 1),
                glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!,
            };
        };

        const draw = (p: Particle) => {
            // glow halo
            ctx.save();
            ctx.globalAlpha = clamp(p.a, 0.05, 0.75);

            const fontSize = Math.max(12, Math.min(28, p.r * 1.35));
            ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // halo
            ctx.shadowBlur = 18;
            ctx.shadowColor = "rgba(0, 255, 255, 0.28)";
            ctx.fillStyle = "rgba(0, 255, 255, 0.18)";
            ctx.fillText(p.glyph, p.x, p.y);

            // core
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(168, 85, 247, 0.25)";
            ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
            ctx.fillText(p.glyph, p.x, p.y);

            ctx.restore();
        };

        let last = 0;
        const frameInterval = 1000 / maxFps;

        const tick = (ts: number) => {
            raf = requestAnimationFrame(tick);

            if (ts - last < frameInterval) return;
            last = ts;

            // clear with slight trail
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "rgba(5, 6, 10, 0.15)";
            ctx.fillRect(0, 0, w, h);

            // subtle scanlines
            //   ctx.save();
            //   ctx.globalAlpha = 0.06;
            //   ctx.fillStyle = "#ffffff";
            //   for (let y = 0; y < h; y += 6) {
            //     ctx.fillRect(0, y, w, 1);
            //   }
            //   ctx.restore();

            // subtle grain (no grid)
            ctx.save();
            ctx.globalAlpha = 0.04;
            ctx.fillStyle = "#ffffff";
            for (let i = 0; i < 220; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                ctx.fillRect(x, y, 1, 1);
            }
            ctx.restore();

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                p.a += p.va;

                if (p.a < 0.08 || p.a > 0.75) p.va *= -1;

                // wrap
                if (p.x < -50) p.x = w + 50;
                if (p.x > w + 50) p.x = -50;
                if (p.y < -50) p.y = h + 50;
                if (p.y > h + 50) p.y = -50;

                draw(p);
            }
        };

        const onResize = () => resize();

        resize();
        raf = requestAnimationFrame(tick);
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, [density, maxFps, prefersReduced]);

    return (
        <div className="pointer-events-none absolute inset-0 -z-10">
            <canvas ref={canvasRef} className="h-full w-full opacity-90" />
            {/* vignette & chromatic haze */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(900px 520px at 20% 10%, rgba(0,255,255,0.10), transparent 60%)," +
                        "radial-gradient(800px 540px at 90% 20%, rgba(168,85,247,0.10), transparent 60%)," +
                        "radial-gradient(900px 700px at 55% 115%, rgba(245,158,11,0.06), transparent 60%)," +
                        "radial-gradient(circle at center, rgba(0,0,0,0.15), rgba(0,0,0,0.75))",
                }}
            />
        </div>
    );
}

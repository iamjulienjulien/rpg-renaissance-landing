"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
        if (mq?.matches) return;

        let raf = 0;
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let tx = x;
        let ty = y;

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            if (!raf) raf = requestAnimationFrame(tick);
        };

        const tick = () => {
            raf = 0;
            // easing pour un suivi doux
            x += (tx - x) * 0.12;
            y += (ty - y) * 0.12;

            el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
            // Continue tant que ça bouge un peu
            if (Math.abs(tx - x) + Math.abs(ty - y) > 0.2) {
                raf = requestAnimationFrame(tick);
            }
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 -z-10">
            <div
                ref={ref}
                className="absolute h-125 w-125 rounded-full blur-3xl opacity-80"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0,255,255,0.18), transparent 55%)," +
                        "radial-gradient(circle at 35% 30%, rgba(168,85,247,0.14), transparent 60%)," +
                        "radial-gradient(circle at 65% 70%, rgba(245,158,11,0.08), transparent 60%)",
                }}
            />
        </div>
    );
}

// src/components/Landing/Features.tsx
"use client";
import { motion } from "framer-motion";

export default function Features() {
    const items = [
        {
            title: "Univers Renaissance",
            desc: "Un imaginaire lumineux: transformation, reconstruction, puissance douce.",
            icon: "👑",
        },
        {
            title: "Mission du quotidien",
            desc: "Transforme tes objectifs en missions jouables, avec étapes, récompenses et narration.",
            icon: "📜",
        },
        {
            title: "Système de progression",
            desc: "Renommée, niveaux, badges. Ton avancement devient visible et motivant.",
            icon: "🏆",
        },
        {
            title: "Maître du jeu IA",
            desc: "Un Maître du Jeu qui t’aide à clarifier, choisir, persister… sans te juger.",
            icon: "🧙",
        },
        {
            title: "Objets & rituels",
            desc: "Des routines packagées en “objets” et “sorts” que tu peux équiper.",
            icon: "🧰",
        },
        {
            title: "Avatar narratif",
            desc: "Génère un portrait fantasy à partir de tes photos, pour incarner ton run.",
            icon: "🖼️",
        },
    ];

    return (
        <section id="features" className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xs tracking-[0.22em] text-white/55 uppercase">
                        Le concept
                    </h2>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
                        Une app, un jeu, une montée en puissance
                    </h3>
                    <p className="mt-3 text-white/70 max-w-2xl">
                        RPG Renaissance transforme ta progression personnelle en aventure: claire,
                        épique, mesurable.
                    </p>
                    <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl">
                        Pour celles et ceux qui veulent avancer sans se flageller.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it) => (
                    <motion.div
                        key={it.title}
                        whileHover={{ y: -6, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="group rounded-3xl bg-black/25 ring-1 ring-white/10 p-6 hover:bg-black/30 transition relative overflow-hidden"
                    >
                        {/* sheen */}
                        <div
                            className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-100 transition duration-300"
                            style={{
                                background:
                                    "radial-gradient(circle at 30% 20%, rgba(0,255,255,0.14), transparent 55%)," +
                                    "radial-gradient(circle at 80% 60%, rgba(168,85,247,0.14), transparent 55%)",
                            }}
                        />

                        <div className="relative">
                            <div className="h-11 w-11 rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center text-lg">
                                {it.icon}
                            </div>
                            <div className="mt-4 font-semibold text-white/90">{it.title}</div>
                            <div className="mt-2 text-sm text-white/70 leading-relaxed">
                                {it.desc}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

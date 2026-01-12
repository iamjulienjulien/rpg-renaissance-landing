"use client";

import { motion } from "framer-motion";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

const STEPS = [
    {
        n: "01",
        title: "Choisis une quête",
        desc: "Un objectif clair, transformé en mission jouable avec une récompense.",
        icon: "🎯",
    },
    {
        n: "02",
        title: "Joue dans la vraie vie",
        desc: "Tu avances par micro-actions. Chaque pas est compté, pas jugé.",
        icon: "👣",
    },
    {
        n: "03",
        title: "Gagne de la Renommée",
        desc: "Badges, niveaux, momentum. Ton progrès devient visible.",
        icon: "🏆",
    },
    {
        n: "04",
        title: "Débloque un pouvoir",
        desc: "Rituels, inventaires, buffs. Tu t’équipes pour continuer.",
        icon: "🔓",
    },
];

export default function Gameplay() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <div className="text-xs tracking-[0.22em] text-white/55 uppercase">
                        La Boucle de jeu
                    </div>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                        La progression, version RPG
                    </h2>
                    <p className="mt-3 text-white/70 max-w-2xl">
                        Pas de blabla. Une boucle simple, répétable, qui transforme tes journées en
                        montée en puissance.
                    </p>
                    <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl">
                        Chaque journée devient une petite scène de jeu.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-4">
                {STEPS.map((s, idx) => (
                    <motion.div
                        key={s.n}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className={cn(
                            "relative overflow-hidden rounded-3xl bg-black/25 ring-1 ring-white/10 p-6",
                            "hover:bg-black/30 transition"
                        )}
                    >
                        <div
                            className="pointer-events-none absolute -inset-24 opacity-60"
                            style={{
                                background:
                                    "radial-gradient(circle at 30% 20%, rgba(0,255,255,0.10), transparent 55%)," +
                                    "radial-gradient(circle at 80% 70%, rgba(168,85,247,0.10), transparent 55%)",
                            }}
                        />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <div className="h-11 w-11 rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center text-lg">
                                    {s.icon}
                                </div>
                                <div className="text-xs text-white/45 font-mono">{s.n}</div>
                            </div>

                            <div className="mt-4 font-semibold text-white/90">{s.title}</div>
                            <div className="mt-2 text-sm text-white/70 leading-relaxed">
                                {s.desc}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

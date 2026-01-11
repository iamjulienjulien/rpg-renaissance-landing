// src/components/Landing/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Glow from "./Glow";
import SubscribeForm from "./SubscribeForm";
// import RunicParticles from "./RunicParticles";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function Hero() {
    return (
        <section className="relative">
            {/* <RunicParticles density={52} /> */}
            {/* <Glow /> */}

            <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:pt-24">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
                            <span className="text-lg">🜂</span>
                        </div>
                        <div className="text-sm text-white/70">
                            <div className="font-semibold text-white/90">RPG Renaissance</div>
                            <div className="text-xs">rpg-renaissance.fr • rpg-renaissance.com</div>
                        </div>
                    </div>

                    <a
                        href="#subscribe"
                        className={cn(
                            "hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm",
                            "bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                        )}
                    >
                        ✨ Rejoindre la liste
                    </a>
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-2 text-sm text-white/80"
                        >
                            ⚔️ Le jeu de rôle où le boss final, c’est tes propres limites.
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.05 }}
                            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
                        >
                            Deviens ton propre personnage.
                            <span className="block text-white/70">Écris ta Renaissance.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl"
                        >
                            Un RPG introspectif, narratif et évolutif: tu choisis tes quêtes, tu
                            gagnes de l’élan, tu débloques des pouvoirs… et tu avances dans la vraie
                            vie. 🧠✨
                        </motion.p>

                        <div className="mt-7 flex flex-wrap gap-2">
                            {[
                                "🎭 Archétypes & vibes",
                                "📜 Quêtes du quotidien",
                                "🧩 Inventaires & rituels",
                                "🏆 Renommée & badges",
                                "🧙 Avatars fantasy (toi, en épique)",
                            ].map((x) => (
                                <span
                                    key={x}
                                    className="rounded-full bg-black/20 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10"
                                >
                                    {x}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <a
                                href="#subscribe"
                                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold
                           bg-white text-black hover:bg-white/90 transition"
                            >
                                🔥 Être prévenu du lancement
                            </a>
                            <a
                                href="#features"
                                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold
                           bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                            >
                                🧩 Découvrir le concept
                            </a>
                        </div>

                        <div className="mt-6 text-xs text-white/50">
                            Pas de spam. Juste des nouvelles quand un nouveau chapitre s’ouvre.
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        className="relative"
                    >
                        <div className="rounded-3xl bg-black/30 ring-1 ring-white/10 p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-sm font-semibold text-white/90">
                                        Accès anticipé
                                    </div>
                                    <div className="mt-1 text-xs text-white/60">
                                        Reçois l’invitation quand l’alpha ouvre ses portes. 🗝️
                                    </div>
                                </div>
                                <div className="text-xs rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-white/70">
                                    Early
                                </div>
                            </div>

                            <div id="subscribe" className="mt-4">
                                <SubscribeForm />
                            </div>
                        </div>

                        <div className="pointer-events-none absolute -inset-4 rounded-4xl ring-1 ring-white/10 blur-[1px]" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

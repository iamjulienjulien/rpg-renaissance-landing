// src/components/Landing/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Glow from "./Glow";
import SubscribeForm from "./SubscribeForm";
import Image from "next/image";
// import RunicParticles from "./RunicParticles";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function Hero() {
    return (
        <header className="relative">
            <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:pt-24">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
                            <span className="text-lg">
                                <Image
                                    src="/assets/logos/icon_renaissance.png"
                                    alt="RPG Renaissance"
                                    width={32}
                                    height={32}
                                    priority
                                />
                            </span>
                        </div>
                        <div className="text-sm text-white/70">
                            <h1 id="hero-title" className="font-semibold text-white/90">
                                RPG Renaissance
                            </h1>
                            <p className="text-xs">✨ La renaissance, en mode jeu de rôle. 🧙</p>
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

                <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-2 text-sm text-white/80"
                        >
                            ⚔️ Le jeu de rôle où le boss final, c’est tes propres limites.
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.05 }}
                            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
                        >
                            Deviens ton propre personnage.
                            <span className="block text-white/70">Écris ta Renaissance.</span>
                        </motion.h2>

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
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl"
                        >
                            Un jeu narratif pour transformer ta progression personnelle en aventure
                            concrète.
                        </motion.p>

                        <div className="mt-7 flex flex-wrap gap-2">
                            {[
                                "🌍 Une aventure à vivre",
                                "🧭 Un voyage guidé, pas imposé",
                                "📜 Quêtes du quotidien",
                                "🔮 Rituels simples, impact réel",
                                "🎖️ Des preuves de chemin parcouru",
                                "🔥 Te voir autrement",
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
                                🧩 Comment ça fonctionne
                            </a>
                        </div>

                        <div className="mt-6 text-xs text-white/50">
                            Pas de spam. Juste un signal quand ton aventure peut commencer.
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        className="relative flex flex-col justify-between h-full"
                    >
                        <div className="mt-7">
                            <Image
                                src="/assets/logos/logo_renaissance.png"
                                alt="Logo RPG Renaissance"
                                width={230}
                                height={230}
                                sizes="(max-width: 1024px) 60vw, 420px"
                                priority
                                className="m-auto"
                            />
                        </div>

                        <section
                            id="subscribe"
                            aria-labelledby="subscribe-title"
                            className="relative"
                        >
                            <h2 id="subscribe-title" className="sr-only">
                                Rejoindre la liste
                            </h2>
                            <SubscribeForm />
                        </section>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}

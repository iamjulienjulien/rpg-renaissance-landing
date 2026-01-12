// src/components/Landing/Roadmap.tsx
"use client";
import { motion } from "framer-motion";

export default function Roadmap() {
    const steps = [
        {
            title: "Prologue",
            desc: "Ouverture de la liste d’attente et premières démos (à venir).",
            badge: "✅ En cours",
        },
        {
            title: "Alpha fermée",
            desc: "Démos du système de quêtes, avec progression et journal.",
            badge: "⏳ Cet hiver",
        },
        // {
        //   title: "Avatars",
        //   desc: "Génération d’avatars & sélection en jeu.",
        //   badge: "🧪 itération",
        // },
        {
            title: "Beta",
            desc: "Première aventure complète : chapitres, quêtes, récompenses, narration.",
            badge: "🛠️ Printemps 2026",
        },
        {
            title: "Lancement",
            desc: "Une saison, des chapitres, une renaissance collective.",
            badge: "🔥 Été 2026",
        },
    ];

    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 pb-15 sm:pb-15">
                <div className="rounded-[40px] bg-black/25 ring-1 ring-white/10 p-8 sm:p-10">
                    <h2 className="text-xs tracking-[0.22em] text-white/55 uppercase">
                        La Roadmap
                    </h2>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold">Les prochains chapitres</h3>
                    <p className="mt-3 text-white/70 max-w-2xl">
                        Une progression en étapes, comme une campagne: simple, lisible, solide.
                    </p>
                    <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl">
                        RPG Renaissance se construit comme une campagne : chapitre par chapitre.
                    </p>

                    <div className="mt-8 grid gap-3">
                        {steps.map((s) => (
                            <motion.div
                                key={s.title}
                                whileHover={{ x: 6 }}
                                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-3xl bg-white/5 ring-1 ring-white/10 px-5 py-4"
                            >
                                <div>
                                    <div className="font-semibold text-white/90">{s.title}</div>
                                    <div className="text-sm text-white/70">{s.desc}</div>
                                </div>
                                <div className="text-xs rounded-full bg-black/30 ring-1 ring-white/10 px-3 py-1 text-white/80">
                                    {s.badge}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-xs text-white/50">
                        Tu veux participer aux premiers tests? Inscris-toi, et je te ping quand ça
                        ouvre. 📨
                    </div>
                </div>
            </section>
            <p className="text-center text-sm text-white/50 leading-relaxed mb-15">
                Tu n’as rien à réussir ici. Juste à jouer honnêtement 🤝
            </p>
        </div>
    );
}

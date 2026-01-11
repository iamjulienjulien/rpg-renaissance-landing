"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type TabKey = "quest" | "inventory" | "journal";

const TABS: Array<{
    key: TabKey;
    label: string;
    emoji: string;
    hint: string;
}> = [
    { key: "quest", label: "Quête", emoji: "📜", hint: "Mission active & récompense" },
    { key: "inventory", label: "Inventaire", emoji: "🧰", hint: "Rituels & buffs équipés" },
    { key: "journal", label: "Journal", emoji: "📖", hint: "Log narratif & progrès" },
];

export default function PrologueDemo() {
    const [tab, setTab] = useState<TabKey>("quest");
    const [renown, setRenown] = useState(42);
    const [toast, setToast] = useState<string | null>(null);
    const toastTimerRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
        };
    }, []);

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

    const tabTarget = useMemo(() => {
        // une cible différente par onglet (ça donne une sensation "système")
        if (tab === "inventory") return 58;
        if (tab === "journal") return 66;
        return 52; // quest
    }, [tab]);

    const progress = clamp(Math.round((renown / 100) * 100), 0, 100);

    const showToast = (msg: string) => {
        setToast(msg);
        if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = window.setTimeout(() => setToast(null), 1600);
    };

    const onValidate = () => {
        const gain = Math.floor(Math.random() * 4) + 2; // +2 à +5
        setRenown((prev) => clamp(prev + gain, 0, 100));
        showToast(`✨ Action validée • +${gain} Renommée`);
    };

    const content = useMemo(() => {
        if (tab === "inventory") {
            return {
                title: "Inventaire équipé",
                subtitle: "Objets utiles, petits sorts, grosses intentions.",
                rows: [
                    { k: "Artefact", v: "Boussole de clarté 🧭" },
                    { k: "Sort", v: "Respiration 4–7–8 🌬️" },
                    { k: "Rituel", v: "Reset du foyer (10 min) 🧹" },
                    { k: "Potion", v: "Eau + sel + citron 🍋" },
                ],
                panelTitle: "Buff passif",
                panelText:
                    "“Quand tu fais simple, tu gagnes du temps… et quand tu gagnes du temps, tu reprends le contrôle.” ✨",
            };
        }

        if (tab === "journal") {
            return {
                title: "Journal de run",
                subtitle: "Une trace. Un récit. Un lien avec toi-même.",
                rows: [
                    { k: "Entrée", v: "J’ai fait 1 action minuscule." },
                    { k: "Résultat", v: "Moins de friction, plus de souffle." },
                    { k: "Loot", v: "1 point de Renommée 🏆" },
                    { k: "Note", v: "Demain: répéter sans forcer." },
                ],
                panelTitle: "Phrase du jour",
                panelText: "“Tu n’as pas besoin d’être prêt. Tu as besoin de commencer.” 🗡️",
            };
        }

        // quest
        return {
            title: "Prologue",
            subtitle: "Tu es déjà dans l’aventure. Maintenant: un pas.",
            rows: [
                { k: "Quête active", v: "Reprendre le contrôle ⚙️" },
                { k: "Énergie", v: "Éclats de volonté ✨✨✨" },
                { k: "Récompense", v: "Un niveau de clarté" },
                { k: "Compagnon", v: "Ton IA-MJ" },
            ],
            panelTitle: "Rituel du jour",
            panelText:
                "“Choisis une action minuscule, rends-la héroïque. Puis recommence demain.” 🗡️",
        };
    }, [tab]);

    return (
        <section className="mx-auto max-w-6xl px-6 pb-14 sm:pb-20">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
                {/* Left text */}
                <div>
                    <div className="text-xs tracking-[0.22em] text-white/55 uppercase">Démo</div>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                        Une interface, et tu joues déjà
                    </h2>
                    <p className="mt-3 text-white/70 leading-relaxed max-w-xl">
                        Passe d’une quête à ton inventaire, puis au journal. Même sans backend, la
                        vibe doit donner envie de cliquer partout.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {["⚔️ Narratif", "🧠 IA-MJ", "🧩 Rituels", "🏆 Renommée"].map((x) => (
                            <span
                                key={x}
                                className="rounded-full bg-black/20 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10"
                            >
                                {x}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right demo */}
                <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.99 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="rounded-3xl bg-black/30 ring-1 ring-white/10 p-5">
                        {/* Tabs */}
                        <div className="flex flex-wrap items-center gap-2">
                            {TABS.map((t) => {
                                const active = tab === t.key;
                                return (
                                    <button
                                        key={t.key}
                                        type="button"
                                        onClick={() => {
                                            setTab(t.key);
                                            // petit aimant vers la cible du tab: impression de "build" différent
                                            setRenown((prev) => {
                                                const next = Math.round(
                                                    prev + (tabTarget - prev) * 0.25
                                                );
                                                return clamp(next, 0, 100);
                                            });
                                        }}
                                        className={cn(
                                            "rounded-full px-3 py-2 text-xs ring-1 transition",
                                            "inline-flex items-center gap-2",
                                            active
                                                ? "bg-white/10 text-white ring-white/20"
                                                : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10"
                                        )}
                                        aria-pressed={active}
                                    >
                                        <span>{t.emoji}</span>
                                        <span className="font-semibold">{t.label}</span>
                                    </button>
                                );
                            })}

                            <div className="ml-auto text-xs text-white/45 hidden sm:block">
                                {TABS.find((x) => x.key === tab)?.hint ?? ""}
                            </div>
                        </div>

                        {/* Card */}
                        <div className="mt-4 rounded-2xl bg-black/35 ring-1 ring-white/10 p-5 overflow-hidden">
                            <div className="flex items-center justify-between gap-2">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={tab + "-title"}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.18 }}
                                        className="text-sm font-semibold text-white/90"
                                    >
                                        {content.title}
                                    </motion.div>
                                </AnimatePresence>

                                <div className="text-xs text-white/55">Preview</div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={tab + "-sub"}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.18, delay: 0.02 }}
                                    className="mt-1 text-xs text-white/60"
                                >
                                    {content.subtitle}
                                </motion.div>
                            </AnimatePresence>

                            {/* Renommée + CTA */}
                            <div className="mt-4 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="text-xs uppercase tracking-[0.18em] text-white/55">
                                            Renommée
                                        </div>
                                        <div className="mt-1 text-sm text-white/85">
                                            {renown}/100{" "}
                                            <span className="text-white/50">
                                                • niveau “Initiation”
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={onValidate}
                                        className={cn(
                                            "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                                            "bg-white text-black hover:bg-white/90"
                                        )}
                                    >
                                        ✅ Valider
                                    </button>
                                </div>

                                {/* Progress bar */}
                                <div className="mt-3 h-3 w-full rounded-full bg-black/40 ring-1 ring-white/10 overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, rgba(0,255,255,0.70), rgba(168,85,247,0.75), rgba(245,158,11,0.55))",
                                        }}
                                        initial={false}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ type: "spring", stiffness: 200, damping: 22 }}
                                    />
                                </div>

                                <div className="mt-2 text-[11px] text-white/45">
                                    Astuce: une action minuscule validée = une victoire réelle.
                                </div>
                            </div>

                            {/* Toast */}
                            <AnimatePresence>
                                {toast ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                        transition={{ duration: 0.18 }}
                                        className="mt-3 rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20 px-4 py-2 text-xs text-emerald-100"
                                    >
                                        {toast}
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={tab + "-rows"}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.22 }}
                                    className="mt-4 grid gap-3"
                                >
                                    {content.rows.map((row) => (
                                        <motion.div
                                            key={row.k}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.18 }}
                                            className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3"
                                        >
                                            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
                                                {row.k}
                                            </div>
                                            <div className="text-sm text-white/85">{row.v}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={tab + "-panel"}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.22 }}
                                    className="mt-5 rounded-2xl bg-linear-to-r from-white/10 to-white/5 ring-1 ring-white/10 p-4"
                                >
                                    <div className="text-xs uppercase tracking-[0.18em] text-white/55">
                                        {content.panelTitle}
                                    </div>
                                    <div className="mt-2 text-sm text-white/80 leading-relaxed">
                                        {content.panelText}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -inset-4 rounded-4xl ring-1 ring-white/10 blur-[1px]" />
                </motion.div>
            </div>
        </section>
    );
}

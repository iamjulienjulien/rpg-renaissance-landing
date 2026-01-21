"use client";

import { motion } from "framer-motion";
import { GAMEPLAY_COPY, type GameplayLocale, type GameplayCopyKey } from "./gameplay.copy";
import { useLocale } from "@/components/I18n/LocaleProvider";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function Gameplay() {
    const locale = useLocale() as GameplayLocale;
    const t = <K extends GameplayCopyKey>(key: K) => GAMEPLAY_COPY[key][locale];

    const STEPS = [
        { n: "01", title: t("step_01_title"), desc: t("step_01_desc"), icon: "🎯" },
        { n: "02", title: t("step_02_title"), desc: t("step_02_desc"), icon: "👣" },
        { n: "03", title: t("step_03_title"), desc: t("step_03_desc"), icon: "🏆" },
        { n: "04", title: t("step_04_title"), desc: t("step_04_desc"), icon: "🔓" },
    ];

    return (
        <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xs tracking-[0.22em] text-white/55 uppercase">
                        {t("kicker")}
                    </h2>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold">{t("title")}</h3>
                    <p className="mt-3 text-white/70 max-w-2xl">{t("lead")}</p>
                    <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl">
                        {t("sublead")}
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map((s, idx) => (
                    <motion.div
                        key={s.n}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                        <motion.div
                            whileHover={{ y: -6, scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl bg-black/25 ring-1 ring-white/10 p-6",
                                "hover:bg-black/30 transition",
                                "h-full flex flex-col"
                            )}
                        >
                            <div
                                className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-100 transition duration-300"
                                style={{
                                    background:
                                        "radial-gradient(circle at 30% 20%, rgba(0,255,255,0.14), transparent 55%)," +
                                        "radial-gradient(circle at 80% 60%, rgba(168,85,247,0.14), transparent 55%)",
                                }}
                            />

                            <div className="relative flex flex-col h-full">
                                <div className="flex items-center justify-between">
                                    <div className="h-11 w-11 rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center text-lg">
                                        {s.icon}
                                    </div>
                                    <div className="text-xs text-white/45 font-mono">{s.n}</div>
                                </div>

                                <div className="mt-4 font-semibold text-white/90">{s.title}</div>
                                <div className="mt-2 text-sm text-white/70 leading-relaxed flex-1">
                                    {s.desc}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

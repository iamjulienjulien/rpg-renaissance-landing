"use client";

import { motion } from "framer-motion";
import { FEATURES_COPY, type FeaturesLocale, type FeaturesCopyKey } from "./features.copy";
import { useLocale } from "@/components/I18n/LocaleProvider";

export default function Features() {
    const locale = useLocale() as FeaturesLocale;
    const t = <K extends FeaturesCopyKey>(key: K) => FEATURES_COPY[key][locale];

    const items = [
        { title: t("item_01_title"), desc: t("item_01_desc"), icon: "👑" },
        { title: t("item_02_title"), desc: t("item_02_desc"), icon: "📜" },
        { title: t("item_03_title"), desc: t("item_03_desc"), icon: "🏆" },
        { title: t("item_04_title"), desc: t("item_04_desc"), icon: "🧙" },
        { title: t("item_05_title"), desc: t("item_05_desc"), icon: "🧰" },
        { title: t("item_06_title"), desc: t("item_06_desc"), icon: "🖼️" },
    ];

    return (
        <section id="features" className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
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

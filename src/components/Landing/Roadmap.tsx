"use client";

import { motion } from "framer-motion";
import { ROADMAP_COPY, type RoadmapLocale, type RoadmapCopyKey } from "./roadmap.copy";
import { useLocale } from "@/components/I18n/LocaleProvider";

export default function Roadmap() {
    const locale = useLocale() as RoadmapLocale;
    const t = <K extends RoadmapCopyKey>(key: K) => ROADMAP_COPY[key][locale];

    const steps = [
        {
            title: t("step_01_title"),
            desc: t("step_01_desc"),
            badge: t("step_01_badge"),
        },
        {
            title: t("step_02_title"),
            desc: t("step_02_desc"),
            badge: t("step_02_badge"),
        },
        {
            title: t("step_03_title"),
            desc: t("step_03_desc"),
            badge: t("step_03_badge"),
        },
        {
            title: t("step_04_title"),
            desc: t("step_04_desc"),
            badge: t("step_04_badge"),
        },
    ];

    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 pb-15 sm:pb-15">
                <div className="rounded-[40px] bg-black/25 ring-1 ring-white/10 p-8 sm:p-10">
                    <h2 className="text-xs tracking-[0.22em] text-white/55 uppercase">
                        {t("kicker")}
                    </h2>

                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold">{t("title")}</h3>

                    <p className="mt-3 text-white/70 max-w-2xl">{t("lead")}</p>

                    <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl">
                        {t("sublead")}
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
                                <div className="self-start sm:self-auto">
                                    <div className="inline-flex text-xs rounded-full bg-black/30 ring-1 ring-white/10 px-3 py-1 text-white/80 whitespace-nowrap">
                                        {s.badge}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-xs text-white/50">{t("fineprint_invite_tests")}</div>
                </div>
            </section>

            <p className="text-center text-sm text-white/50 leading-relaxed mb-15">
                {t("closing_line")}
            </p>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import Glow from "./Glow";
import SubscribeForm from "./SubscribeForm";
import Image from "next/image";

import { HERO_COPY, type HeroLocale, type HeroCopyKey } from "./hero.copy";
import { useLocale } from "@/components/I18n/LocaleProvider";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function Hero() {
    const locale = useLocale() as HeroLocale;

    const t = <K extends HeroCopyKey>(key: K) => HERO_COPY[key][locale];
    const badges = t("badges") as string[];

    return (
        <header className="relative">
            <div className="mx-auto max-w-6xl px-6 pt-6 md:pt-10 pb-10 ">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
                            <span className="text-lg">
                                <Image
                                    src="/assets/logos/icon_renaissance.avif"
                                    alt={t("logo_alt_icon") as string}
                                    width={32}
                                    height={32}
                                    priority={false}
                                />
                            </span>
                        </div>
                        <div className="text-sm text-white/70">
                            <h1
                                id="hero-title"
                                className="font-semibold text-white/90 text-right sm:text-left"
                            >
                                {t("brand_title") as string}
                            </h1>
                            <p className="text-xs">{t("brand_tagline") as string}</p>
                        </div>
                    </div>

                    <a
                        href="#subscribe"
                        className={cn(
                            "hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm",
                            "bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                        )}
                    >
                        {t("cta_join_list") as string}
                    </a>
                </div>

                <div className="mt-5 lg:mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div>
                        <div className="hidden lg:flex justify-start">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55 }}
                                className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-2 text-sm text-white/80"
                            >
                                {t("pill_boss_final") as string}
                            </motion.div>
                        </div>

                        <div className="block lg:hidden">
                            <Image
                                src="/assets/logos/logo_renaissance.avif"
                                alt={t("logo_alt_main") as string}
                                width={230}
                                height={230}
                                sizes="(max-width: 1024px) 60vw, 420px"
                                priority
                                className="m-auto"
                            />
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.05 }}
                            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
                        >
                            {t("headline_line1") as string}
                            <span className="block text-white/70">
                                {t("headline_line2") as string}
                            </span>
                        </motion.h2>

                        <div className="flex lg:hidden justify-start mt-7 mb-7">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55 }}
                                className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-2 text-sm text-white/80"
                            >
                                {t("pill_boss_final") as string}
                            </motion.div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="mt-5 text-lg text-white/70 leading-relaxed max-w-none lg:max-w-xl"
                        >
                            {t("lead") as string}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="mt-5 text-sm text-white/50 leading-relaxed max-w-xl"
                        >
                            {t("sublead") as string}
                        </motion.p>

                        <div className="mt-7 flex flex-wrap gap-2">
                            {badges.map((x) => (
                                <span
                                    key={x}
                                    className="rounded-full bg-black/20 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10"
                                >
                                    {x}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row lg:items-center lg:justify-start lg:flex-wrap">
                            <a
                                href="#subscribe"
                                className="inline-flex items-center justify-center w-full md:w-1/2 lg:w-auto rounded-2xl px-5 py-3 font-semibold bg-white text-black hover:bg-white/90 transition"
                            >
                                {t("cta_notify_launch") as string}
                            </a>

                            <a
                                href="#features"
                                className="inline-flex items-center justify-center w-full md:w-1/2 lg:w-auto rounded-2xl px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                            >
                                {t("cta_how_it_works") as string}
                            </a>
                        </div>

                        <div className="mt-6 text-xs text-white/50">
                            {t("fineprint_no_spam") as string}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        className="relative flex flex-col justify-between h-full"
                    >
                        <div className="mt-7 hidden lg:block">
                            <Image
                                src="/assets/logos/logo_renaissance.avif"
                                alt={t("logo_alt_main") as string}
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
                                {t("subscribe_sr_title") as string}
                            </h2>
                            <SubscribeForm />
                        </section>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}

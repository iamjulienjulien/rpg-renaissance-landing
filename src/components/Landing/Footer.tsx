"use client";

import { RotatingFooterLine } from "./RotatingFooterLine";
import { FOOTER_COPY, type FooterLocale, type FooterCopyKey } from "./footer.copy";
import { useLocale } from "@/components/I18n/LocaleProvider";

export default function Footer() {
    const locale = useLocale() as FooterLocale;
    const t = <K extends FooterCopyKey>(key: K) => FOOTER_COPY[key][locale];

    const brand = t("brand") as string;

    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/60 flex flex-col md:flex-row gap-4 items-center md:justify-between">
                {/* Left */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <div>
                        © {new Date().getFullYear()} {brand}
                    </div>

                    <span className="hidden sm:inline text-white/30">•</span>

                    <nav className="flex items-center gap-3 text-xs text-white/50">
                        <a href="/legal" className="hover:text-white/80 transition">
                            {t("link_legal") as string}
                        </a>
                        <span className="text-white/30">•</span>
                        <a href="/privacy" className="hover:text-white/80 transition">
                            {t("link_privacy") as string}
                        </a>
                        <span className="text-white/30">•</span>
                        <a href="/terms" className="hover:text-white/80 transition">
                            {t("link_terms") as string}
                        </a>
                    </nav>
                </div>

                {/* Right */}
                <RotatingFooterLine
                    locale={locale}
                    intervalMs={7000}
                    shuffle
                    startRandom
                    className="text-white/45 text-center md:text-right"
                />
            </div>
        </footer>
    );
}

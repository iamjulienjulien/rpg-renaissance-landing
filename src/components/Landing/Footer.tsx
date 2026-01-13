// src/components/Landing/Footer.tsx
import { RotatingFooterLine } from "./RotatingFooterLine";

export default function Footer() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/60 flex flex-col md:flex-row gap-4 items-center md:justify-between">
                {/* Left */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <div>© {new Date().getFullYear()} RPG Renaissance</div>

                    <span className="hidden sm:inline text-white/30">•</span>

                    <nav className="flex items-center gap-3 text-xs text-white/50">
                        <a href="/legal" className="hover:text-white/80 transition">
                            Mentions légales
                        </a>
                        <span className="text-white/30">•</span>
                        <a href="/privacy" className="hover:text-white/80 transition">
                            Confidentialité
                        </a>
                        <span className="text-white/30">•</span>
                        <a href="/terms" className="hover:text-white/80 transition">
                            Conditions
                        </a>
                    </nav>
                </div>

                {/* Right */}
                <RotatingFooterLine
                    intervalMs={7000}
                    shuffle
                    startRandom
                    className="text-white/45 text-center md:text-right"
                />
            </div>
        </footer>
    );
}

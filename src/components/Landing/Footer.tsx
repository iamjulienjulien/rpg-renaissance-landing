import { RotatingFooterLine } from "./RotatingFooterLine";

// src/components/Landing/Footer.tsx
export default function Footer() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/60 flex flex-col md:flex-row gap-3 items-center md:justify-between">
                <div>© {new Date().getFullYear()} RPG Renaissance</div>
                <RotatingFooterLine
                    intervalMs={7000}
                    shuffle
                    startRandom
                    className="text-white/45"
                />
            </div>
        </footer>
    );
}

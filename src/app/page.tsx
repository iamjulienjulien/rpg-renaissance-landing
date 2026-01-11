// src/app/page.tsx
import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import Roadmap from "@/components/Landing/Roadmap";
import Footer from "@/components/Landing/Footer";
import RunicParticles from "@/components/Landing/RunicParticles";
import Glow from "@/components/Landing/Glow";
import CursorGlow from "@/components/Landing/CursorGlow";
import Sigils from "@/components/Landing/Sigils";
import FilmGrain from "@/components/Landing/FilmGrain";
import Gameplay from "@/components/Landing/Gameplay";
import PrologueDemo from "@/components/Landing/PrologueDemo";

export default function Page() {
    return (
        <main className="relative isolate min-h-screen overflow-x-hidden">
            {/* Background global unique */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <Sigils />
                <RunicParticles density={52} />
                <Glow />
                <CursorGlow />
                <FilmGrain />
            </div>
            <Hero />
            <Gameplay />
            <Features />
            <PrologueDemo />
            <Roadmap />
            <Footer />
        </main>
    );
}

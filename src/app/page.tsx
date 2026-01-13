// src/app/page.tsx
import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import Roadmap from "@/components/Landing/Roadmap";
import Footer from "@/components/Landing/Footer";
import Gameplay from "@/components/Landing/Gameplay";

export default function Page() {
    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <Hero />
            <Gameplay />
            <Features />
            <Roadmap />
            <Footer />
        </main>
    );
}

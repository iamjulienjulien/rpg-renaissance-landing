// src/app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RPG Renaissance",
  description:
    "Le premier jeu de rôle où le personnage principal, c’est toi. RPG introspectif, narratif et évolutif.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="overflow-hidden">
      <body className="min-h-screen text-white bg-black overflow-x-hidden">
        {/* Background global (ne dépend d'aucune section) */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(120,60,255,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(40,200,255,0.12),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(255,180,60,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Contenu au-dessus */}
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}

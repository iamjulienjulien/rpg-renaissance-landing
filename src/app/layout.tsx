// src/app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import BackgroundFX from "@/components/Landing/BackgroundFX";

const siteName = "RPG Renaissance";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rpg-renaissance.com";

const defaultTitle = "La renaissance, en mode jeu de rôle";
const siteDescription =
    "RPG Renaissance transforme la reconstruction personnelle en aventure jouable: un récit, des étapes, du sens. Inscris-toi pour rejoindre la quête.";

const authorUrl = "https://x.com/iamjulienjulien";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: `${siteName} | ${defaultTitle}`,
        template: `%s | ${siteName}`,
    },
    description: siteDescription,

    keywords: [
        "RPG Renaissance",
        "renaissance",
        "développement personnel",
        "jeu de rôle",
        "habitudes",
        "quêtes",
        "progression",
        "introspection",
    ],

    authors: [{ name: "Julien Julien", url: authorUrl }],
    creator: "Julien Julien",

    alternates: {
        canonical: "/",
    },

    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },

    manifest: "/site.webmanifest",

    openGraph: {
        title: `${siteName} | ${defaultTitle}`,
        description: siteDescription,
        url: siteUrl,
        type: "website",
        siteName: siteName,
        locale: "fr_FR",
        images: [
            {
                url: "/og.jpg",
                width: 1200,
                height: 630,
                alt: "RPG Renaissance",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: `${siteName} | ${defaultTitle}`,
        description: siteDescription,
        images: ["/og.jpg"],
        creator: "@iamjulienjulien",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Script id="plausible-stub" strategy="beforeInteractive">
                    {`
                      window.plausible = window.plausible || function() {
                        (window.plausible.q = window.plausible.q || []).push(arguments)
                      }
                    `}
                </Script>
                <Script
                    strategy="afterInteractive"
                    defer
                    data-domain="rpg-renaissance.com"
                    src="https://plausible.io/js/script.js"
                />
            </head>
            <body className="min-h-screen text-white overflow-x-hidden">
                <div className="fixed inset-0 -z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(120,60,255,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(40,200,255,0.12),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(255,180,60,0.10),transparent_60%)] transform-[translateZ(0)]" />
                    <div className="absolute inset-0 bg-black/55" />
                    <BackgroundFX />
                </div>
                <div className="relative z-10 min-h-screen">{children}</div>
            </body>
        </html>
    );
}

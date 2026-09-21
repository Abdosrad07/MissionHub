import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { StatusBar } from "@/components/status-bar";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Abdourahim — Ingénieur Réseau en devenir",
    template: "%s — Abdourahim",
  },
  description:
    "Portfolio d'Abdourahim, étudiant ingénieur en télécommunications : des réseaux au cloud, en passant par le software, l'automatisation et l'IA. Un parcours construit, prouvé par des projets réels.",
  openGraph: {
    title: "Abdourahim — Ingénieur Réseau en devenir",
    description:
      "Des réseaux au cloud — un étudiant qui construit progressivement son expertise en NetDevOps.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#060d1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${plexSans.variable} ${plexMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-dvh bg-noir font-sans text-ink antialiased">
        <div className="grid-bg" aria-hidden />
        <StatusBar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

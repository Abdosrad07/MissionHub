import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "ABDOSRAD // NOC — Réseaux · Télécoms · IA",
    template: "%s // ABDOSRAD",
  },
  description:
    "Portfolio d'Abdosrad, étudiant ingénieur en télécommunications : réseaux, télécoms, cloud, IA, automatisation et NetDevOps — prouvés par des projets réels documentés depuis leurs dépôts GitHub.",
};

export const viewport: Viewport = {
  themeColor: "#04080f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh bg-noir font-sans text-ink antialiased">
        <div className="grid-bg" aria-hidden />
        <StatusBar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

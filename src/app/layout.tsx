import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    default: "MaLettreFacile — Modèles de lettres gratuits & personnalisables",
    template: "%s | MaLettreFacile",
  },
  description:
    "200+ modèles de lettres et courriers types gratuits : résiliation, démission, mise en demeure, contestation. Personnalisez chaque lettre avec notre générateur IA et envoyez-la directement par voie postale.",
  metadataBase: new URL("https://malettrefacile.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "MaLettreFacile",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-neutral-50">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

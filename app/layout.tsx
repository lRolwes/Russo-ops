import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { SITE_URL, specialMeta } from "./site-content";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: specialMeta.home.title,
  description: specialMeta.home.description,
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    title: specialMeta.home.title,
    description: specialMeta.home.description,
    type: "website",
    images: [{ url: "/roc-social.png", width: 1200, height: 1200, alt: "Russo Operational Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: specialMeta.home.title,
    description: specialMeta.home.description,
    images: [{ url: "/roc-social.png", width: 1200, height: 1200, alt: "Russo Operational Consulting" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${plex.variable}`}>{children}</body>
    </html>
  );
}

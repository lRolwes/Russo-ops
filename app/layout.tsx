import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { SITE_URL, specialMeta } from "./site-content";
import { ContactProvider } from "./contact-context";
import { getContactInfo } from "@/lib/data";
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

// Pages are cached and refreshed hourly; saving in the site manager refreshes them immediately.
export const revalidate = 3600;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const contact = await getContactInfo();
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${plex.variable}`}>
        <ContactProvider value={contact}>{children}</ContactProvider>
      </body>
    </html>
  );
}

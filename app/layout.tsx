import type { Metadata } from "next";
import "./globals.css";
import { Footer, MobileNav, Navbar } from "@/components/layout";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.png"
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <MobileNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

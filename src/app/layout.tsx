import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: "Lumière Dental Studio | A New Standard of Dental Care",
  description: "Discover a considered approach to modern dentistry at Lumière Dental Studio. A fictional dental studio concept in Ahmedabad, India.",
  openGraph: { title: "Lumière Dental Studio", description: clinic.tagline + " — a fictional studio concept.", type: "website", locale: "en_IN", images: [{ url: "/images/clinic.webp", width: 1536, height: 1024, alt: "Empty dental treatment suite — architectural concept" }] },
  twitter: { card: "summary_large_image" },
  robots: { index: !clinic.demo, follow: !clinic.demo },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

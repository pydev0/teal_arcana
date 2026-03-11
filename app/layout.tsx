import type { Metadata } from "next";
import { Inter, Cinzel, Cinzel_Decorative } from "next/font/google";
import { BackgroundSymbols } from "@/components/BackgroundSymbols";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "600", "700"] });
const cinzelDec = Cinzel_Decorative({ variable: "--font-cinzel-dec", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Teal Arcana — Tarot Readings",
  description: "Unlock the wisdom of the cards. Personal tarot readings to guide your path in love, career, and life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} ${cinzelDec.variable} antialiased`}>
        <ScrollProgress />
        <BackgroundSymbols />
        {children}
      </body>
    </html>
  );
}

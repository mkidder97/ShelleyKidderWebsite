import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shelley Kidder — Beauty & Skincare Consultant",
  description:
    "Personalized skincare guidance and beauty experiences with Shelley Kidder. Based in Holiday, Florida — serving clients locally and virtually.",
  openGraph: {
    title: "Shelley Kidder — Beauty & Skincare Consultant",
    description:
      "Personalized skincare guidance and beauty experiences. Based in Holiday, Florida.",
    type: "website",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

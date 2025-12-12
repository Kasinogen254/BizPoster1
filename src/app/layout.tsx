import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BizPoster - Create Custom Posters in Seconds",
  description: "Generate marketing posters instantly. Perfect for agents & small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* WRAP CHILDREN WITH PROVIDERS */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
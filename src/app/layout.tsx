import type { Metadata } from "next";
import { Outfit, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import "devicon/devicon.min.css";

const fontHeading = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fontSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joren | Portfolio",
  description: "Personal Portfolio of Joren",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg-base text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}

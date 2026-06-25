import type { Metadata } from "next";
import { Outfit, DM_Sans, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://jorenverdad.dev"),
  title: "Joren Verdad - Software Engineer & Full Stack Developer",
  description:
    "Full-stack engineer specializing in frontend development. I build scalable applications from design to deployment, with a focus on crafting interfaces that feel as good as they look.",
  openGraph: {
    title: "Joren Verdad - Software Engineer & Full Stack Developer",
    description:
      "Full-stack engineer specializing in frontend development. I build scalable applications from design to deployment, with a focus on crafting interfaces that feel as good as they look.",
    url: "https://jorenverdad.dev",
    siteName: "Joren Verdad Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joren Verdad - Software Engineer & Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joren Verdad - Software Engineer & Full Stack Developer",
    description:
      "Full-stack engineer specializing in frontend development. I build scalable applications from design to deployment, with a focus on crafting interfaces that feel as good as they look.",
    images: ["/og-image.png"],
  },
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

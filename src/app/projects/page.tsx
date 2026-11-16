import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectsContainer } from "@/components/projects/projects-container";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export const metadata: Metadata = {
  title: "Projects & Engineering Archive | Joren Verdad",
  description:
    "Explore the comprehensive portfolio and archive of full-stack platforms, client systems, open-source utilities, and interactive web applications by Joren Verdad.",
  openGraph: {
    title: "Projects & Engineering Archive | Joren Verdad",
    description:
      "Explore the comprehensive portfolio and archive of full-stack platforms, client systems, open-source utilities, and interactive web applications by Joren Verdad.",
    url: "https://jorenverdad.dev/projects",
    siteName: "Joren Verdad",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Projects & Engineering Archive | Joren Verdad",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Engineering Archive | Joren Verdad",
    description:
      "Explore the comprehensive portfolio and archive of full-stack platforms, client systems, open-source utilities, and interactive web applications by Joren Verdad.",
    images: ["/og-image.png"],
  },
};

function ProjectsLoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-foreground">
      <div className="h-16 w-full border-b border-edge-subtle/60 animate-pulse bg-bg-surface/50" />
      <div className="container mx-auto px-6 py-16 flex-1 flex flex-col items-center">
        <div className="h-8 w-48 rounded-full bg-bg-surface/60 animate-pulse mb-6" />
        <div className="h-14 w-full max-w-2xl rounded-2xl bg-bg-surface/60 animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-3xl bg-bg-surface/40 border border-edge-subtle animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Suspense fallback={<ProjectsLoadingFallback />}>
        <ProjectsContainer />
      </Suspense>
      <Footer />
      <ScrollToTop />
    </>
  );
}

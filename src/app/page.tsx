import { NavBar } from '@/components/layout/nav-bar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { JourneySection } from '@/components/home/journey-section';
import { TechStackSection } from '@/components/home/tech-stack-section';
import { ProjectsSection } from '@/components/home/projects-section';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <TechStackSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}

import { NavBar } from '@/components/layout/nav-bar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { JourneySection } from '@/components/home/journey-section';
import { TechStackSection } from '@/components/home/tech-stack-section';
import { ServicesSection } from '@/components/home/services-section';
import { ProjectsSection } from '@/components/home/projects-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        <div id="home">
          <HeroSection />
        </div>
        <AboutSection />
        <JourneySection />
        <TechStackSection />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}

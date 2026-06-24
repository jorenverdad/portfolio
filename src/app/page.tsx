import { NavBar } from '@/components/layout/nav-bar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { LazyMount } from '@/components/ui/lazy-mount';
import { fetchGitHubStats } from '@/lib/github';
import { AboutSection } from '@/components/sections/about';
import { JourneySection } from '@/components/sections/journey';
import { TechStackSection } from '@/components/sections/tech-stack';
import { ProjectsSection } from '@/components/sections/projects';
import { ServicesSection } from '@/components/sections/services';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { ContactSection } from '@/components/sections/contact';

export default async function Home() {
  const githubStats = await fetchGitHubStats();

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        <div id="home">
          <HeroSection />
        </div>
        
        <LazyMount id="about">
          <ScrollReveal>
            <AboutSection stats={githubStats} />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount id="about-journey">
          <ScrollReveal>
            <JourneySection />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount id="about-tech">
          <ScrollReveal>
            <TechStackSection />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount id="projects">
          <ScrollReveal>
            <ProjectsSection />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount id="service">
          <ScrollReveal>
            <ServicesSection />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount id="testimonial">
          <ScrollReveal>
            <TestimonialsSection />
          </ScrollReveal>
        </LazyMount>
        <LazyMount id="contact">
          <ScrollReveal>
            <ContactSection />
          </ScrollReveal>
        </LazyMount>
      </main>
      <Footer />
    </>
  );
}

import { NavBar } from '@/components/layout/nav-bar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { JourneySection } from '@/components/sections/journey';
import { TechStackSection } from '@/components/sections/tech-stack';
import { ProjectsSection } from '@/components/sections/projects';
import { ServicesSection } from '@/components/sections/services';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { fetchGitHubStats } from '@/lib/github';

export default async function Home() {
  const githubStats = await fetchGitHubStats();

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        <div id="home">
          <HeroSection />
        </div>
        
        <ScrollReveal>
          <AboutSection stats={githubStats} />
        </ScrollReveal>
        
        <ScrollReveal>
          <JourneySection />
        </ScrollReveal>
        
        <ScrollReveal>
          <TechStackSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <TestimonialsSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}

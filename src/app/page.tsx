import dynamic from 'next/dynamic';
import { NavBar } from '@/components/layout/nav-bar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { LazyMount } from '@/components/ui/lazy-mount';
import { fetchGitHubStats } from '@/lib/github';

const AboutSection = dynamic(() => import('@/components/sections/about').then(mod => mod.AboutSection));
const JourneySection = dynamic(() => import('@/components/sections/journey').then(mod => mod.JourneySection));
const TechStackSection = dynamic(() => import('@/components/sections/tech-stack').then(mod => mod.TechStackSection));
const ProjectsSection = dynamic(() => import('@/components/sections/projects').then(mod => mod.ProjectsSection));
const ServicesSection = dynamic(() => import('@/components/sections/services').then(mod => mod.ServicesSection));
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials').then(mod => mod.TestimonialsSection));

export default async function Home() {
  const githubStats = await fetchGitHubStats();

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        <div id="home">
          <HeroSection />
        </div>
        
        <LazyMount>
          <ScrollReveal>
            <AboutSection stats={githubStats} />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount>
          <ScrollReveal>
            <JourneySection />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount>
          <ScrollReveal>
            <TechStackSection />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount>
          <ScrollReveal>
            <ProjectsSection />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount>
          <ScrollReveal>
            <ServicesSection />
          </ScrollReveal>
        </LazyMount>
        
        <LazyMount>
          <ScrollReveal>
            <TestimonialsSection />
          </ScrollReveal>
        </LazyMount>
      </main>
      <Footer />
    </>
  );
}

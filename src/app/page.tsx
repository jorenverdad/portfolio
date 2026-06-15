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
const ContactSection = dynamic(() => import('@/components/sections/contact').then(mod => mod.ContactSection));

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

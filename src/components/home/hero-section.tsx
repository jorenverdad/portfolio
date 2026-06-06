import { HeroInteractive } from './hero-interactive';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-void pt-20">
      {/* Background Grid Pattern */}
      <GridPattern className="opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      
      {/* Subtle Glow at the top */}
      <div className="absolute top-0 inset-x-0 h-64 bg-brand-500/10 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <HeroInteractive>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-edge-default bg-bg-surface/50 text-xs font-medium text-warm-500 mb-8 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-warm-500"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-5xl mb-6">
            Crafting digital experiences with <span className="text-brand-500">precision.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            I'm a frontend engineer specializing in building exceptional, non-generic digital experiences. Currently focused on building accessible, human-centered products.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="h-14 px-8 text-base shadow-[0_0_30px_-5px_rgba(224,32,32,0.4)] transition-transform hover:scale-[1.02]">
              View My Work
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-base border-edge-default bg-bg-surface/30 backdrop-blur-md hover:bg-bg-elevated transition-colors">
              Contact Me
            </Button>
          </div>
        </HeroInteractive>
      </div>
    </section>
  );
}

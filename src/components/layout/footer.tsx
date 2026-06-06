import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer id="contact" className="bg-bg-base border-t border-edge-subtle pt-24 pb-12 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-brand-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Let's build something <span className="text-brand-500">exceptional.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            I'm always open to discussing product design work or partnership opportunities. Reach out and let's create the next big thing.
          </p>
          <Button size="lg" className="h-14 px-10 text-lg shadow-[0_0_30px_-5px_rgba(224,32,32,0.4)] transition-transform hover:scale-[1.02]">
            hello@joren.com
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-edge-subtle gap-4">
          <p className="text-muted-foreground text-sm font-sans">
            &copy; {new Date().getFullYear()} Joren. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

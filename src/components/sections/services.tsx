import React from 'react';

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface ServicesProps {
  readonly className?: string;
  readonly services?: ReadonlyArray<Service>;
}

const DEFAULT_SERVICES: ReadonlyArray<Service> = [
  {
    id: '01',
    title: 'Frontend Architecture',
    description: 'Architecting scalable, type-safe foundations using Next.js and React. Built for raw performance, seamless routing, and long-term maintainability.',
  },
  {
    id: '02',
    title: 'Design Engineering',
    description: 'Bridging the gap between Figma and code. Crafting pixel-perfect, responsive interfaces that respect design tokens and user experience.',
  },
  {
    id: '03',
    title: 'Interaction & Motion',
    description: 'Elevating interfaces with fluid animations, scroll-driven reveals, and micro-interactions that make digital products feel alive and premium.',
  },
];

export function ServicesSection({ className, services = DEFAULT_SERVICES }: ServicesProps) {
  return (
    <section id="service" className={`py-32 relative bg-bg-base overflow-hidden border-t border-edge-subtle ${className ?? ''}`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 via-transparent to-transparent opacity-50 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Expertise & <br/>
              <span className="text-muted-foreground">Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              I deliver comprehensive frontend solutions that prioritize both aesthetic brilliance and technical excellence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-bg-surface/30 backdrop-blur-md border border-edge-subtle rounded-3xl p-10 overflow-hidden hover:border-brand-500/50 transition-colors duration-500"
            >
              {/* Hover gradient effect */}
              <div className="absolute -inset-px bg-gradient-to-b from-brand-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-4xl font-heading font-light text-brand-500/40 mb-8 inline-block">
                  {service.id}
                </span>
                
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-brand-500 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground font-sans leading-relaxed flex-grow">
                  {service.description}
                </p>
                
                <div className="mt-12 h-1 w-0 bg-brand-500 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

const TESTIMONIALS = [
  {
    quote: "Joren's ability to translate complex design requirements into flawless, performant code is unmatched. The attention to micro-interactions completely elevated our product.",
    author: "Sarah Jenkins",
    role: "Product Lead at TechNova",
  },
  {
    quote: "Not just a developer, but a true design engineer. They brought a level of polish to our frontend that we didn't even know was possible.",
    author: "Marcus Chen",
    role: "Creative Director",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonial" className="py-32 relative bg-bg-void overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-warm-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-center text-foreground mb-20">
          Client <span className="text-brand-500">Perspectives</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="relative p-10 md:p-12 rounded-[2rem] bg-bg-surface border border-edge-subtle hover:border-edge-default transition-colors"
            >
              <div className="text-brand-500/30 font-serif text-8xl absolute top-6 left-6 leading-none select-none">
                "
              </div>
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-foreground font-sans leading-relaxed mb-10 pt-4">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-bg-elevated border border-edge-default flex items-center justify-center font-heading text-lg text-brand-500">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground font-heading">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

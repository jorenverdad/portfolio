export function AboutSection() {
  return (
    <section id="about" className="py-32 relative bg-bg-base overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          
          {/* Left: Typography Intro */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Designer logic. <br />
              <span className="text-muted-foreground">Developer execution.</span>
            </h2>
            <div className="h-1 w-20 bg-brand-500 rounded-full mb-8" />
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              I bridge the gap between design and engineering. With a meticulous eye for detail and a deep understanding of modern web architectures, I build applications that are as beautiful as they are performant.
            </p>
          </div>

          {/* Right: Glass Card Narrative */}
          <div className="relative">
            {/* Subtle glow behind the card */}
            <div className="absolute -inset-4 bg-warm-500/5 blur-[80px] rounded-full z-0" />
            
            <div className="relative z-10 rounded-3xl border border-edge-subtle bg-bg-surface/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
              <div className="space-y-6 text-base md:text-lg text-muted-foreground font-sans leading-relaxed">
                <p>
                  My journey started with a fascination for how things look, which quickly evolved into an obsession with how things work. 
                </p>
                <p>
                  Today, I focus on the Next.js ecosystem, weaving together strict TypeScript, CSS architectures, and interactive motion to create digital products that stand out from the generic web.
                </p>
                <p className="text-foreground font-medium">
                  When I'm not coding, I'm analyzing UX patterns, exploring new design trends, or optimizing performance metrics down to the millisecond.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

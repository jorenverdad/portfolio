export interface JourneyMilestone {
  readonly year: string;
  readonly title: string;
  readonly role: string;
  readonly description: string;
}

const MILESTONES: ReadonlyArray<JourneyMilestone> = [
  {
    year: '2025 - Present',
    title: 'Senior Frontend Engineer',
    role: 'Tech Innovators Inc.',
    description: 'Leading a team of engineers to build next-generation web experiences. Architected a micro-frontend migration that improved load times by 40%.',
  },
  {
    year: '2022 - 2024',
    title: 'Frontend Developer',
    role: 'Creative Agency Co.',
    description: 'Developed highly interactive marketing sites and e-commerce platforms using Next.js and Tailwind CSS. Implemented complex WebGL animations.',
  },
  {
    year: '2020 - 2022',
    title: 'UI/UX Designer & Dev',
    role: 'Freelance',
    description: 'Designed and built custom web solutions for diverse clients. Focused on creating cohesive design systems and accessible user interfaces.',
  }
] as const;

export function JourneySection() {
  return (
    <section id="journey" className="py-32 bg-bg-void relative border-t border-edge-subtle">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            The Journey
          </h2>
          <p className="text-muted-foreground text-lg">A timeline of my professional evolution.</p>
        </div>

        <div className="relative border-l border-edge-subtle ml-3 md:ml-6 space-y-12 pb-8">
          {MILESTONES.map((milestone, index) => (
            <div key={index} className="relative pl-10 md:pl-16">
              {/* Timeline Dot */}
              <div className="absolute -left-1.5 md:-left-[7px] top-1.5 size-3 md:size-[14px] rounded-full bg-bg-void border-2 border-brand-500 shadow-[0_0_10px_rgba(224,32,32,0.6)]" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                  {milestone.title}
                </h3>
                <span className="text-sm font-medium text-warm-500 bg-warm-500/10 px-3 py-1 rounded-full w-fit">
                  {milestone.year}
                </span>
              </div>
              
              <h4 className="text-md font-medium text-brand-500 mb-4">
                {milestone.role}
              </h4>
              
              <p className="text-muted-foreground font-sans leading-relaxed text-base">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

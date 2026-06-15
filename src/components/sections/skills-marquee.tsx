const SKILLS = [
  "UI/UX Designer",
  "Mobile Developer",
  "Frontend Engineer",
  "Creative Developer",
  "React Specialist",
  "TypeScript Expert",
  "Web Animator",
  "Performance Optimizer",
  "Systems Architect",
  "Design Technologist",
];

// Pre-calculate the duplicated array outside the component to prevent reallocation on every render.
// We duplicate it 4 times so that when it translates by -50%, the remaining 50% is wide enough 
// to cover ultra-wide screens without leaving blank space.
const MARQUEE_ITEMS = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS];

export function SkillsMarquee() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 md:py-8">
      {/* 
        The mask-image creates the fading effect on the left and right edges. 
      */}
      <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Increased padding here (py-12) prevents the 40px text-shadow from being clipped by overflow-hidden.
            Added will-change-transform to force GPU compositor layer, optimizing animation performance. */}
        <div className="flex w-max animate-marquee-right items-center gap-6 md:gap-12 group-hover:[animation-play-state:paused] py-12 will-change-transform">
          {MARQUEE_ITEMS.map((skill, i) => (
            <div 
              // eslint-disable-next-line react/no-array-index-key
              key={`${skill}-${i}`} 
              className="flex items-center gap-6 md:gap-12 group/item"
            >
              <div className="relative">
                <span className="relative z-10 block text-4xl text-center md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_var(--color-muted-foreground)] opacity-70 transition-all duration-500 group-hover/item:opacity-100 group-hover/item:text-brand-500 group-hover/item:[-webkit-text-stroke:0px_transparent] group-hover/item:-skew-x-12 cursor-default select-none">
                  {skill}
                </span>
                {/* GPU-accelerated glow effect replacing text-shadow */}
                <span aria-hidden="true" className="absolute inset-0 z-0 block text-4xl text-center md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase text-brand-500 opacity-0 blur-[24px] transition-all duration-500 group-hover/item:-skew-x-12 group-hover/item:opacity-70 cursor-default select-none pointer-events-none">
                  {skill}
                </span>
              </div>
              <span className="text-2xl md:text-4xl text-warm-500/30 font-light select-none">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

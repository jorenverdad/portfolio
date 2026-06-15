'use client';

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

export function SkillsMarquee() {
  // Duplicate array to ensure the marquee fills large screens and loops seamlessly.
  // We duplicate it multiple times to ensure it's wide enough, but make sure the total array
  // is composed of two identical halves so that translateX(-50%) creates a perfect loop.
  const baseSkills = [...SKILLS, ...SKILLS];
  const duplicatedSkills = [...baseSkills, ...baseSkills];

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 md:py-8">
      {/* 
        The mask-image creates the fading effect on the left and right edges. 
      */}
      <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Increased padding here (py-12) prevents the 40px text-shadow from being clipped by overflow-hidden */}
        <div className="flex w-max animate-marquee-right items-center gap-6 md:gap-12 group-hover:[animation-play-state:paused] py-12">
          {duplicatedSkills.map((skill, i) => (
            <div 
              // eslint-disable-next-line react/no-array-index-key
              key={`${skill}-${i}`} 
              className="flex items-center gap-6 md:gap-12 group/item"
            >
              <span className="text-4xl text-center md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_var(--color-muted-foreground)] opacity-70 transition-all duration-500 hover:opacity-100 hover:text-brand-500 hover:[-webkit-text-stroke:0px_transparent] hover:-skew-x-12 hover:[text-shadow:0_0_40px_var(--color-brand-500)] cursor-default select-none">
                {skill}
              </span>
              <span className="text-2xl md:text-4xl text-warm-500/30 font-light select-none">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface NavBarProps {
  readonly links?: ReadonlyArray<{
    readonly label: string;
    readonly href: string;
  }>;
}

const DEFAULT_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

export function NavBar({ links = DEFAULT_LINKS }: NavBarProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-edge-subtle bg-bg-surface/60 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Joren<span className="text-brand-500">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:inline-flex border-edge-default hover:bg-bg-elevated transition-colors duration-200">
            Contact Me
          </Button>
          <Button className="shadow-[0_0_20px_rgba(224,32,32,0.25)] transition-transform duration-200 hover:scale-[1.02]">
            View My Work
          </Button>
        </div>
      </div>
    </header>
  );
}

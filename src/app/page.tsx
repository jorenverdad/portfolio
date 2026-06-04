import { NavBar } from '@/components/layout/nav-bar';
import { HeroSection } from '@/components/home/hero-section';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        <HeroSection />
      </main>
    </>
  );
}

import { LandingHeader } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero';
import { FeaturesSection } from '@/components/landing/features';
import { HowItWorksSection } from '@/components/landing/how-it-works';
import { FaqSection } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
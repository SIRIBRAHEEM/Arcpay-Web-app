import { FeatureGrid } from "@/components/landing/feature-grid";
import { Footer } from "@/components/landing/footer";
import { FastHero } from "@/components/landing/fast-hero";
import { HowItWorks } from "@/components/landing/how-it-works";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <FastHero />
      <FeatureGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}

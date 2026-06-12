import { FeatureGrid } from "@/components/landing/feature-grid";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}

import Navbar from "@/components/navbar";
import Hero from "@/components/hero/hero";
import VideoShowcase from "@/components/showcase/video-showcase";
import FeaturesSection from "@/components/features/features-section";
import AppShowcase from "@/components/showcase/app-showcase";
import HowItWorks from "@/components/how-it-works/how-it-works";
import GraphDeepDive from "@/components/graph-deep-dive/graph-deep-dive";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <FeaturesSection />
        <AppShowcase />
        <HowItWorks />
        <GraphDeepDive />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

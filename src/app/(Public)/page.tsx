import { Navbar } from "@/src/components/Public/navbar"; 
import { Footer } from "@/src/components/Public/footer";
import { Hero } from "@/src/components/Public/hero";
import { HowItWorks } from "@/src/components/Public/HowItWorks";
import { Benefits } from "@/src/components/Public/benefits";
import { Testimonials } from "@/src/components/Public/testimonials";
import { FeaturedTemplates } from "@/src/components/Public/FeaturedTemplates";
import { Pricing } from "@/src/components/Public/pricing";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedTemplates />
      <Benefits />
      <Pricing />
      <Testimonials />
      <Footer />
    </>
  );
}

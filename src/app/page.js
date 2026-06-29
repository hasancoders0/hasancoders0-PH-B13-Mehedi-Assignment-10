import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Features from "@/components/home/Features";
import TopDoctors from "@/components/home/TopDoctors";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <TopDoctors />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <FAQ />
      <Newsletter />
    </>
  );
}
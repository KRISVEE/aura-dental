import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TreatmentGrid } from "@/components/sections/TreatmentGrid";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GoogleReviewsShowcase } from "@/components/sections/GoogleReviewsShowcase";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactOptionsBlock } from "@/components/sections/ContactOptionsBlock";
import { AvailabilitySection } from "@/components/sections/AvailabilitySection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BookingWizard } from "@/components/booking/BookingWizard";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <WhyChooseUs />
        <TreatmentGrid />
        <FeaturedCaseStudy />
        <BeforeAfterSection />
        <TestimonialsSection />
        <GoogleReviewsShowcase />
        <FAQSection />
        <ContactOptionsBlock />
        <AvailabilitySection />
        <FinalCTA />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <BookingWizard />
      </Suspense>
    </>
  );
}

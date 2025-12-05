import PricingSection from "@/components/pricing";
import FAQSection from "@/components/faq-section";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";
import Testimonials from "@/components/testimonial";
import DocumentationSection from "@/components/documentation";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import BentoOfTaskFlow from "@/components/bento-grid";
import Socialproof from "@/components/social-proof";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen relative bg-accent overflow-x-hidden flex flex-col justify-start items-center ">
      <div className="relative flex flex-col justify-start items-center w-full">
        {/* Main container with proper margins */}
        <div className="w-full mx-auto max-w-none px-2 md:px-8 lg:px-0 lg:max-w-[1400px] lg:w-[1400px] relative flex flex-col justify-start items-start min-h-screen overflow-hidden">
          {/* Left vertical line */}
          <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-primary/10 shadow-primary/25 z-0"></div>

          {/* Right vertical line */}
          <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-primary/10 shadow-primary/25 z-0"></div>

          <div className="self-stretch pt-[9px] overflow-hidden flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <div className="pt-16 md:pt-24 lg:pt-40 flex flex-col justify-start items-center px-2 md:px-0 w-full">
              <Hero />
              <Socialproof />
              <BentoOfTaskFlow />
              <DocumentationSection />
              <Testimonials />
              <FAQSection />
              <PricingSection />
              <CallToAction />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

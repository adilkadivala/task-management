import CallToAction from "./components/call-to-action";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Social from "./components/social";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <Social />
      <CallToAction />
      <Footer />
    </div>
  );
}

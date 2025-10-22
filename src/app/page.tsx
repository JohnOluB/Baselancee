
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Testimonials from "@/components/landing/testimonials";
import WhyChoose from "@/components/landing/why-choose";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WhyChoose />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { BlogPreview } from "@/components/BlogPreview";
import { ShopWithMe } from "@/components/ShopWithMe";
import { BookConsultation } from "@/components/BookConsultation";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <About />
      <Services />
      <Testimonials />
      <BlogPreview />
      <ShopWithMe />
      <BookConsultation />
      <Footer />
    </main>
  );
}

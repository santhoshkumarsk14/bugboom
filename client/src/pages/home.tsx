import { NavHeader } from "@/components/nav-header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ContactForm />
      </main>
    </div>
  );
}
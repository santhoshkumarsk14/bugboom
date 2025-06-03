import { NavHeader } from "@/components/nav-header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { PartnersSection } from "@/components/partners-section";
import { AwardsSection } from "@/components/awards-section";
import { PressSection } from "@/components/press-section";
import { TeamSection } from "@/components/team-section";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <PressSection />
        <PartnersSection />
        <AwardsSection />
        <TeamSection />
        <ContactForm />
      </main>
    </div>
  );
}

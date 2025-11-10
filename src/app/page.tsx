import Navbar from "@/app/components/NavBar";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import ServicesSection from "@/app/components/ServicesSection";
import PatientsCarousel from "@/app/components/PatientsCarousel";
import FaqSection from "@/app/components/FaqSection";
import PartnersSection from "@/app/components/PartnersSection";
import WhatsAppCTASection from "@/app/components/WhatsAppCTASection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="relative scroll-smooth bg-white">
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PatientsCarousel />
        <WhatsAppCTASection />
        <FaqSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}

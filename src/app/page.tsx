import Navbar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import HeroSection from "@/app/components/sections/HeroSection";
import AboutSection from "@/app/components/sections/AboutSection";
import ServicesSection from "@/app/components/sections/ServicesSection";
import FaqSection from "@/app/components/sections/FaqSection";
import PartnersSection from "@/app/components/sections/PartnersSection";
import WhatsAppCTASection from "@/app/components/sections/WhatsAppCTASection";
import PictureAlbumSection from "@/app/components/sections/PictureAlbumSection";
import PatientsCarousel from "@/app/components/ui/PatientsCarousel";

export default function Home() {
  return (
    <div className="relative scroll-smooth bg-white">
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <AboutSection />
        <PictureAlbumSection />
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

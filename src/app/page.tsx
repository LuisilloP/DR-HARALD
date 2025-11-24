import type { Metadata } from 'next'
import Navbar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import HeroSection from "@/app/components/sections/HeroSection";
import AboutSection from "@/app/components/sections/AboutSection";
import ServicesSection from "@/app/components/sections/ServicesSection";
import ImplantsSection from "@/app/components/sections/ImplantsSection";
import FaqSection from "@/app/components/sections/FaqSection";
import PartnersSection from "@/app/components/sections/PartnersSection";
import WhatsAppCTASection from "@/app/components/sections/WhatsAppCTASection";
import PictureAlbumSection from "@/app/components/sections/PictureAlbumSection";
import PatientsCarousel from "@/app/components/ui/PatientsCarousel";
import { metadata as siteMetadata, jsonLdSchema } from './metadata'

export const metadata: Metadata = siteMetadata

export default function Home() {
  return (
    <div className="relative scroll-smooth bg-white">
      {/* Schema JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <AboutSection />
        <PictureAlbumSection />
        <ServicesSection />
        <ImplantsSection />
        <PatientsCarousel />
        <WhatsAppCTASection />
        <FaqSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}

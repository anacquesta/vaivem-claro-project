import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import TrustTicker from '../components/landing/TrustTicker';
import AboutTimeline from '../components/landing/AboutTimeline';
import ServicesSection from '../components/landing/ServicesSection';
import FleetSection from '../components/landing/FleetSection';
import DifferentialsSection from '../components/landing/DifferentialsSection';
import ContactForm from '../components/landing/ContactForm';
import FooterSection from '../components/landing/FooterSection';
import { WhatsAppChat } from '../components/landing/WhatsAppChat';

const IMAGES = {
  hero: 'https://media.base44.com/images/public/6a0e25be8ced3ba0c2433d42/2f01b923e_generated_d8a7129b.png',
  fleet: 'https://media.base44.com/images/public/6a0e25be8ced3ba0c2433d42/fcc80e418_generated_fb9049a6.png',
  tracking: 'https://media.base44.com/images/public/6a0e25be8ced3ba0c2433d42/6872f48a9_generated_cee44446.png',
};

export default function Home() {
  return (
    <div className="bg-white text-vv-navy min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <TrustTicker />
        <AboutTimeline />
        <ServicesSection />
        <FleetSection />
        <DifferentialsSection />
        <ContactForm />
      </main>
      <FooterSection />
      <WhatsAppChat />
    </div>
  );
}
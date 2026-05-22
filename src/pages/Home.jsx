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
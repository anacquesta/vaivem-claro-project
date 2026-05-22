import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useSite } from '@/contexts/SiteContext';

export default function Navbar() {
  const { sections } = useSite();
  const data = sections.navbar;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-vv-navy/10 shadow-sm'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <nav className="site-container flex items-center justify-between px-6 lg:px-10 h-16 lg:h-20">
        <a href="#hero" onClick={() => scrollTo('#hero')} className="flex items-center gap-3">
          <img
            src={data.logo_url}
            alt={"Vai\u0026Vem Transportes Logo"}
            className="h-8 lg:h-10 w-auto"
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {data.links?.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-vv-steel hover:text-vv-navy transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {data.phone && (
            <a
              href={data.phone_href || "https://wa.me/5511962796531"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-vv-steel hover:text-vv-navy transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-mono text-xs">{data.phone}</span>
            </a>
          )}
          {data.cta_label && (
            <button
              onClick={() => scrollTo(data.cta_href || '#contato')}
              className="bg-vv-navy hover:bg-vv-navy/90 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-vv-navy/20"
            >
              {data.cta_label}
            </button>
          )}
        </div>

        <button
          className="lg:hidden text-vv-navy p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-vv-navy/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {data.links?.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-base text-vv-steel hover:text-vv-navy transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              {data.cta_label && (
                <button
                  onClick={() => scrollTo(data.cta_href || '#contato')}
                  className="bg-vv-navy text-white font-semibold px-6 py-3 rounded-lg mt-2 text-center"
                >
                  {data.cta_label}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
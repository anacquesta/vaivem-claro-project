import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
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
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 h-16 lg:h-20">
        <a href="#hero" onClick={() => scrollTo('#hero')} className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt={"Vai\u0026Vem Transportes Logo"}
            className="h-8 lg:h-10 w-auto"
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
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
          <a
            href="https://wa.me/5511962796531"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-vv-steel hover:text-vv-navy transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-mono text-xs">(11) 96279-6531</span>
          </a>
          <button
            onClick={() => scrollTo('#contato')}
            className="bg-vv-navy hover:bg-vv-navy/90 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-vv-navy/20"
          >
            Solicitar Orçamento
          </button>
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
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-base text-vv-steel hover:text-vv-navy transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contato')}
                className="bg-vv-navy text-white font-semibold px-6 py-3 rounded-lg mt-2 text-center"
              >
                Solicitar Orçamento
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
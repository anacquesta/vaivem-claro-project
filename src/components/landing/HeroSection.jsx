import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import StatusIndicator from './StatusIndicator';

export default function HeroSection() {
  const scrollToContact = () => {
    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden bg-white pt-16 lg:pt-20">

      {/* ── MOBILE: full-width image block above text ── */}
      <div className="lg:hidden w-full h-[260px] overflow-hidden">
        <img
          src="/caminhao.jpg"
          alt="Frota Vai & Vem Transportes"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── DESKTOP: absolute-positioned background image ── */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <img
          src="/caminhao.jpg"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-20 bottom-0 w-[65%] object-cover"
          style={{
            objectPosition: 'left bottom',
            maskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)'
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #fff 20%, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0) 70%)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-3 lg:px-5 pt-0">
        <div className="grid lg:grid-cols-12 gap-8 items-start pt-10 pb-10 lg:pt-[70px] lg:pb-[90px]">

          {/* Left content */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="h-px w-12 bg-vv-blue" />
                <span className="text-xs font-mono text-vv-blue tracking-[0.2em] uppercase">
                  Conectando destinos
                </span>
              </div>

              <h1
                id="hero-title"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-vv-navy leading-[0.95] tracking-tight"
              >
                Movemos
                <br />
                cargas.
                <br />
                <span className="text-vv-blue">Impulsionamos</span>
                <br />
                negócios.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-vv-steel text-base lg:text-lg max-w-md leading-relaxed mx-auto lg:mx-0"
            >
              Soluções inteligentes de transporte com cobertura nacional,
              monitoramento em tempo real e operações personalizadas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <button
                onClick={scrollToContact}
                className="group bg-vv-blue hover:bg-vv-blue/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-3 hover:shadow-xl hover:shadow-vv-blue/25"
              >
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="https://wa.me/5511962796531"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-vv-navy/20 hover:border-vv-navy/40 text-vv-navy font-medium px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-vv-navy/5"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex justify-center lg:justify-start"
            >
              <StatusIndicator />
            </motion.div>
          </div>

          {/* Desktop spacer */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vv-blue/30 to-transparent" />
    </section>
  );
}
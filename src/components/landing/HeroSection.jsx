import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useSite } from '@/contexts/SiteContext';
import StatusIndicator from './StatusIndicator';

export default function HeroSection() {
  const { sections } = useSite();
  const data = sections.hero;

  const scrollToContact = () => {
    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden bg-white pt-16 lg:pt-20">

      {/* ── MOBILE / TABLET: full-width image block above text ── */}
      {/* Height scales with viewport: mobile 260px → small tablet 320px → tablet 450px */}
      <div className="lg:hidden w-full overflow-hidden h-[260px] sm:h-[320px] md:h-[450px]">
        <img
          src={data.image_url}
          alt="Frota Vai & Vem Transportes"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── DESKTOP: image bounded to content height + 20px margin on each side ──
           Math: section pt-20(80px) + content pt-[70px] = text starts at 150px.
           Image top = 150 - 20 = 130px from section top.
           Content pb-[90px] = text ends 90px from section bottom.
           Image bottom = 90 - 20 = 70px from section bottom.               */}
      <div
        className="hero-img-box hidden lg:block absolute z-0 right-0 w-[65%]"
        style={{ top: '130px', bottom: '70px' }}
      >
        <img
          src={data.image_url}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'left bottom',
            maskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)'
          }}
        />
      </div>
      {/* White-to-transparent gradient fade over the left edge of the image */}
      <div
        className="hidden lg:block absolute z-[1] inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #fff 20%, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0) 70%)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-3 lg:px-5 pt-0">
        <div className="grid lg:grid-cols-12 gap-8 items-start pt-10 pb-10 lg:pt-[70px] lg:pb-[90px] min-[1440px]:pt-[25px] min-[1440px]:pb-[25px]">

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
                  {data.badge}
                </span>
              </div>

              <h1
                id="hero-title"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-vv-navy leading-[0.95] tracking-tight whitespace-pre-line"
              >
                {data.title.replace(/\\n/g, '\n')}
                {data.highlight && (
                  <>
                    <br />
                    <span className="text-vv-blue">{data.highlight}</span>
                  </>
                )}
                {data.subtitle && (
                  <>
                    <br />
                    {data.subtitle}
                  </>
                )}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-vv-steel text-base lg:text-lg max-w-md leading-relaxed mx-auto lg:mx-0 whitespace-pre-line"
            >
              {data.description}
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
                {data.cta_primary_label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              {data.cta_secondary_label && (
                <a
                  href={data.cta_secondary_href || "https://wa.me/5511962796531"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-vv-navy/20 hover:border-vv-navy/40 text-vv-navy font-medium px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-vv-navy/5"
                >
                  <MessageCircle className="w-4 h-4" />
                  {data.cta_secondary_label}
                </a>
              )}
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
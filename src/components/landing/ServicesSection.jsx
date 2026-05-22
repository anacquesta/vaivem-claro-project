import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useSite } from '@/contexts/SiteContext';

export default function ServicesSection() {
  const { sections } = useSite();
  const data = sections.services;

  const titleParts = (data.title || '').replace(/\\n/g, '\n').split('\n');

  return (
    <section id="servicos" aria-labelledby="services-title" className="bg-vv-surface py-[60px] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* Unified Container - holds both the image and the cards */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-vv-navy/5">
          
          {/* Fleet Image Header Section */}
          <div className="relative w-full h-[320px] md:h-[450px] lg:h-[500px] overflow-hidden">
            <img
              src={data.image_url}
              alt="Nossa frota de caminhões e vans"
              className="w-full h-full object-cover"
            />
            {/* Soft overlay gradient to ensure high readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />
            
            {/* Floating Left-Aligned Text Overlay - placed high up in the sky area */}
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-start pt-10 md:pt-14 lg:pt-18 text-left px-8 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-px w-8 bg-vv-blue" />
                  <span className="text-[10px] md:text-xs font-mono text-vv-blue tracking-[0.25em] uppercase font-bold">
                    {data.badge}
                  </span>
                </div>
                
                <h2 id="services-title" className="text-4xl md:text-5xl lg:text-6.5xl font-black leading-[0.95] tracking-tighter uppercase text-vv-navy">
                  {titleParts[0]}
                  {titleParts[1] && (
                    <>
                      <br />
                      <span className="text-vv-navy/85">{titleParts[1]}</span>
                    </>
                  )}
                </h2>
              </motion.div>
            </div>

            {/* Custom Shaped Cutout Overlay at the bottom - filled with white to blend with container bg */}
            <svg
              viewBox="0 0 1440 48"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 w-full h-8 md:h-12 text-white fill-current pointer-events-none z-20"
            >
              <path d="M0,48 L1440,48 L1440,24 L920,24 C890,24 880,0 850,0 L590,0 C560,0 550,24 520,24 L0,24 Z" />
            </svg>
          </div>

          {/* Cards Grid Section - inside the white container */}
          <div className="p-6 md:p-8 lg:p-10 relative">
            {/* Vertical Dividers for Desktop */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
              <div className="absolute left-1/4 top-12 bottom-12 w-px bg-vv-navy/10" />
              <div className="absolute left-2/4 top-12 bottom-12 w-px bg-vv-navy/10" />
              <div className="absolute left-3/4 top-12 bottom-12 w-px bg-vv-navy/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative z-10">
              {data.items?.map((s, i) => {
                const IconComponent = Icons[s.icon] || Icons.Package;
                return (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative flex flex-col p-8 lg:p-10 rounded-xl bg-transparent border border-transparent border-b-[3px] border-b-transparent hover:bg-white hover:shadow-2xl hover:shadow-vv-navy/5 hover:border-vv-navy/5 hover:border-b-vv-blue transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  >
                    {/* Number */}
                    <span className="font-mono text-xs font-semibold text-vv-steel/40 group-hover:text-vv-blue/70 tracking-wider mb-4 block transition-colors duration-300">
                      {s.num}
                    </span>

                    {/* Icon Box */}
                    <div className="w-12 h-12 rounded-xl border border-vv-navy/10 bg-white group-hover:bg-vv-blue/5 flex items-center justify-center mb-6 shadow-sm group-hover:border-vv-blue transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-vv-steel group-hover:text-vv-blue transition-all duration-300" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-vv-navy mb-3 tracking-tight leading-snug group-hover:text-vv-navy transition-colors duration-300">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-vv-steel/80 leading-relaxed">
                      {s.desc}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
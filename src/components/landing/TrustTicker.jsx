import { motion } from 'framer-motion';

const PARTNERS = [
  'COFLEX', 'PRIMAR', 'BRASMEG', 'STARDECK', 'NATURELAB', 'OPTIMUM', 'MP MONTAGEM DE MÓVEIS', 'GRUPO REBRACIL',
  'COFLEX', 'PRIMAR', 'BRASMEG', 'STARDECK', 'NATURELAB', 'OPTIMUM', 'MP MONTAGEM DE MÓVEIS', 'GRUPO REBRACIL',
];

export default function TrustTicker() {
  return (
    <section className="relative py-8 overflow-hidden bg-vv-blue" aria-label="Empresas parceiras">
      <div className="site-container px-3 lg:px-5 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-white/40" />
          <p className="text-[10px] sm:text-xs font-mono text-white/50 tracking-[0.25em] uppercase text-left">
            Empresas que confiam na Vai&amp;Vem
          </p>
        </div>
      </div>
      <div className="relative py-1">
        {/* Soft edge fade left and right */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-vv-blue to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-vv-blue to-transparent z-10" />
        
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {PARTNERS.map((name, i) => (
            <div key={i} className="flex items-center gap-4 text-sm sm:text-base font-bold text-white/60 tracking-widest shrink-0">
              <span className="text-white/40">•</span>
              <span>{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
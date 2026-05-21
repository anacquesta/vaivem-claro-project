import { motion } from 'framer-motion';

const MILESTONES = [
  {
    year: '2017',
    label: 'Concepção da Ideia',
    desc: 'Surgimento da ideia e início do planejamento estratégico para revolucionar a logística de transporte de cargas.'
  },
  {
    year: '2019',
    label: 'Fundação',
    desc: 'Criação oficial da Vai&Vem e início das operações locais com o primeiro caminhão.'
  },
  {
    year: '2021',
    label: 'Expansão Regional',
    desc: 'Ampliação para transporte de cargas em todo o estado de São Paulo com frota própria.'
  },
  {
    year: '2023',
    label: 'Cobertura Nacional',
    desc: 'Início das operações de abrangência nacional conectando diferentes estados do país.'
  },
  {
    year: '2025',
    label: '200+ Veículos',
    desc: 'Consolidação de uma malha logística de grande porte com veículos rastreados em tempo real.'
  }
];

export default function AboutTimeline() {
  return (
    <section id="sobre" aria-labelledby="about-title" className="bg-white text-vv-navy py-[60px] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-vv-blue" />
                <span className="text-xs font-mono text-vv-blue tracking-[0.2em] uppercase">
                  Nossa História
                </span>
              </div>
              
              <h2 id="about-title" className="text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight uppercase">
                Uma jornada
                <br />
                <span className="text-vv-navy/30">de crescimento.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6 text-vv-steel text-base lg:text-lg leading-relaxed"
            >
              <p>
                Tudo começou com um único caminhão e uma missão clara: ser a parceira logística mais confiável do Brasil. Desde a fundação oficial, evoluímos de uma operação local de transportes para uma transportadora de abrangência nacional.
              </p>
              <p>
                Hoje, com frota própria e veículos agregados, oferecemos operações personalizadas que conectam empresas de todos os portes ao território nacional — com eficiência, agilidade e comprometimento total em cada entrega.
              </p>
            </motion.div>
          </div>

          {/* Right Column (Timeline) */}
          <div className="lg:col-span-7 lg:pl-12 relative mt-8 lg:mt-0">
            {/* Vertical timeline line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-vv-navy/10" />

            <div className="space-y-12">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-10 group"
                >
                  {/* Timeline point indicator */}
                  <div className="absolute left-[8px] top-[6px] w-[14px] h-[14px] rounded-full border-2 border-vv-blue bg-white transition-transform duration-300 group-hover:scale-125 z-10" />
                  
                  <div className="font-mono text-xs font-semibold text-vv-blue tracking-widest mb-1">
                    {m.year}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-vv-navy mb-2 leading-tight">
                    {m.label}
                  </h3>
                  <p className="text-sm text-vv-steel leading-relaxed max-w-xl">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { useSite } from '@/contexts/SiteContext';

export default function AboutTimeline() {
  const { sections } = useSite();
  const data = sections.about;

  const titleParts = (data.title || '').replace(/\\n/g, '\n').split('\n');

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
                  {data.badge}
                </span>
              </div>
              
              <h2 id="about-title" className="text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight uppercase">
                {titleParts.map((part, idx) => (
                  <span key={idx} className={idx > 0 ? 'text-vv-navy/30' : ''}>
                    {idx > 0 && <br />}
                    {part}
                  </span>
                ))}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6 text-vv-steel text-base lg:text-lg leading-relaxed"
            >
              {data.paragraphs?.map((p, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </motion.div>
          </div>

          {/* Right Column (Timeline) */}
          <div className="lg:col-span-7 lg:pl-12 relative mt-8 lg:mt-0">
            {/* Vertical timeline line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-vv-navy/10" />

            <div className="space-y-12">
              {data.milestones?.map((m, i) => (
                <motion.div
                  key={i}
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
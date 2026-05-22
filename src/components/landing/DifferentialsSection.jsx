import { motion } from 'framer-motion';
import { useSite } from '@/contexts/SiteContext';

export default function DifferentialsSection() {
  const { sections } = useSite();
  const data = sections.differentials;

  const titleParts = (data.title || '').replace(/\\n/g, '\n').split('\n');

  return (
    <section id="diferenciais" aria-labelledby="diff-title" className="bg-vv-navy text-white py-[60px] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Title */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-vv-blue" />
                <span className="text-xs font-mono text-vv-blue tracking-[0.25em] uppercase font-bold">
                  {data.badge}
                </span>
              </div>
              
              <h2
                id="diff-title"
                className="text-4xl sm:text-5xl lg:text-6.5xl font-black leading-[0.95] tracking-tighter uppercase text-white"
              >
                {titleParts.map((part, idx) => (
                  <span key={idx}>
                    {idx > 0 && <br />}
                    {part}
                  </span>
                ))}
              </h2>
            </motion.div>
          </div>

          {/* Right Column - Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
            {data.items?.map((d, i) => {
              // Custom class for each grid cell to get the cross dividers perfectly
              const cellClasses = [
                "border-b border-white/10 p-8 lg:p-10 md:border-r", // 0 (top-left)
                "border-b border-white/10 p-8 lg:p-10", // 1 (top-right)
                "border-b border-white/10 md:border-b-0 p-8 lg:p-10 md:border-r", // 2 (bottom-left)
                "p-8 lg:p-10" // 3 (bottom-right)
              ];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`${cellClasses[i % 4]} group transition-all duration-300 hover:bg-white/[0.04] flex flex-col justify-start cursor-pointer`}
                >
                  <div className="font-black text-3xl lg:text-4xl text-vv-blue mb-4 tracking-tight uppercase transition-colors duration-300">
                    {d.metric}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2 leading-snug transition-colors duration-300">
                    {d.title}
                  </h3>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed max-w-md transition-colors duration-300">
                    {d.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
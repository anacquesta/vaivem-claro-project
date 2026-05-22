import { motion } from 'framer-motion';
import { useSite } from '@/contexts/SiteContext';

export default function StatusIndicator() {
  const { sections } = useSite();
  const data = sections.status_indicators || { items: [] };

  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      {data.items?.map((s, i) => (
        <div
          key={s.label}
          className="flex items-center gap-2 bg-vv-navy/5 border border-vv-navy/10 rounded-full px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <motion.span
              className={`absolute inline-flex h-full w-full rounded-full ${s.color || 'bg-vv-blue'} opacity-75`}
              animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${s.color || 'bg-vv-blue'}`} />
          </span>
          <span className="text-xs font-mono text-vv-steel tracking-wider">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
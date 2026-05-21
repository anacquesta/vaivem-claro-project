import { motion } from 'framer-motion';

const FLEET_TABLE = [
  { tipo: 'VUC', qtd: '25 unidades', cap: '2t6 Km', destino: 'Nacional', media: '3,2 anos', rastr: 100 },
  { tipo: '3/4', qtd: '40 unidades', cap: '4t6 / 5,6t', destino: 'Nacional', media: '3,7 anos', rastr: 100 },
  { tipo: 'TRUCK', qtd: '30 unidades', cap: '7t / 12 ton', destino: 'Nacional', media: '3,6 anos', rastr: 100 },
  { tipo: 'TOCO', qtd: '30 unidades', cap: '4t6 / 12t', destino: 'Nacional', media: '3,8 anos', rastr: 100 },
  { tipo: 'CARRETA', qtd: '25 unidades', cap: 'Até 30 ton', destino: 'Nacional', media: '4,5 anos', rastr: 100 },
];

const REAL_TIME = [
  { id: 'VHC-0492', route: 'SP → Rio de Janeiro', status: 'Em rota', color: 'bg-vv-steel' },
  { id: 'VHC-1137', route: 'SP → Belo Horizonte', status: 'Entregue', color: 'bg-vv-blue' },
  { id: 'VHC-0881', route: 'SP → Salvador', status: 'Em rota', color: 'bg-vv-steel' },
  { id: 'VHC-2203', route: 'PR → São Paulo', status: 'Carregando', color: 'bg-vv-navy' },
  { id: 'VHC-0340', route: 'SP → Fortaleza', status: 'Em rota', color: 'bg-vv-steel' },
  { id: 'VHC-1892', route: 'RS → São Paulo', status: 'Em rota', color: 'bg-vv-steel' },
];

export default function FleetSection() {
  return (
    <section id="estrutura" aria-labelledby="fleet-title" className="bg-white py-[60px]">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-5">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-vv-blue" />
              <span className="text-xs font-mono text-vv-blue tracking-[0.2em] uppercase">Nossa Estrutura</span>
            </div>
            <h2 id="fleet-title" className="text-3xl lg:text-5xl font-extrabold text-vv-navy leading-tight tracking-tight">
              Frota e estrutura para<br />
              <span className="text-vv-blue">mover o Brasil.</span>
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="text-vv-steel text-base leading-relaxed">
            São anos investindo em frota de qualidade, tecnologia e gente boa que acompanha todos os dias nos estradas do Brasil.
          </motion.p>
        </div>

        {/* Dashboard Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-vv-navy/10 rounded-2xl overflow-hidden shadow-xl mb-12"
        >
          {/* Title bar */}
          <div className="bg-white border-b border-vv-navy/8 px-6 py-4">
            {/* Desktop layout: dots | title | ONLINE */}
            <div className="hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-mono text-vv-steel tracking-widest uppercase">
                Sistema de Monitoramento — Vai&amp;Vem Transportes
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-green-600">ONLINE</span>
              </div>
            </div>
            {/* Mobile layout: title then ONLINE below, centered */}
            <div className="lg:hidden flex flex-col items-center gap-1 text-center">
              <span className="text-xs font-mono text-vv-steel tracking-widest uppercase">
                Sistema de Monitoramento — Vai&amp;Vem Transportes
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-green-600">ONLINE</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-vv-navy/8 bg-white">
            {/* Col 1: Status da Frota */}
            <div className="p-6 lg:p-8">
              <div className="text-xs font-mono text-vv-blue tracking-widest uppercase mb-6">Status da Frota</div>
              <div className="space-y-6">
                {[
                  { label: 'Em Rota', value: 137, color: 'bg-vv-steel', pct: 68 },
                  { label: 'Em Carregamento', value: 42, color: 'bg-vv-blue', pct: 21 },
                  { label: 'Manutenção Preventiva', value: 21, color: 'bg-vv-navy', pct: 11 },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${s.color}`} />
                        <span className="text-sm text-vv-steel">{s.label}</span>
                      </div>
                      <span className="font-mono text-2xl font-bold text-vv-navy">{s.value}</span>
                    </div>
                    <div className="h-1 bg-vv-navy/8 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 2: Indicadores */}
            <div className="p-6 lg:p-8">
              <div className="text-xs font-mono text-vv-blue tracking-widest uppercase mb-6">Indicadores</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '200+', label: 'Veículos Rastreados', sub: 'Frota total' },
                  { value: '99.8%', label: 'Últimos 30 dias', sub: 'Uptime sistema' },
                  { value: '26', label: 'Estados Brasileiros', sub: 'Cobertura' },
                  { value: 'SP', label: 'São Paulo, Brasil', sub: 'Base principal' },
                ].map((ind) => (
                  <div key={ind.label} className="border border-vv-navy/8 rounded-xl p-4">
                    <div className="font-mono text-2xl font-bold text-vv-navy mb-1">{ind.value}</div>
                    <div className="text-[10px] font-mono text-vv-blue tracking-widest uppercase leading-tight">{ind.label}</div>
                    <div className="text-xs text-vv-steel mt-1">{ind.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Atividade em Tempo Real */}
            <div className="p-6 lg:p-8">
              <div className="text-xs font-mono text-vv-blue tracking-widest uppercase mb-6">Atividade em Tempo Real</div>
              <div className="space-y-4">
                {REAL_TIME.map((v) => (
                  <div key={v.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-mono font-semibold text-vv-navy">{v.id}</div>
                      <div className="text-xs text-vv-steel">{v.route}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${v.color}`} />
                      <span className="text-xs font-mono text-vv-steel">{v.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-vv-navy/8 rounded-xl overflow-hidden">
          {[
            { value: '45+', label: 'Profissionais dedicados' },
            { value: '100%', label: 'Rastreamento dos veículos' },
            { value: '5h', label: 'Tempo médio de resposta' },
            { value: 'SP', label: 'Base principal, São Paulo SP' },
          ].map((s) => (
            <div key={s.label} className="bg-white px-6 py-6 lg:py-8">
              <div className="font-mono text-3xl lg:text-4xl font-bold text-vv-navy mb-1">{s.value}</div>
              <div className="text-xs text-vv-steel">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
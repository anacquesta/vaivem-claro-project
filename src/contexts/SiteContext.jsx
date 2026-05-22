import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// ─── Defaults: valores atuais do site (fallback quando Supabase não tem dados) ───

export const SECTION_DEFAULTS = {
  navbar: {
    logo_url: '/logo.png',
    links: [
      { label: 'Início', href: '#hero' },
      { label: 'Sobre', href: '#sobre' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Estrutura', href: '#estrutura' },
      { label: 'Contato', href: '#contato' },
    ],
    cta_label: 'Solicitar Orçamento',
    cta_href: '#contato',
    phone: '(11) 96279-6531',
    phone_href: 'https://wa.me/5511962796531',
  },
  hero: {
    badge: 'Conectando destinos',
    title: 'Movemos\ncargas.',
    highlight: 'Impulsionamos',
    subtitle: 'negócios.',
    description: 'Soluções inteligentes de transporte com cobertura nacional, monitoramento em tempo real e operações personalizadas.',
    cta_primary_label: 'Solicitar Orçamento',
    cta_secondary_label: 'WhatsApp',
    cta_secondary_href: 'https://wa.me/5511962796531',
    image_url: '/caminhao.jpg',
  },
  status_indicators: {
    items: [
      { label: '+200 Veículos', color: 'bg-green-500' },
      { label: '+7 Anos', color: 'bg-vv-blue' },
      { label: '27 Estados', color: 'bg-vv-blue' },
    ],
  },
  about: {
    badge: 'Nossa História',
    title: 'Uma jornada\nde crescimento.',
    paragraphs: [
      'Tudo começou com um único caminhão e uma missão clara: ser a parceira logística mais confiável do Brasil. Desde a fundação oficial, evoluímos de uma operação local de transportes para uma transportadora de abrangência nacional.',
      'Hoje, com frota própria e veículos agregados, oferecemos operações personalizadas que conectam empresas de todos os portes ao território nacional — com eficiência, agilidade e comprometimento total em cada entrega.',
    ],
    milestones: [
      { year: '2017', label: 'Concepção da Ideia', desc: 'Surgimento da ideia e início do planejamento estratégico para revolucionar a logística de transporte de cargas.' },
      { year: '2019', label: 'Fundação', desc: 'Criação oficial da Vai&Vem e início das operações locais com o primeiro caminhão.' },
      { year: '2021', label: 'Expansão Regional', desc: 'Ampliação para transporte de cargas em todo o estado de São Paulo com frota própria.' },
      { year: '2023', label: 'Cobertura Nacional', desc: 'Início das operações de abrangência nacional conectando diferentes estados do país.' },
      { year: '2025', label: '200+ Veículos', desc: 'Consolidação de uma malha logística de grande porte com veículos rastreados em tempo real.' },
    ],
  },
  services: {
    badge: 'Soluções Logísticas',
    title: 'Serviços\nOperacionais',
    image_url: '/frota.jpg',
    items: [
      { num: '01', icon: 'Package', title: 'Transporte de Carga Geral', desc: 'Coleta e entrega em todo o território nacional com segurança, pontualidade e rastreabilidade completa.' },
      { num: '02', icon: 'Route', title: 'Modal Rodoviário', desc: 'Cobertura completa da malha viária brasileira com rotas otimizadas e motoristas especializados.' },
      { num: '03', icon: 'Truck', title: 'Frota Própria', desc: 'Veículos próprios com manutenção preventiva rigorosa, rastreamento GPS e motoristas treinados.' },
      { num: '04', icon: 'Settings', title: 'Operações Personalizadas', desc: 'Projetos logísticos sob medida para demandas específicas, escaláveis conforme o crescimento do seu negócio.' },
    ],
  },
  fleet: {
    badge: 'Nossa Estrutura',
    title: 'Frota e estrutura para mover o Brasil.',
    subtitle: 'São anos investindo em frota de qualidade, tecnologia e gente boa que acompanha todos os dias nos estradas do Brasil.',
    table: [
      { tipo: 'VUC', qtd: '25 unidades', cap: '2t6 Km', destino: 'Nacional', media: '3,2 anos', rastr: 100 },
      { tipo: '3/4', qtd: '40 unidades', cap: '4t6 / 5,6t', destino: 'Nacional', media: '3,7 anos', rastr: 100 },
      { tipo: 'TRUCK', qtd: '30 unidades', cap: '7t / 12 ton', destino: 'Nacional', media: '3,6 anos', rastr: 100 },
      { tipo: 'TOCO', qtd: '30 unidades', cap: '4t6 / 12t', destino: 'Nacional', media: '3,8 anos', rastr: 100 },
      { tipo: 'CARRETA', qtd: '25 unidades', cap: 'Até 30 ton', destino: 'Nacional', media: '4,5 anos', rastr: 100 },
    ],
    realtime: [
      { id: 'VHC-0492', route: 'SP → Rio de Janeiro', status: 'Em rota', color: 'bg-vv-steel' },
      { id: 'VHC-1137', route: 'SP → Belo Horizonte', status: 'Entregue', color: 'bg-vv-blue' },
      { id: 'VHC-0881', route: 'SP → Salvador', status: 'Em rota', color: 'bg-vv-steel' },
      { id: 'VHC-2203', route: 'PR → São Paulo', status: 'Carregando', color: 'bg-vv-navy' },
      { id: 'VHC-0340', route: 'SP → Fortaleza', status: 'Em rota', color: 'bg-vv-steel' },
      { id: 'VHC-1892', route: 'RS → São Paulo', status: 'Em rota', color: 'bg-vv-steel' },
    ],
    stats: [
      { value: '45+', label: 'Profissionais dedicados' },
      { value: '100%', label: 'Rastreamento dos veículos' },
      { value: '5h', label: 'Tempo médio de resposta' },
      { value: 'SP', label: 'Base principal, São Paulo SP' },
    ],
  },
  differentials: {
    badge: 'POR QUE A VAI&VEM',
    title: 'O que nos\ntorna\ndiferentes.',
    items: [
      { metric: '26 estados', title: 'Cobertura Nacional', desc: 'Atuamos em todos os estados brasileiros e Distrito Federal, com rotas otimizadas e parceiros estratégicos em cada região.' },
      { metric: 'SLA 98%', title: 'Comprometimento Total', desc: 'Cada operação recebe atenção integral. Cumprimos prazos e mantemos sua carga protegida do início ao fim da jornada.' },
      { metric: '24 / 7', title: 'Atendimento Personalizado', desc: 'Gerente de conta dedicado para entender e antecipar as necessidades do seu negócio. Suporte disponível a qualquer hora.' },
      { metric: '+400/mês', title: 'Operações Sob Demanda', desc: 'Escalamos rapidamente para volumes extraordinários. Flexibilidade operacional é parte estrutural da nossa logística.' },
    ],
  },
  contact: {
    badge: 'Fale Conosco',
    title: 'Pronto para\nmover sua carga?',
    subtitle: 'Solicite um orçamento personalizado. Nossa equipe responde em até 2 horas durante o horário comercial.',
    phone: '(11) 96279-6531',
    phone_href: 'https://wa.me/5511962796531',
    email: 'vaievemtransportes@vaievemtransportes.com.br',
    address: 'São Paulo, SP',
  },
  footer: {
    logo_url: '/logo completo.png',
    nav_links: [
      { label: 'Início', href: '#hero' },
      { label: 'Sobre', href: '#sobre' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Estrutura', href: '#estrutura' },
      { label: 'Contato', href: '#contato' },
    ],
    service_links: ['Carga em Geral', 'Modal Rodoviário', 'Frota Própria', 'Operações Personalizadas'],
    phone: '(11) 96279-6531',
    phone_href: 'https://wa.me/5511962796531',
    email: 'vaievemtransportes@vaievemtransportes.com.br',
    address: 'São Paulo, SP',
    copyright_name: 'Vai&Vem Transportes',
  },
};

export const GLOBAL_DEFAULTS = {
  colors: {
    'vv-blue': '#18A896',
    'vv-navy': '#0D1B2E',
    'vv-steel': '#4A6880',
    'vv-surface': '#F0F5FA',
  },
  font_primary: 'Inter',
  font_mono: 'JetBrains Mono',
};

// ─── Context ───────────────────────────────────────────────────────────────────

const SiteContext = createContext(null);

function injectColorVars(colors) {
  const styleId = 'vv-dynamic-colors';
  let el = document.getElementById(styleId);
  if (!el) {
    el = document.createElement('style');
    el.id = styleId;
    document.head.appendChild(el);
  }
  const vars = Object.entries(colors)
    .map(([k, v]) => `--color-${k}: ${v};`)
    .join('\n');
  // Override Tailwind color tokens via CSS custom properties
  const overrides = Object.entries(colors)
    .map(([k, v]) => `.text-${k} { color: ${v} !important; } .bg-${k} { background-color: ${v} !important; } .border-${k} { border-color: ${v} !important; }`)
    .join('\n');
  el.textContent = `:root { ${vars} }\n${overrides}`;
}

export function SiteProvider({ children }) {
  const [sections, setSections] = useState(SECTION_DEFAULTS);
  const [globalConfig, setGlobalConfig] = useState(GLOBAL_DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSiteData() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const [{ data: sectionsData }, { data: configData }] = await Promise.all([
          supabase.from('sections').select('id, content'),
          supabase.from('site_config').select('key, value'),
        ]);

        if (sectionsData?.length) {
          const merged = { ...SECTION_DEFAULTS };
          sectionsData.forEach(({ id, content }) => {
            merged[id] = { ...SECTION_DEFAULTS[id], ...content };
          });
          setSections(merged);
        }

        if (configData?.length) {
          const cfg = {};
          configData.forEach(({ key, value }) => { cfg[key] = value; });
          const merged = { ...GLOBAL_DEFAULTS, ...cfg };
          setGlobalConfig(merged);
          if (merged.colors) injectColorVars(merged.colors);
        }
      } catch (err) {
        console.warn('[SiteContext] Erro ao buscar dados:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSiteData();
  }, []);

  return (
    <SiteContext.Provider value={{ sections, globalConfig, loading, setSections, setGlobalConfig }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}

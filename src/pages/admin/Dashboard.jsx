import { useSite } from '@/contexts/SiteContext';
import { Link } from 'react-router-dom';
import { Star, Globe, Info, Briefcase, Truck, Award, Phone, Anchor, Palette, Image } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Hero', icon: Star, to: '/admin/hero', desc: 'Título, imagem, botões de ação' },
  { id: 'navbar', label: 'Navbar', icon: Globe, to: '/admin/navbar', desc: 'Logo, links, telefone' },
  { id: 'about', label: 'Sobre', icon: Info, to: '/admin/about', desc: 'Textos e linha do tempo' },
  { id: 'services', label: 'Serviços', icon: Briefcase, to: '/admin/services', desc: 'Cards de serviços' },
  { id: 'fleet', label: 'Frota', icon: Truck, to: '/admin/fleet', desc: 'Tabela e indicadores' },
  { id: 'differentials', label: 'Diferenciais', icon: Award, to: '/admin/differentials', desc: 'Cards de diferenciais' },
  { id: 'contact', label: 'Contato', icon: Phone, to: '/admin/contact', desc: 'Telefone, email, endereço' },
  { id: 'footer', label: 'Footer', icon: Anchor, to: '/admin/footer', desc: 'Logo, links, copyright' },
  { id: 'global', label: 'Cores & Fontes', icon: Palette, to: '/admin/global', desc: 'Paleta de cores global' },
  { id: 'media', label: 'Mídia', icon: Image, to: '/admin/media', desc: 'URLs de imagens' },
];

export default function Dashboard() {
  const { sections, loading } = useSite();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-vv-navy">Painel de Controle</h1>
        <p className="text-slate-500 mt-1">Gerencie todo o conteúdo do site Vai&Vem Transportes</p>
      </div>

      {/* Status bar */}
      <div className={`mb-8 rounded-xl px-4 py-3 text-sm flex items-center gap-2 ${
        loading
          ? 'bg-amber-50 border border-amber-200 text-amber-700'
          : 'bg-green-50 border border-green-200 text-green-700'
      }`}>
        <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`} />
        {loading ? 'Carregando dados do Supabase...' : 'Conectado ao Supabase — dados sincronizados'}
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SECTIONS.map(({ id, label, icon: Icon, to, desc }) => (
          <Link
            key={id}
            to={to}
            className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-vv-blue/40 hover:shadow-lg hover:shadow-vv-blue/5 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-vv-blue/10 rounded-xl flex items-center justify-center group-hover:bg-vv-blue group-hover:text-white transition-all">
                <Icon className="w-4 h-4 text-vv-blue group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-vv-navy text-sm">{label}</span>
            </div>
            <p className="text-xs text-slate-400">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Quick preview link */}
      <div className="mt-8 bg-vv-navy rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">Ver Site ao Vivo</p>
          <p className="text-white/50 text-sm">Abra o site para verificar suas alterações</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-vv-blue hover:bg-vv-blue/90 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
        >
          Abrir Site →
        </a>
      </div>
    </div>
  );
}

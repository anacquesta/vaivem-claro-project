import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  LayoutDashboard, Image, Globe, Star, Info, Briefcase,
  Truck, Award, Phone, Anchor, Palette, LogOut, ExternalLink
} from 'lucide-react';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { label: 'CONTEÚDO', divider: true },
  { to: '/admin/hero', label: 'Hero', icon: Star },
  { to: '/admin/navbar', label: 'Navbar', icon: Globe },
  { to: '/admin/about', label: 'Sobre', icon: Info },
  { to: '/admin/services', label: 'Serviços', icon: Briefcase },
  { to: '/admin/fleet', label: 'Frota', icon: Truck },
  { to: '/admin/differentials', label: 'Diferenciais', icon: Award },
  { to: '/admin/contact', label: 'Contato', icon: Phone },
  { to: '/admin/footer', label: 'Footer', icon: Anchor },
  { label: 'CONFIGURAÇÃO', divider: true },
  { to: '/admin/global', label: 'Cores & Fontes', icon: Palette },
  { to: '/admin/media', label: 'Mídia', icon: Image },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add('admin-mode');
    return () => document.documentElement.classList.remove('admin-mode');
  }, []);

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden" style={{ zoom: 1 }}>
      {/* Sidebar */}
      <aside className="w-60 bg-vv-navy flex flex-col shrink-0 overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <img src="/logo completo.png" alt="Vai & Vem" className="h-10 w-auto brightness-0 invert" />
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-2">Painel Admin</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV.map((item, i) => {
            if (item.divider) {
              return (
                <p key={i} className="text-[10px] font-mono text-white/30 uppercase tracking-widest px-3 pt-5 pb-2">
                  {item.label}
                </p>
              );
            }
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-vv-blue text-white font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/8'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            Ver Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-white/8 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

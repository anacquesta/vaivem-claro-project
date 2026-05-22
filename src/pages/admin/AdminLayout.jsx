import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  LayoutDashboard, Image, Globe, Star, Info, Briefcase,
  Truck, Award, Phone, Anchor, Palette, LogOut, ExternalLink,
  Menu, X, HelpCircle, MessageSquare
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
  { to: '/admin/whatsapp', label: 'Chat WhatsApp', icon: MessageSquare },
  { label: 'CONFIGURAÇÃO', divider: true },
  { to: '/admin/global', label: 'Cores & Fontes', icon: Palette },
  { to: '/admin/media', label: 'Mídia', icon: Image },
  { to: '/admin/manual', label: 'Manual de Uso', icon: HelpCircle },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('admin-mode');
    return () => document.documentElement.classList.remove('admin-mode');
  }, []);

  // Auto-close sidebar on mobile when changing pages
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden" style={{ zoom: 1 }}>
      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity md:hidden animate-in fade-in duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - responsive sliding menu */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-vv-navy flex flex-col shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:w-60 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo & mobile close button */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <img src="/logo completo.png" alt="Vai & Vem" className="h-10 w-auto brightness-0 invert" />
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
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

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between bg-vv-navy px-4 py-3 text-white border-b border-white/10 md:hidden shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo completo.png" alt="Vai & Vem" className="h-7 w-auto brightness-0 invert" />
          </div>
          <div className="w-9" /> {/* Placeholder to balance flexbox layout */}
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 bg-slate-50">
          <Outlet />
        </main>

        {/* Fixed Mobile Bottom Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
          {/* Dashboard */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-vv-blue' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard className="w-5 h-5 transition-transform duration-150 active:scale-95" />
                <span>Painel</span>
                {isActive && (
                  <span className="absolute -top-1.5 w-6 h-0.5 rounded-full bg-vv-blue" />
                )}
              </>
            )}
          </NavLink>

          {/* Cores & Fontes */}
          <NavLink
            to="/admin/global"
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-vv-blue' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Palette className="w-5 h-5 transition-transform duration-150 active:scale-95" />
                <span>Visual</span>
                {isActive && (
                  <span className="absolute -top-1.5 w-6 h-0.5 rounded-full bg-vv-blue" />
                )}
              </>
            )}
          </NavLink>

          {/* Mídia */}
          <NavLink
            to="/admin/media"
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-vv-blue' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Image className="w-5 h-5 transition-transform duration-150 active:scale-95" />
                <span>Mídia</span>
                {isActive && (
                  <span className="absolute -top-1.5 w-6 h-0.5 rounded-full bg-vv-blue" />
                )}
              </>
            )}
          </NavLink>

          {/* Ver Site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-[10px] font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Globe className="w-5 h-5 transition-transform duration-150 active:scale-95" />
            <span>Ver Site</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

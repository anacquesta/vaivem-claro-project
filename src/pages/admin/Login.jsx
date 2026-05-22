import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!supabase) throw new Error('Supabase não configurado. Verifique o arquivo .env');
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      // Redirect handled by AdminRoute watcher
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vv-navy flex items-center justify-center p-4" style={{ zoom: 1 }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo completo.png" alt="Vai & Vem" className="h-16 w-auto mx-auto mb-4 brightness-0 invert" />
          <h1 className="text-white text-xl font-bold">Painel Administrativo</h1>
          <p className="text-white/50 text-sm mt-1">Faça login para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-xs font-mono text-white/60 uppercase tracking-widest mb-2">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm outline-none focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/60 uppercase tracking-widest mb-2">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm outline-none focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/20 transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-vv-blue hover:bg-vv-blue/90 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all duration-200"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="text-center text-white/30 text-xs mt-6 flex flex-col gap-1 items-center justify-center">
          <span>Vai&Vem Transportes © {new Date().getFullYear()}</span>
          <span>
            Desenvolvido por{' '}
            <a
              href="https://carolgonzaga.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline text-vv-blue transition-colors"
            >
              CarolGonzaga
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

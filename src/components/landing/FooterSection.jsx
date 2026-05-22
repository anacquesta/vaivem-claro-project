import { Phone, Mail, MapPin } from 'lucide-react';
import { useSite } from '@/contexts/SiteContext';

export default function FooterSection() {
  const { sections } = useSite();
  const data = sections.footer;

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-vv-navy/10 bg-white">
      <div className="site-container px-6 lg:px-10 pt-16 pb-4 lg:pt-20 lg:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_max-content] gap-12 lg:gap-16 items-start">
          <div className="flex flex-col justify-start">
            <img
              src={data.logo_url}
              alt="Vai & Vem Transportes"
              className="h-[200px] w-auto max-w-full object-contain object-left"
            />
          </div>

          <div>
            <h3 className="text-xs font-mono text-vv-navy tracking-[0.15em] uppercase mb-4 font-bold">Navegação</h3>
            <div className="space-y-3">
              {data.nav_links?.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block text-sm text-vv-steel hover:text-vv-navy transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-vv-navy tracking-[0.15em] uppercase mb-4 font-bold">Serviços</h3>
            <div className="space-y-3">
              {data.service_links?.map((s) => (
                <span key={s} className="block text-sm text-vv-steel text-left">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-vv-navy tracking-[0.15em] uppercase mb-4 font-bold">Contato</h3>
            <div className="space-y-4">
              {data.phone && (
                <a
                  href={data.phone_href || "https://wa.me/5511962796531"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-vv-steel hover:text-vv-navy transition-colors text-left"
                >
                  <Phone className="w-4 h-4 text-vv-blue shrink-0" />
                  {data.phone}
                </a>
              )}
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-start gap-3 text-sm text-vv-steel hover:text-vv-navy transition-colors text-left"
                >
                  <Mail className="w-4 h-4 text-vv-blue shrink-0 mt-0.5" />
                  <span className="whitespace-nowrap">{data.email}</span>
                </a>
              )}
              {data.address && (
                <div className="flex items-center gap-3 text-sm text-vv-steel text-left">
                  <MapPin className="w-4 h-4 text-vv-blue shrink-0" />
                  {data.address}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-vv-navy/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-vv-steel/60">
            {`© ${new Date().getFullYear()} ${data.copyright_name || 'Vai\u0026Vem Transportes'}. Todos os direitos reservados.`}
          </span>
          <span className="text-xs text-vv-steel/60">
            Desenvolvido por{' '}
            <a
              href="https://carolgonzaga.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline hover:text-vv-blue transition-colors"
            >
              CarolGonzaga
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
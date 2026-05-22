import { useState } from 'react';
import { BookOpen, Key, Users, Mail, Globe, AlertTriangle, ExternalLink } from 'lucide-react';

export default function Manual() {
  const [activeSection, setActiveSection] = useState('admin');

  const sections = [
    { id: 'admin', label: '1. Painel Admin', icon: Key },
    { id: 'supabase', label: '2. Usuários (Supabase)', icon: Users },
    { id: 'emailjs', label: '3. Envio de E-mails', icon: Mail },
    { id: 'registrobr', label: '4. Domínio Registro.br', icon: Globe },
    { id: 'troubleshooting', label: '5. Resolução de Problemas', icon: AlertTriangle },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Header Banner */}
      <div className="bg-vv-navy text-white rounded-2xl p-6 md:p-8 mb-8 border-b-4 border-vv-blue shadow-lg">
        <div className="flex items-center gap-3 mb-2 text-vv-blue">
          <BookOpen className="w-6 h-6" />
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">Manual Operacional</span>
        </div>
        <h1 className="text-2xl md:text-3.5xl font-black tracking-tight text-white uppercase">
          Instruções de Operação e Suporte
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl">
          Este manual contém todas as informações confidenciais necessárias para gerenciar o portal Vai&Vem, cadastrar administradores, configurar o domínio e resolver possíveis problemas.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Left Sidebar Navigation */}
        <aside className="lg:col-span-4 sticky top-6 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
          <h3 className="text-xs font-mono font-bold text-vv-steel uppercase tracking-widest px-3 mb-4">
            Conteúdo do Manual
          </h3>
          <nav className="space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-150 ${
                    isActive
                      ? 'bg-vv-blue/10 text-vv-blue font-bold'
                      : 'text-slate-600 hover:text-vv-navy hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {sec.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Section */}
        <div className="lg:col-span-8 space-y-12 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-200/80">
          
          {/* Section 1: Admin Layout & Login */}
          <section id="admin" className="scroll-mt-6">
            <h2 className="text-xl md:text-2xl font-black text-vv-navy border-b-2 border-vv-blue/10 pb-3 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-vv-blue rounded-full"></span>
              Painel de Administração
            </h2>
            <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
              O painel administrativo permite atualizar em tempo real todo o conteúdo dinâmico da landing page institucional, incluindo textos, fotos do carrossel, diferenciais da frota e informações de contato.
            </p>
            <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed">
              Para acessar o ambiente de controle da plataforma, insira o sufixo <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-vv-navy">/admin</code> no final da URL do seu site. 
              <br />Exemplo: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-vv-navy">https://vaivemtransporte.com.br/admin</code>
            </p>

            <div className="bg-vv-blue-light border-l-4 border-vv-blue rounded-r-xl p-5 mb-6">
              <h4 className="font-bold text-vv-navy text-sm md:text-base mb-3 flex items-center gap-2">
                🔑 Credenciais Iniciais de Acesso
              </h4>
              <p className="text-slate-700 text-xs md:text-sm mb-4">
                Utilize as seguintes informações provisórias enviadas no cadastro inicial para efetuar o login:
              </p>
              <div className="bg-vv-navy text-white rounded-lg p-4 font-mono text-xs md:text-sm space-y-2 border-l-4 border-vv-ember">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-vv-blue">E-mail:</span>
                  <span className="font-bold text-slate-100">vaievemtransportesite@gmail.com</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-vv-blue">Senha Inicial:</span>
                  <span className="font-bold text-slate-100">Vaievem2019!</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-vv-ember rounded-r-xl p-5">
              <h4 className="font-bold text-vv-ember text-sm md:text-base mb-2">
                ⚠️ RECOMENDAÇÃO DE SEGURANÇA
              </h4>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                Recomendamos alterar esta senha provisória logo no primeiro login para garantir a segurança dos dados do portal. 
                Você pode redefinir a senha através da opção "Alterar Senha" dentro do próprio painel administrativo ou através do console do banco de dados (Supabase).
              </p>
            </div>
          </section>

          {/* Section 2: Supabase */}
          <section id="supabase" className="scroll-mt-6">
            <h2 className="text-xl md:text-2xl font-black text-vv-navy border-b-2 border-vv-blue/10 pb-3 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-vv-blue rounded-full"></span>
              Gestão de Usuários (Supabase)
            </h2>
            <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed">
              O sistema de autenticação e banco de dados é gerenciado através do **Supabase**. Caso você precise cadastrar novos administradores para gerenciar o site, o cadastro deve ser feito por lá.
            </p>

            <h3 className="font-bold text-vv-navy text-sm md:text-base mb-3">
              Passo a Passo para Adicionar Novo Administrador:
            </h3>
            <ol className="list-decimal pl-5 space-y-3 text-slate-600 text-sm md:text-base">
              <li>
                Acesse a sua conta no site do <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="text-vv-blue hover:underline font-semibold inline-flex items-center gap-1">Supabase <ExternalLink className="w-3 h-3" /></a> e selecione o projeto correspondente à <strong>Vai&Vem</strong>.
              </li>
              <li>
                No menu lateral esquerdo do Supabase, clique na seção <strong>Authentication</strong> (ícone de chave 🔑).
              </li>
              <li>
                Na aba <strong>Users</strong>, clique no botão <strong>Add user</strong> (Adicionar Usuário) no canto superior direito e selecione a opção <strong>Create User</strong>.
              </li>
              <li>
                Preencha as informações:
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li>Insira o <strong>E-mail</strong> do novo administrador.</li>
                  <li>Defina uma <strong>Senha provisória</strong> segura.</li>
                  <li>Deixe marcado <em>"Auto-confirm user?"</em> caso queira que o login fique liberado imediatamente sem confirmação de e-mail.</li>
                </ul>
              </li>
              <li>
                Clique em <strong>Save</strong> para confirmar a criação.
              </li>
            </ol>

            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5 mt-6">
              <h4 className="font-bold text-red-600 text-sm md:text-base mb-2">
                ⚠️ RISCO DE SEGURANÇA
              </h4>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                Qualquer usuário cadastrado na seção Authentication do Supabase terá privilégios totais de leitura e gravação no painel administrativo do site.
                Nunca compartilhe os acessos da conta principal do Supabase.
              </p>
            </div>
          </section>

          {/* Section 3: EmailJS */}
          <section id="emailjs" className="scroll-mt-6">
            <h2 className="text-xl md:text-2xl font-black text-vv-navy border-b-2 border-vv-blue/10 pb-3 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-vv-blue rounded-full"></span>
              Configuração de Envio de E-mails (EmailJS)
            </h2>
            <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
              O formulário de contato do site envia mensagens direto para a caixa de e-mails da empresa através do serviço gratuito <strong>EmailJS</strong>.
            </p>

            <h3 className="font-bold text-vv-navy text-sm md:text-base mb-3 mt-6">
              Como trocar o e-mail de destino futuramente:
            </h3>
            <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
              Se a Vai&Vem decidir trocar de e-mail institucional ou se você quiser encaminhar as mensagens para outra conta (ex: <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">comercial@vaivemtransporte.com.br</code>), siga estes passos:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-slate-600 text-sm md:text-base">
              <li>
                Faça login no painel do <a href="https://emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-vv-blue hover:underline font-semibold inline-flex items-center gap-1">EmailJS <ExternalLink className="w-3 h-3" /></a>.
              </li>
              <li>
                No menu lateral esquerdo, clique em <strong>Email Services</strong>.
              </li>
              <li>
                Caso queira manter o mesmo canal Gmail mas apenas redirecionar a outra conta de e-mail secundária:
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li>Vá para a aba <strong>Email Templates</strong>.</li>
                  <li>Clique no seu modelo de e-mail e substitua o campo <strong>To Email</strong> com o novo e-mail que receberá os orçamentos.</li>
                  <li>Salve as alterações.</li>
                </ul>
              </li>
              <li>
                Caso queira trocar a conta principal que realiza os envios (ex: conectar outro Gmail ou Outlook):
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li>Em <strong>Email Services</strong>, clique em <em>Add New Service</em> ou clique em configurações no serviço existente.</li>
                  <li>Conecte o novo e-mail correspondente clicando em <strong>Connect Account</strong>.</li>
                  <li>Se gerar um novo <em>Service ID</em>, atualize a chave correspondente nas configurações da Vercel.</li>
                </ul>
              </li>
            </ol>

            <h3 className="font-bold text-vv-navy text-sm md:text-base mb-3 mt-6">
              Como atualizar o Layout do E-mail:
            </h3>
            <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
              Para customizar a mensagem enviada, acesse <strong>Email Templates</strong> no painel EmailJS, selecione o template de orçamento e edite o HTML usando as seguintes tags de substituição:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm md:text-base">
              <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs">{"{{nome}}"}</code>: Nome digitado pelo cliente</li>
              <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs">{"{{empresa}}"}</code>: Nome da empresa informado</li>
              <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs">{"{{telefone}}"}</code>: Telefone/WhatsApp do cliente</li>
              <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs">{"{{mensagem}}"}</code>: Solicitação detalhada do orçamento</li>
            </ul>
          </section>

          {/* Section 4: Registro.br */}
          <section id="registrobr" className="scroll-mt-6">
            <h2 className="text-xl md:text-2xl font-black text-vv-navy border-b-2 border-vv-blue/10 pb-3 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-vv-blue rounded-full"></span>
              Configuração de Domínio (Registro.br)
            </h2>
            <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
              Para associar o domínio profissional comprado no Registro.br ao servidor de hospedagem da Vercel, utilize a configuração de zona DNS abaixo:
            </p>

            <h3 className="font-bold text-vv-navy text-sm md:text-base mb-3">
              Apontamentos necessários no painel do Registro.br:
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 uppercase font-bold border-b border-slate-200">
                    <th className="p-3">Nome/Entrada</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Dados/Destino</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-mono">Deixe em branco (ou @)</td>
                    <td className="p-3 font-semibold text-vv-blue">A</td>
                    <td className="p-3 font-mono">76.76.21.21</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">www</td>
                    <td className="p-3 font-semibold text-vv-blue">CNAME</td>
                    <td className="p-3 font-mono">cname.vercel-dns.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Troubleshooting */}
          <section id="troubleshooting" className="scroll-mt-6">
            <h2 className="text-xl md:text-2xl font-black text-vv-navy border-b-2 border-vv-blue/10 pb-3 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-vv-blue rounded-full"></span>
              Resolução de Problemas Comuns
            </h2>
            
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                <h4 className="font-bold text-vv-navy text-sm md:text-base mb-2">
                  ❌ O formulário de contato exibe a mensagem "Erro ao enviar. Tente novamente!"
                </h4>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-3">
                  <strong>Causa Comum:</strong> Chaves de autenticação do EmailJS incorretas ou limite diário de e-mails atingido.
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 text-xs md:text-sm">
                  <li>Verifique se as chaves <code>VITE_EMAILJS_SERVICE_ID</code>, <code>VITE_EMAILJS_TEMPLATE_ID</code> e <code>VITE_EMAILJS_PUBLIC_KEY</code> foram inseridas sem espaços extras nas configurações de Environment Variables da Vercel.</li>
                  <li>Verifique no dashboard do EmailJS se o plano gratuito atingiu o limite diário de envios (200 e-mails/mês). Se sim, considere migrar para um plano pago ou conectar uma nova conta de e-mail secundária.</li>
                </ol>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                <h4 className="font-bold text-vv-navy text-sm md:text-base mb-2">
                  ❌ Alterei os dados no Painel Admin mas as alterações não aparecem no site
                </h4>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-3">
                  <strong>Causa Comum:</strong> Cache local do navegador ou falha na conexão com o banco de dados do Supabase.
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 text-xs md:text-sm">
                  <li>Abra o site em uma aba anônima para testar se as alterações aparecem (isso descarta cache do navegador).</li>
                  <li>Acesse o console do Supabase e verifique se as chaves da API de comunicação não expiraram ou se a base de dados não está pausada por inatividade.</li>
                </ol>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                <h4 className="font-bold text-vv-navy text-sm md:text-base mb-2">
                  ❌ O site mostra o erro "Invalid Configuration" ou "This site can’t be reached" após trocar o domínio
                </h4>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-3">
                  <strong>Causa Comum:</strong> Propagação de DNS pendente no Registro.br.
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 text-xs md:text-sm">
                  <li>Aguarde de 2 a 24 horas após salvar as alterações no Registro.br. O processo de propagação não é imediato e depende dos provedores de internet.</li>
                  <li>Use uma ferramenta pública de validação como o <a href="https://dnschecker.org/" target="_blank" rel="noopener noreferrer" className="text-vv-blue hover:underline font-semibold">DNS Checker</a> para validar se o seu domínio está apontando para o IP <code>76.76.21.21</code> mundialmente.</li>
                </ol>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/contexts/SiteContext";

const DEFAULT_PHONE = "5511962796531";

const DEFAULT_FLOW = {
  start: {
    bot: "Olá! 👋 Sou o assistente virtual da Vai e Vem Transportes. Como posso te ajudar hoje?",
    options: [
      { label: "💰 Solicitar orçamento", next: "orcamento" },
      { label: "📦 Atendimento / dúvidas", next: "atendimento" },
      { label: "📣 SAC (elogios e reclamações)", next: "sac" },
      { label: "🤝 Quero ser motorista agregado", next: "agregado" },
    ],
  },
  orcamento: {
    bot: "Perfeito! Para agilizar seu orçamento, vou te conectar direto com nosso time comercial no WhatsApp. Qual o tipo de operação?",
    options: [
      {
        label: "Carga fracionada",
        wa: "Olá! Gostaria de um orçamento para carga fracionada.",
      },
      {
        label: "Carga dedicada / lotação",
        wa: "Olá! Gostaria de um orçamento para carga dedicada (lotação).",
      },
      {
        label: "Operação recorrente",
        wa: "Olá! Tenho interesse em uma operação logística recorrente. Podemos conversar?",
      },
      { label: "↩︎ Voltar", next: "start" },
    ],
  },
  atendimento: {
    bot: "Claro! Selecione abaixo a dúvida mais próxima da sua:",
    options: [
      { label: "Vocês atendem todo o Brasil?", next: "faq_cobertura" },
      { label: "Como rastreio minha carga?", next: "faq_rastreio" },
      { label: "Tipos de carga transportadas", next: "faq_cargas" },
      { label: "Prazos de entrega", next: "faq_prazos" },
      { label: "💬 Falar com atendente", wa: "Olá! Preciso de atendimento, podem me ajudar?" },
      { label: "↩︎ Voltar", next: "start" },
    ],
  },
  faq_cobertura: {
    bot: "Sim! Operamos em todo o território nacional, com base operacional em São Paulo e mais de 200 veículos entre frota própria e agregados.",
    options: [
      { label: "💬 Falar com atendente", wa: "Olá! Gostaria de saber sobre cobertura para minha rota." },
      { label: "↩︎ Outras dúvidas", next: "atendimento" },
    ],
  },
  faq_rastreio: {
    bot: "Todas as cargas têm monitoramento em tempo real 24h. Após a coleta, enviamos o link de rastreio diretamente para você.",
    options: [
      { label: "💬 Preciso do rastreio agora", wa: "Olá! Preciso de informações sobre o rastreio da minha carga." },
      { label: "↩︎ Outras dúvidas", next: "atendimento" },
    ],
  },
  faq_cargas: {
    bot: "Transportamos carga geral, fracionada, lotação e operações dedicadas. Trabalhamos com diferentes tipos de veículos conforme a necessidade.",
    options: [
      { label: "💰 Quero um orçamento", next: "orcamento" },
      { label: "↩︎ Outras dúvidas", next: "atendimento" },
    ],
  },
  faq_prazos: {
    bot: "Os prazos variam conforme rota e modalidade. Em operações recorrentes, mantemos SLA combinado em contrato. Para prazos específicos, fale com nosso time.",
    options: [
      { label: "💬 Consultar prazo", wa: "Olá! Gostaria de consultar o prazo de entrega para uma rota específica." },
      { label: "↩︎ Outras dúvidas", next: "atendimento" },
    ],
  },
  sac: {
    bot: "Sua opinião é fundamental para a gente. O que você gostaria de registrar?",
    options: [
      { label: "⭐ Elogio", wa: "Olá! Gostaria de registrar um elogio sobre o atendimento da Vai e Vem." },
      { label: "⚠️ Reclamação", wa: "Olá! Gostaria de registrar uma reclamação. Podem me ajudar?" },
      { label: "💡 Sugestão", wa: "Olá! Tenho uma sugestão para a Vai e Vem Transportes." },
      { label: "↩︎ Voltar", next: "start" },
    ],
  },
  agregado: {
    bot: "Que ótimo! Estamos sempre abertos a novos parceiros agregados. Vou te direcionar para nosso time de frota.",
    options: [
      { label: "📋 Quero me cadastrar", wa: "Olá! Tenho interesse em me tornar motorista agregado da Vai e Vem." },
      { label: "↩︎ Voltar", next: "start" },
    ],
  },
};

export function WhatsAppChat() {
  const { sections } = useSite();
  const logoUrl = sections?.navbar?.logo_url || "/logo.png";
  
  const whatsappConfig = sections?.whatsapp || {};
  const phone = whatsappConfig.phone || DEFAULT_PHONE;
  const flow = whatsappConfig.flow || DEFAULT_FLOW;

  const waLink = (msg) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  const [open, setOpen] = useState(false);
  const [nodeKey, setNodeKey] = useState("start");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const scrollRef = useRef(null);

  // Initialize or reset messages when dynamic flow is loaded or changes
  useEffect(() => {
    if (flow?.start?.bot) {
      setMessages([{ from: "bot", text: flow.start.bot }]);
      setNodeKey("start");
    }
  }, [flow]);

  useEffect(() => {
    // Show teaser after 4 seconds if chat is not already open
    const timer = setTimeout(() => {
      if (!open) {
        setShowTeaser(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [open]);

  const toggleChat = () => {
    setOpen((o) => {
      const nextOpen = !o;
      if (nextOpen) {
        setShowTeaser(false);
      }
      return nextOpen;
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const handleOption = (opt) => {
    if (opt.wa) {
      setMessages((m) => [...m, { from: "user", text: opt.label }]);
      setTimeout(() => {
        window.open(waLink(opt.wa), "_blank", "noopener,noreferrer");
      }, 300);
      return;
    }
    if (opt.next) {
      const next = flow[opt.next];
      if (next) {
        setMessages((m) => [...m, { from: "user", text: opt.label }]);
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages((m) => [...m, { from: "bot", text: next.bot }]);
          setNodeKey(opt.next);
        }, 650);
      }
    }
  };

  const restart = () => {
    if (flow?.start?.bot) {
      setMessages([{ from: "bot", text: flow.start.bot }]);
      setNodeKey("start");
    }
  };
  const currentOptions = (typing || !flow || !flow[nodeKey]) ? [] : (flow[nodeKey].options || []);

  return (
    <>
      {/* Teaser bubble */}
      {showTeaser && !open && (
        <div className="fixed bottom-24 right-5 z-50 flex max-w-[280px] items-center gap-3 rounded-lg border border-border bg-[#202C33] p-3 text-white shadow-xl animate-fade-in-up md:bottom-28 md:right-7">
          <div className="flex-1 text-xs leading-normal">
            <span className="font-semibold block text-accent mb-0.5">Dúvidas?</span>
            Simule seu orçamento ou tire dúvidas no chat! 👋
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTeaser(false);
            }}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Fechar dica"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          {/* Small tail pointing to the button */}
          <div className="absolute right-6 -bottom-1.5 h-3 w-3 rotate-45 border-r border-b border-border bg-[#202C33]" />
        </div>
      )}

      {/* Floating button */}
      <button
        aria-label={open ? "Fechar chat" : "Abrir chat no WhatsApp"}
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 active:scale-95 md:bottom-7 md:right-7 md:h-16 md:w-16 ${
          open ? "hidden md:flex" : ""
        }`}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
        {open ? (
          <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 32 32" className="relative h-7 w-7 md:h-8 md:w-8" fill="currentColor">
            <path d="M19.11 17.21c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.15-1.33-.79-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.83-1.99-.22-.52-.44-.45-.6-.46H10.4c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22 0 1.31.95 2.57 1.08 2.75.13.18 1.87 2.85 4.54 3.99.63.27 1.13.44 1.51.56.63.2 1.21.17 1.67.1.51-.08 1.58-.65 1.81-1.27.22-.62.22-1.15.16-1.27-.06-.11-.24-.18-.51-.31zM16.01 4C9.93 4 5 8.93 5 15c0 2.16.63 4.17 1.71 5.86L5 27l6.32-1.66A11 11 0 0 0 16.01 26C22.08 26 27 21.07 27 15S22.08 4 16.01 4zm0 19.85c-1.67 0-3.28-.45-4.69-1.3l-.34-.2-3.75.98 1-3.66-.22-.37A9.13 9.13 0 0 1 6.85 15c0-5.06 4.11-9.17 9.17-9.17 2.45 0 4.76.96 6.49 2.69a9.16 9.16 0 0 1 2.69 6.49c0 5.06-4.11 9.16-9.19 9.16z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 sm:inset-x-auto sm:bottom-24 sm:right-5 md:right-7 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        role="dialog"
        aria-label="Chat de pré-atendimento"
      >
        <div className="mx-auto flex h-[85vh] w-full max-w-[400px] flex-col overflow-hidden border border-border bg-[#0b141a] shadow-2xl sm:h-[560px] sm:rounded-2xl">
          {/* Header */}
          <header className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1">
              <img src={logoUrl} alt="Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Vai e Vem Transportes</p>
              <p className="flex items-center gap-1.5 text-xs text-white/75">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                online · responde em minutos
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={restart}
                title="Recomeçar conversa"
                className="rounded p-1.5 text-white/80 transition-colors hover:bg-white/10"
                aria-label="Recomeçar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={toggleChat}
                title="Fechar chat"
                className="rounded p-1.5 text-white/80 transition-colors hover:bg-white/10"
                aria-label="Fechar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-2 overflow-y-auto bg-[#0b141a] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.03)_0,transparent_40%),radial-gradient(circle_at_80%_60%,rgba(37,211,102,0.04)_0,transparent_45%)] px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-line rounded-lg px-3 py-2 text-sm leading-relaxed shadow-sm ${
                    m.from === "user"
                      ? "rounded-br-sm bg-[#005C4B] text-white"
                      : "rounded-bl-sm bg-[#202C33] text-white/95"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-lg rounded-bl-sm bg-[#202C33] px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="border-t border-white/10 bg-[#0b141a] p-3">
            <div className="flex flex-wrap gap-2">
              {currentOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(opt)}
                  className="rounded-full border border-[#25D366]/40 bg-[#202C33] px-3 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-[#25D366] hover:bg-[#25D366]/15"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <a
              href={waLink("Olá! Quero falar com o atendimento da Vai e Vem.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#1ebe5b]"
            >
              <svg viewBox="0 0 32 32" className="h-4 w-4" fill="currentColor">
                <path d="M19.11 17.21c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.15-1.33-.79-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.83-1.99-.22-.52-.44-.45-.6-.46H10.4c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22 0 1.31.95 2.57 1.08 2.75.13.18 1.87 2.85 4.54 3.99.26.11.26.07.74.02.49-.04 1.58-.65 1.81-1.27.22-.62.22-1.15.16-1.27-.06-.11-.24-.18-.51-.31z" />
              </svg>
              Abrir WhatsApp direto
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

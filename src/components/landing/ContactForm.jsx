import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2, MessageCircle, Mail } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ nome: '', empresa: '', telefone: '', mensagem: '' });
  const [status, setStatus] = useState('idle');

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 4000);
    setForm({ nome: '', empresa: '', telefone: '', mensagem: '' });
  };

  return (
    <section id="contato" aria-labelledby="contact-title" className="relative py-[60px] overflow-hidden bg-vv-blue">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 space-y-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-vv-navy" />
                <span className="text-xs font-mono text-vv-navy font-semibold tracking-[0.25em] uppercase">
                  Fale Conosco
                </span>
              </div>
              
              <h2
                id="contact-title"
                className="text-4xl sm:text-5xl lg:text-6.5xl font-black leading-[0.95] tracking-tighter uppercase text-white"
              >
                Pronto para
                <br />
                <span className="text-vv-navy/45">mover sua carga?</span>
              </h2>
            </motion.div>

            <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-md mb-8">
              Solicite um orçamento personalizado. Nossa equipe responde em até 2 horas durante o horário comercial.
            </p>

            <div className="space-y-6 pt-6">
              {/* WhatsApp block */}
              <div className="flex items-center justify-between lg:justify-start gap-4 w-full">
                <div className="w-12 h-12 rounded-xl bg-vv-navy/10 border border-vv-navy/15 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-vv-navy" />
                </div>
                <div className="text-right lg:text-left">
                  <span className="block text-[10px] font-mono tracking-widest text-vv-navy/60 uppercase font-semibold">
                    WhatsApp
                  </span>
                  <a
                    href="https://wa.me/5511962796531"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:underline text-base md:text-lg"
                  >
                    (11) 96279-6531
                  </a>
                </div>
              </div>

              {/* Email block */}
              <div className="flex items-center justify-between lg:justify-start gap-4 w-full">
                <div className="w-12 h-12 rounded-xl bg-vv-navy/10 border border-vv-navy/15 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-vv-navy" />
                </div>
                <div className="text-right lg:text-left">
                  <span className="block text-[10px] font-mono tracking-widest text-vv-navy/60 uppercase font-semibold">
                    E-mail
                  </span>
                  <a
                    href="mailto:vaievemtransportes@vaievemtransportes.com.br"
                    className="text-white font-bold hover:underline text-sm md:text-base break-all"
                  >
                    vaievemtransportes@vaievemtransportes.com.br
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card Form */}
          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-white rounded-2xl p-8 lg:p-12 space-y-8 shadow-2xl border border-slate-100"
            >
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-vv-blue uppercase font-bold">
                  Solicitar Orçamento
                </span>
              </div>

              <div className="space-y-6">
                {/* Seu Nome */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                    Seu Nome <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nome}
                    onChange={(e) => update('nome', e.target.value)}
                    placeholder="Nome completo"
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/10 text-vv-navy text-sm placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Empresa */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={form.empresa}
                    onChange={(e) => update('empresa', e.target.value)}
                    placeholder="Razão social ou nome fantasia"
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/10 text-vv-navy text-sm placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Telefone / WhatsApp */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                    Telefone / WhatsApp <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.telefone}
                    onChange={(e) => update('telefone', e.target.value)}
                    placeholder="(11) 99999-0000"
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/10 text-vv-navy text-sm placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Mensagem */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                    Mensagem
                  </label>
                  <textarea
                    value={form.mensagem}
                    onChange={(e) => update('mensagem', e.target.value)}
                    placeholder="Descreva sua necessidade de transporte..."
                    rows={3}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/10 text-vv-navy text-sm placeholder:text-slate-400 transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-vv-blue hover:bg-vv-blue/90 disabled:opacity-60 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-vv-blue/25"
              >
                {status === 'sending' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Enviando...</>
                ) : status === 'sent' ? (
                  <><CheckCircle className="w-4 h-4" />Mensagem enviada!</>
                ) : (
                  <><span>Enviar Solicitação</span><ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
}
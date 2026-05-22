import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, Textarea, SectionHeader, Card, CardTitle } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

const NODE_NAMES = {
  start: "👋 Menu Inicial",
  orcamento: "💰 Orçamento",
  atendimento: "📦 Atendimento / Dúvidas",
  faq_cobertura: "🌍 Dúvida: Cobertura",
  faq_rastreio: "🔍 Dúvida: Rastreio",
  faq_cargas: "🚚 Dúvida: Tipos de cargas",
  faq_prazos: "🕒 Dúvida: Prazos",
  sac: "📣 SAC",
  agregado: "🤝 Quero ser agregado",
};

export default function WhatsAppEditor() {
  const { sections, setSections } = useSite();
  
  // Initialize from context, fallback to defaults if not present
  const defaultWhatsApp = {
    phone: "5511962796531",
    flow: {
      start: { bot: "", options: [] },
      orcamento: { bot: "", options: [] },
      atendimento: { bot: "", options: [] },
      faq_cobertura: { bot: "", options: [] },
      faq_rastreio: { bot: "", options: [] },
      faq_cargas: { bot: "", options: [] },
      faq_prazos: { bot: "", options: [] },
      sac: { bot: "", options: [] },
      agregado: { bot: "", options: [] },
    }
  };

  const initialData = sections.whatsapp || defaultWhatsApp;
  const [data, setData] = useState(initialData);
  const [activeNode, setActiveNode] = useState('start');

  const updatePhone = (v) => {
    setData(prev => ({ ...prev, phone: v }));
  };

  const updateBotMessage = (v) => {
    setData(prev => {
      const newFlow = { ...prev.flow };
      newFlow[activeNode] = { ...newFlow[activeNode], bot: v };
      return { ...prev, flow: newFlow };
    });
  };

  const updateOption = (index, updatedFields) => {
    setData(prev => {
      const newFlow = { ...prev.flow };
      const nodeOptions = [...(newFlow[activeNode]?.options || [])];
      nodeOptions[index] = { ...nodeOptions[index], ...updatedFields };
      newFlow[activeNode] = { ...newFlow[activeNode], options: nodeOptions };
      return { ...prev, flow: newFlow };
    });
  };

  const addOption = () => {
    setData(prev => {
      const newFlow = { ...prev.flow };
      const nodeOptions = [...(newFlow[activeNode]?.options || [])];
      nodeOptions.push({ label: 'Nova Opção', next: 'start' });
      newFlow[activeNode] = { ...newFlow[activeNode], options: nodeOptions };
      return { ...prev, flow: newFlow };
    });
  };

  const removeOption = (index) => {
    setData(prev => {
      const newFlow = { ...prev.flow };
      const nodeOptions = (newFlow[activeNode]?.options || []).filter((_, i) => i !== index);
      newFlow[activeNode] = { ...newFlow[activeNode], options: nodeOptions };
      return { ...prev, flow: newFlow };
    });
  };

  const save = async () => {
    await saveSection('whatsapp', data);
    setSections(p => ({ ...p, whatsapp: data }));
  };

  const currentNode = data.flow?.[activeNode] || { bot: '', options: [] };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader 
        title="Configurações do WhatsApp Chat" 
        description="Configure o número de atendimento e edite o fluxo de mensagens/perguntas automáticas do robô." 
      />

      <div className="space-y-6">
        {/* Card do Telefone */}
        <Card>
          <CardTitle>Contato Principal</CardTitle>
          <Field 
            label="Número de Telefone (WhatsApp)" 
            hint="Use o formato DDI + DDD + Número, apenas dígitos. Exemplo: 5511962796531 (onde 55 é o Brasil, 11 é o DDD e o restante é o número)."
          >
            <Input value={data.phone} onChange={updatePhone} placeholder="5511962796531" />
          </Field>
        </Card>

        {/* Layout de duas colunas para o editor de fluxo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Seletor de Etapas (Nós) */}
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold px-1">
              Etapas da Conversa
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 space-y-1">
              {Object.entries(NODE_NAMES).map(([key, label]) => {
                const isActive = activeNode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveNode(key)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive 
                        ? 'bg-vv-blue text-white font-medium shadow-xs' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editor da Etapa Selecionada */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardTitle>Editando: {NODE_NAMES[activeNode]}</CardTitle>
              
              <div className="space-y-4">
                {/* Mensagem do Bot */}
                <Field 
                  label="Mensagem do Assistente" 
                  hint="Esta é a resposta que o robô irá enviar quando o usuário entrar nesta etapa."
                >
                  <Textarea 
                    value={currentNode.bot} 
                    onChange={updateBotMessage} 
                    placeholder="Olá! Como posso te ajudar?" 
                    rows={4}
                  />
                </Field>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 font-semibold">
                  Opções de Resposta Rápida (Botões)
                </h3>
                <button
                  onClick={addOption}
                  className="text-xs font-semibold text-vv-blue hover:text-vv-blue/80 transition-colors"
                >
                  + Adicionar Botão
                </button>
              </div>

              {(!currentNode.options || currentNode.options.length === 0) ? (
                <div className="text-center py-6 text-sm text-slate-400 italic">
                  Nenhum botão de resposta rápida configurado para esta etapa. O usuário precisará recomeçar ou abrir o WhatsApp direto.
                </div>
              ) : (
                <div className="space-y-4">
                  {currentNode.options.map((option, i) => {
                    const isWaAction = option.wa !== undefined;
                    return (
                      <div key={i} className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl relative group">
                        
                        {/* Botão de Excluir */}
                        <button
                          onClick={() => removeOption(i)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-500 text-xs transition-colors"
                          title="Excluir botão"
                        >
                          ✕
                        </button>

                        <div className="grid grid-cols-1 gap-4">
                          {/* Texto do Botão */}
                          <Field label="Texto do Botão">
                            <Input 
                              value={option.label} 
                              onChange={(v) => updateOption(i, { label: v })} 
                              placeholder="Ex: 💰 Solicitar orçamento"
                            />
                          </Field>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Ação */}
                            <Field label="Tipo de Ação">
                              <select
                                value={isWaAction ? "wa" : "next"}
                                onChange={(e) => {
                                  if (e.target.value === "wa") {
                                    // Remove next, add wa
                                    const { next, ...rest } = option;
                                    updateOption(i, { ...rest, wa: "Olá! Gostaria de conversar com o atendimento." });
                                  } else {
                                    // Remove wa, add next
                                    const { wa, ...rest } = option;
                                    updateOption(i, { ...rest, next: "start" });
                                  }
                                }}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/10 bg-white"
                              >
                                <option value="next">Navegar para outro menu</option>
                                <option value="wa">Abrir WhatsApp direto</option>
                              </select>
                            </Field>

                            {/* Detalhe da Ação */}
                            {isWaAction ? (
                              <Field label="Mensagem pré-definida do WhatsApp">
                                <Input 
                                  value={option.wa} 
                                  onChange={(v) => updateOption(i, { wa: v })} 
                                  placeholder="Ex: Olá! Gostaria de solicitar um orçamento."
                                />
                              </Field>
                            ) : (
                              <Field label="Etapa de Destino">
                                <select
                                  value={option.next || "start"}
                                  onChange={(e) => updateOption(i, { next: e.target.value })}
                                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/10 bg-white"
                                >
                                  {Object.entries(NODE_NAMES).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                  ))}
                                </select>
                              </Field>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

        </div>

        {/* Botão de Salvar */}
        <div className="flex justify-end">
          <SaveButton onSave={save} />
        </div>
      </div>
    </div>
  );
}

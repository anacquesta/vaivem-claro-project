import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, Textarea, SectionHeader, Card, CardTitle, ListEditor } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function FleetEditor() {
  const { sections, setSections } = useSite();
  const [data, setData] = useState(sections.fleet);
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    await saveSection('fleet', data);
    setSections(p => ({ ...p, fleet: data }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <SectionHeader title="Frota & Estrutura" description="Tabela de veículos, monitoramento em tempo real e estatísticas." />
      <div className="space-y-6">
        <Card>
          <CardTitle>Cabeçalho</CardTitle>
          <div className="space-y-4">
            <Field label="Badge"><Input value={data.badge} onChange={v => upd('badge', v)} /></Field>
            <Field label="Título"><Input value={data.title} onChange={v => upd('title', v)} /></Field>
            <Field label="Subtítulo"><Textarea value={data.subtitle} onChange={v => upd('subtitle', v)} rows={2} /></Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Tabela de Frota</CardTitle>
          <ListEditor
            items={data.table}
            onChange={items => upd('table', items)}
            defaultItem={{ tipo: 'NOVO', qtd: '1 unidade', cap: '-', destino: 'Nacional', media: '-', rastr: 100 }}
            addLabel="+ Adicionar tipo de veículo"
            renderItem={(item, update) => (
              <div className="grid grid-cols-3 gap-3">
                <Field label="Tipo"><Input value={item.tipo} onChange={v => update({ ...item, tipo: v })} /></Field>
                <Field label="Quantidade"><Input value={item.qtd} onChange={v => update({ ...item, qtd: v })} /></Field>
                <Field label="Capacidade"><Input value={item.cap} onChange={v => update({ ...item, cap: v })} /></Field>
                <Field label="Destino"><Input value={item.destino} onChange={v => update({ ...item, destino: v })} /></Field>
                <Field label="Média de Idade"><Input value={item.media} onChange={v => update({ ...item, media: v })} /></Field>
                <Field label="Rastreado (%)"><Input value={item.rastr} onChange={v => update({ ...item, rastr: Number(v) })} type="number" /></Field>
              </div>
            )}
          />
        </Card>

        <Card>
          <CardTitle>Monitoramento em Tempo Real</CardTitle>
          <ListEditor
            items={data.realtime}
            onChange={items => upd('realtime', items)}
            defaultItem={{ id: 'VHC-0000', route: 'SP → Destino', status: 'Em rota', color: 'bg-vv-steel' }}
            addLabel="+ Adicionar veículo"
            renderItem={(item, update) => (
              <div className="grid grid-cols-2 gap-3">
                <Field label="ID do Veículo"><Input value={item.id} onChange={v => update({ ...item, id: v })} /></Field>
                <Field label="Rota"><Input value={item.route} onChange={v => update({ ...item, route: v })} /></Field>
                <Field label="Status"><Input value={item.status} onChange={v => update({ ...item, status: v })} /></Field>
                <Field label="Cor (classe)"><Input value={item.color} onChange={v => update({ ...item, color: v })} /></Field>
              </div>
            )}
          />
        </Card>

        <Card>
          <CardTitle>Estatísticas (cards abaixo da tabela)</CardTitle>
          <ListEditor
            items={data.stats}
            onChange={items => upd('stats', items)}
            defaultItem={{ value: '0', label: 'Nova estatística' }}
            addLabel="+ Adicionar estatística"
            renderItem={(item, update) => (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Valor"><Input value={item.value} onChange={v => update({ ...item, value: v })} /></Field>
                <Field label="Descrição"><Input value={item.label} onChange={v => update({ ...item, label: v })} /></Field>
              </div>
            )}
          />
        </Card>

        <div className="flex justify-end"><SaveButton onSave={save} /></div>
      </div>
    </div>
  );
}

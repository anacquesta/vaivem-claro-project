import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, Textarea, SectionHeader, Card, CardTitle, ListEditor } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

const ICON_OPTIONS = ['Package', 'Route', 'Truck', 'Settings', 'Star', 'Shield', 'Zap', 'Globe'];

export default function ServicesEditor() {
  const { sections, setSections } = useSite();
  const [data, setData] = useState(sections.services);
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    await saveSection('services', data);
    setSections(p => ({ ...p, services: data }));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Serviços" description="Cards de serviços operacionais." />
      <div className="space-y-6">
        <Card>
          <CardTitle>Cabeçalho da seção</CardTitle>
          <div className="space-y-4">
            <Field label="Badge"><Input value={data.badge} onChange={v => upd('badge', v)} /></Field>
            <Field label="Título"><Input value={data.title} onChange={v => upd('title', v)} /></Field>
            <Field label="Imagem de fundo (URL)" hint="Imagem que aparece no topo da seção">
              <Input value={data.image_url} onChange={v => upd('image_url', v)} placeholder="/frota.jpg" />
            </Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Cards de Serviços</CardTitle>
          <ListEditor
            items={data.items}
            onChange={items => upd('items', items.map((it, i) => ({ ...it, num: String(i + 1).padStart(2, '0') })))}
            defaultItem={{ num: '05', icon: 'Package', title: 'Novo Serviço', desc: '' }}
            addLabel="+ Adicionar serviço"
            renderItem={(item, update) => (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Número"><Input value={item.num} onChange={v => update({ ...item, num: v })} /></Field>
                  <Field label="Ícone (nome Lucide)">
                    <select
                      value={item.icon}
                      onChange={e => update({ ...item, icon: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-vv-blue bg-white"
                    >
                      {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Título"><Input value={item.title} onChange={v => update({ ...item, title: v })} /></Field>
                <Field label="Descrição"><Textarea value={item.desc} onChange={v => update({ ...item, desc: v })} rows={2} /></Field>
              </div>
            )}
          />
        </Card>

        <div className="flex justify-end"><SaveButton onSave={save} /></div>
      </div>
    </div>
  );
}

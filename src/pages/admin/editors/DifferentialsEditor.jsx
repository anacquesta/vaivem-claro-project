import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, Textarea, SectionHeader, Card, CardTitle, ListEditor } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function DifferentialsEditor() {
  const { sections, setSections } = useSite();
  const [data, setData] = useState(sections.differentials);
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    await saveSection('differentials', data);
    setSections(p => ({ ...p, differentials: data }));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Diferenciais" description="Cards que destacam os pontos fortes da empresa." />
      <div className="space-y-6">
        <Card>
          <CardTitle>Cabeçalho</CardTitle>
          <div className="space-y-4">
            <Field label="Badge"><Input value={data.badge} onChange={v => upd('badge', v)} /></Field>
            <Field label="Título (use \n para quebra)"><Input value={data.title} onChange={v => upd('title', v)} /></Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Cards de Diferenciais</CardTitle>
          <ListEditor
            items={data.items}
            onChange={items => upd('items', items)}
            defaultItem={{ metric: '100%', title: 'Novo Diferencial', desc: '' }}
            addLabel="+ Adicionar diferencial"
            renderItem={(item, update) => (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Métrica (destaque)"><Input value={item.metric} onChange={v => update({ ...item, metric: v })} /></Field>
                  <Field label="Título do Card"><Input value={item.title} onChange={v => update({ ...item, title: v })} /></Field>
                </div>
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

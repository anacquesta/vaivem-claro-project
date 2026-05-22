import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, Textarea, SectionHeader, Card, CardTitle, ListEditor } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function AboutEditor() {
  const { sections, setSections } = useSite();
  const [data, setData] = useState(sections.about);
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    await saveSection('about', data);
    setSections(p => ({ ...p, about: data }));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Sobre" description="Seção 'Nossa História' com textos e linha do tempo." />
      <div className="space-y-6">
        <Card>
          <CardTitle>Cabeçalho</CardTitle>
          <div className="space-y-4">
            <Field label="Badge"><Input value={data.badge} onChange={v => upd('badge', v)} /></Field>
            <Field label="Título (use \n para quebra de linha)"><Input value={data.title} onChange={v => upd('title', v)} /></Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Parágrafos</CardTitle>
          <ListEditor
            items={data.paragraphs.map(p => ({ text: p }))}
            onChange={items => upd('paragraphs', items.map(i => i.text))}
            defaultItem={{ text: '' }}
            addLabel="+ Adicionar parágrafo"
            renderItem={(item, update) => (
              <Field label={`Parágrafo`}>
                <Textarea value={item.text} onChange={v => update({ text: v })} rows={3} />
              </Field>
            )}
          />
        </Card>

        <Card>
          <CardTitle>Linha do Tempo</CardTitle>
          <ListEditor
            items={data.milestones}
            onChange={items => upd('milestones', items)}
            defaultItem={{ year: '2026', label: 'Novo Marco', desc: '' }}
            addLabel="+ Adicionar marco"
            renderItem={(item, update) => (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Ano"><Input value={item.year} onChange={v => update({ ...item, year: v })} /></Field>
                  <Field label="Título do Marco"><Input value={item.label} onChange={v => update({ ...item, label: v })} /></Field>
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

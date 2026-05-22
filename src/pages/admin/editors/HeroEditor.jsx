import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, Textarea, SectionHeader, Card, CardTitle, ListEditor } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function HeroEditor() {
  const { sections, setSections } = useSite();
  const [data, setData] = useState(sections.hero);
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    await saveSection('hero', data);
    setSections(p => ({ ...p, hero: data }));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Hero" description="Seção principal do site — primeira coisa que o visitante vê." />

      <div className="space-y-6">
        <Card>
          <CardTitle>Texto principal</CardTitle>
          <div className="space-y-4">
            <Field label="Badge (ex: Conectando destinos)">
              <Input value={data.badge} onChange={v => upd('badge', v)} placeholder="Conectando destinos" />
            </Field>
            <Field label="Título">
              <Input value={data.title} onChange={v => upd('title', v)} placeholder="Movemos\ncargas." />
            </Field>
            <Field label="Destaque (palavra em azul)">
              <Input value={data.highlight} onChange={v => upd('highlight', v)} placeholder="Impulsionamos" />
            </Field>
            <Field label="Subtítulo (após o destaque)">
              <Input value={data.subtitle} onChange={v => upd('subtitle', v)} placeholder="negócios." />
            </Field>
            <Field label="Descrição">
              <Textarea value={data.description} onChange={v => upd('description', v)} rows={3} />
            </Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Botões de ação</CardTitle>
          <div className="space-y-4">
            <Field label="Botão principal (texto)">
              <Input value={data.cta_primary_label} onChange={v => upd('cta_primary_label', v)} />
            </Field>
            <Field label="Botão secundário (texto)">
              <Input value={data.cta_secondary_label} onChange={v => upd('cta_secondary_label', v)} />
            </Field>
            <Field label="Botão secundário (link WhatsApp)">
              <Input value={data.cta_secondary_href} onChange={v => upd('cta_secondary_href', v)} placeholder="https://wa.me/55..." />
            </Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Imagem do Hero</CardTitle>
          <Field label="URL da imagem" hint="Cole a URL da imagem (caminho público ou link externo)">
            <Input value={data.image_url} onChange={v => upd('image_url', v)} placeholder="/caminhao.jpg" />
          </Field>
          {data.image_url && (
            <div className="mt-3 rounded-xl overflow-hidden h-40 bg-slate-100">
              <img src={data.image_url} alt="Preview" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
            </div>
          )}
        </Card>

        <Card>
          <CardTitle>Indicadores de status</CardTitle>
          <ListEditor
            items={sections.status_indicators?.items ?? []}
            onChange={items => setSections(p => ({ ...p, status_indicators: { items } }))}
            defaultItem={{ label: 'Novo indicador', color: 'bg-vv-blue' }}
            addLabel="+ Adicionar indicador"
            renderItem={(item, update) => (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Texto"><Input value={item.label} onChange={v => update({ ...item, label: v })} /></Field>
                <Field label="Cor (classe Tailwind)"><Input value={item.color} onChange={v => update({ ...item, color: v })} placeholder="bg-vv-blue" /></Field>
              </div>
            )}
          />
        </Card>

        <div className="flex justify-end">
          <SaveButton onSave={save} />
        </div>
      </div>
    </div>
  );
}

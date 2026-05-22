import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, SectionHeader, Card, CardTitle, ListEditor } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function NavbarEditor() {
  const { sections, setSections } = useSite();
  const [data, setData] = useState(sections.navbar);
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    await saveSection('navbar', data);
    setSections(p => ({ ...p, navbar: data }));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Navbar" description="Barra de navegação fixa no topo do site." />
      <div className="space-y-6">
        <Card>
          <CardTitle>Logo</CardTitle>
          <Field label="URL do Logo" hint="Caminho público ou URL externa">
            <Input value={data.logo_url} onChange={v => upd('logo_url', v)} placeholder="/logo.png" />
          </Field>
          {data.logo_url && (
            <div className="mt-3 h-12 flex items-center">
              <img src={data.logo_url} alt="Logo preview" className="h-full w-auto object-contain" onError={e => e.target.style.display='none'} />
            </div>
          )}
        </Card>

        <Card>
          <CardTitle>Links de navegação</CardTitle>
          <ListEditor
            items={data.links}
            onChange={links => upd('links', links)}
            defaultItem={{ label: 'Novo Link', href: '#' }}
            addLabel="+ Adicionar link"
            renderItem={(item, update) => (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Texto"><Input value={item.label} onChange={v => update({ ...item, label: v })} /></Field>
                <Field label="Âncora/URL"><Input value={item.href} onChange={v => update({ ...item, href: v })} /></Field>
              </div>
            )}
          />
        </Card>

        <Card>
          <CardTitle>Telefone & CTA</CardTitle>
          <div className="space-y-4">
            <Field label="Telefone exibido"><Input value={data.phone} onChange={v => upd('phone', v)} /></Field>
            <Field label="Link do telefone (WhatsApp)"><Input value={data.phone_href} onChange={v => upd('phone_href', v)} /></Field>
            <Field label="Botão CTA — texto"><Input value={data.cta_label} onChange={v => upd('cta_label', v)} /></Field>
            <Field label="Botão CTA — link/âncora"><Input value={data.cta_href} onChange={v => upd('cta_href', v)} /></Field>
          </div>
        </Card>

        <div className="flex justify-end"><SaveButton onSave={save} /></div>
      </div>
    </div>
  );
}

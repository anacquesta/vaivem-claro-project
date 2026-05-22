import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, SectionHeader, Card, CardTitle, ListEditor } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function FooterEditor() {
  const { sections, setSections } = useSite();
  const [data, setData] = useState(sections.footer);
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    await saveSection('footer', data);
    setSections(p => ({ ...p, footer: data }));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Footer" description="Rodapé do site com links, logotipo, copyright e informações de rodapé." />
      <div className="space-y-6">
        <Card>
          <CardTitle>Identidade & Copyright</CardTitle>
          <div className="space-y-4">
            <Field label="URL do Logotipo"><Input value={data.logo_url} onChange={v => upd('logo_url', v)} /></Field>
            <Field label="Nome da Empresa (Copyright)"><Input value={data.copyright_name} onChange={v => upd('copyright_name', v)} /></Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Contatos de Rodapé</CardTitle>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Telefone de Rodapé"><Input value={data.phone} onChange={v => upd('phone', v)} /></Field>
              <Field label="Link do WhatsApp de Rodapé"><Input value={data.phone_href} onChange={v => upd('phone_href', v)} /></Field>
            </div>
            <Field label="E-mail de Rodapé"><Input value={data.email} onChange={v => upd('email', v)} type="email" /></Field>
            <Field label="Endereço de Rodapé"><Input value={data.address} onChange={v => upd('address', v)} /></Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Links de Navegação</CardTitle>
          <ListEditor
            items={data.nav_links || []}
            onChange={items => upd('nav_links', items)}
            defaultItem={{ label: 'Link', href: '#' }}
            addLabel="+ Adicionar link"
            renderItem={(item, update) => (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Rótulo"><Input value={item.label} onChange={v => update({ ...item, label: v })} /></Field>
                <Field label="URL / Seção (ex: #hero)"><Input value={item.href} onChange={v => update({ ...item, href: v })} /></Field>
              </div>
            )}
          />
        </Card>

        <Card>
          <CardTitle>Serviços Listados</CardTitle>
          <ListEditor
            items={(data.service_links || []).map(s => ({ text: s }))}
            onChange={items => upd('service_links', items.map(i => i.text))}
            defaultItem={{ text: '' }}
            addLabel="+ Adicionar serviço"
            renderItem={(item, update) => (
              <Field label="Nome do Serviço">
                <Input value={item.text} onChange={v => update({ text: v })} />
              </Field>
            )}
          />
        </Card>

        <div className="flex justify-end"><SaveButton onSave={save} /></div>
      </div>
    </div>
  );
}

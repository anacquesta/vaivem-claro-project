import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveSection } from '@/lib/adminApi';
import { Field, Input, Textarea, SectionHeader, Card, CardTitle } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function ContactEditor() {
  const { sections, setSections } = useSite();
  const [data, setData] = useState(sections.contact);
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    await saveSection('contact', data);
    setSections(p => ({ ...p, contact: data }));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Contato" description="Seção 'Fale Conosco' com formulário e informações de contato." />
      <div className="space-y-6">
        <Card>
          <CardTitle>Textos Principais</CardTitle>
          <div className="space-y-4">
            <Field label="Badge"><Input value={data.badge} onChange={v => upd('badge', v)} /></Field>
            <Field label="Título (use \n para quebra de linha)"><Input value={data.title} onChange={v => upd('title', v)} /></Field>
            <Field label="Subtítulo"><Textarea value={data.subtitle} onChange={v => upd('subtitle', v)} rows={2} /></Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Canais de Contato</CardTitle>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Telefone / WhatsApp"><Input value={data.phone} onChange={v => upd('phone', v)} /></Field>
              <Field label="Link do WhatsApp (ex: https://wa.me/...)"><Input value={data.phone_href} onChange={v => upd('phone_href', v)} /></Field>
            </div>
            <Field label="E-mail"><Input value={data.email} onChange={v => upd('email', v)} type="email" /></Field>
            <Field label="Endereço (ex: São Paulo, SP)"><Input value={data.address} onChange={v => upd('address', v)} /></Field>
          </div>
        </Card>

        <div className="flex justify-end"><SaveButton onSave={save} /></div>
      </div>
    </div>
  );
}

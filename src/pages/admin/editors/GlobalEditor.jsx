import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { saveConfig } from '@/lib/adminApi';
import { Field, Input, SectionHeader, Card, CardTitle, ColorInput } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function GlobalEditor() {
  const { globalConfig, setGlobalConfig } = useSite();
  const [data, setData] = useState(globalConfig);

  const updColor = (k, v) => setData(p => ({
    ...p,
    colors: { ...p.colors, [k]: v }
  }));

  const save = async () => {
    await Promise.all([
      saveConfig('colors', data.colors),
      saveConfig('font_primary', data.font_primary),
      saveConfig('font_mono', data.font_mono)
    ]);
    setGlobalConfig(data);
    
    // Inject dynamic CSS variables immediately
    if (data.colors) {
      const styleId = 'vv-dynamic-colors';
      let el = document.getElementById(styleId);
      if (!el) {
        el = document.createElement('style');
        el.id = styleId;
        document.head.appendChild(el);
      }
      const vars = Object.entries(data.colors)
        .map(([k, v]) => `--color-${k}: ${v};`)
        .join('\n');
      const overrides = Object.entries(data.colors)
        .map(([k, v]) => `.text-${k} { color: ${v} !important; } .bg-${k} { background-color: ${v} !important; } .border-${k} { border-color: ${v} !important; }`)
        .join('\n');
      el.textContent = `:root { ${vars} }\n${overrides}`;
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Cores & Fontes" description="Personalize a aparência visual global do site." />
      <div className="space-y-6">
        <Card>
          <CardTitle>Paleta de Cores</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Cor Primária (vv-blue)" hint="Usado em botões principais, links e destaques">
              <ColorInput value={data.colors?.['vv-blue']} onChange={v => updColor('vv-blue', v)} />
            </Field>
            <Field label="Cor Secundária / Escura (vv-navy)" hint="Usado no header/footer e elementos principais escuros">
              <ColorInput value={data.colors?.['vv-navy']} onChange={v => updColor('vv-navy', v)} />
            </Field>
            <Field label="Cor de Destaque Muted (vv-steel)" hint="Usado para textos de corpo secundários e bordas">
              <ColorInput value={data.colors?.['vv-steel']} onChange={v => updColor('vv-steel', v)} />
            </Field>
            <Field label="Cor de Fundo Suave (vv-surface)" hint="Usado como fundo em seções secundárias">
              <ColorInput value={data.colors?.['vv-surface']} onChange={v => updColor('vv-surface', v)} />
            </Field>
          </div>
        </Card>

        <Card>
          <CardTitle>Tipografia (Google Fonts)</CardTitle>
          <div className="space-y-4">
            <Field label="Fonte Principal" hint="Ex: Inter, Roboto, Montserrat, Poppins (deve ser carregada pelo site)">
              <Input value={data.font_primary} onChange={v => setData(p => ({ ...p, font_primary: v }))} />
            </Field>
            <Field label="Fonte Monoespacada" hint="Ex: JetBrains Mono, Fira Code, Share Tech Mono (usada nos números/rótulos)">
              <Input value={data.font_mono} onChange={v => setData(p => ({ ...p, font_mono: v }))} />
            </Field>
          </div>
        </Card>

        <div className="flex justify-end"><SaveButton onSave={save} /></div>
      </div>
    </div>
  );
}

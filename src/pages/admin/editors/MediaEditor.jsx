import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Field, Input, SectionHeader, Card, CardTitle, ListEditor } from '@/components/admin/FormFields';
import SaveButton from '@/components/admin/SaveButton';

export default function MediaEditor() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('media_assets')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setAssets(data || []);
      } catch (err) {
        console.warn('Erro ao carregar media_assets:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadAssets();
  }, []);

  const save = async () => {
    if (!supabase) return;
    try {
      // Deleta todos os registros e reinsere a lista atualizada
      const { error: deleteError } = await supabase
        .from('media_assets')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Deleta tudo
      if (deleteError) throw deleteError;

      if (assets.length > 0) {
        const assetsToInsert = assets.map(a => ({
          name: a.name,
          url: a.url
        }));
        const { error: insertError } = await supabase.from('media_assets').insert(assetsToInsert);
        if (insertError) throw insertError;
      }

      // Recarrega para obter os IDs do banco de dados
      const { data, error: reloadError } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });
      if (reloadError) throw reloadError;
      setAssets(data || []);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SectionHeader title="Gerenciador de Mídia" description="Cadastre e gerencie links externos de imagens (como Google Drive, Imgur, etc.) para usar no site." />
      
      {loading ? (
        <div className="text-slate-500 text-sm">Carregando mídias...</div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardTitle>Imagens Cadastradas</CardTitle>
            <ListEditor
              items={assets}
              onChange={setAssets}
              defaultItem={{ name: 'Nova Imagem', url: '' }}
              addLabel="+ Adicionar URL de Imagem"
              renderItem={(item, update) => (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Nome / Identificador"><Input value={item.name} onChange={v => update({ ...item, name: v })} placeholder="Ex: Caminhão Hero" /></Field>
                    <Field label="URL da Imagem"><Input value={item.url} onChange={v => update({ ...item, url: v })} placeholder="Ex: https://..." /></Field>
                  </div>
                  {item.url && (
                    <div className="mt-2">
                      <p className="text-xs font-mono text-slate-400 mb-1">Visualização:</p>
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="h-20 w-auto rounded-lg border border-slate-200 object-cover max-w-full" 
                        onError={(e) => { e.target.style.display = 'none'; }} 
                      />
                    </div>
                  )}
                </div>
              )}
            />
          </Card>
          
          <div className="flex justify-end">
            <SaveButton onSave={save} />
          </div>
        </div>
      )}
    </div>
  );
}

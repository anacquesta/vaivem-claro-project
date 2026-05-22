import { supabase } from '@/lib/supabase';

/**
 * Salva o conteúdo de uma seção no Supabase.
 * @param {string} sectionId - ex: 'hero', 'about', 'contact'
 * @param {object} content - dados a salvar
 */
export async function saveSection(sectionId, content) {
  if (!supabase) throw new Error('Supabase não configurado');
  const { error } = await supabase
    .from('sections')
    .upsert({ id: sectionId, content, updated_at: new Date().toISOString() }, { onConflict: 'id' });
  if (error) throw error;
}

/**
 * Salva uma chave de configuração global.
 * @param {string} key
 * @param {any} value
 */
export async function saveConfig(key, value) {
  if (!supabase) throw new Error('Supabase não configurado');
  const { error } = await supabase
    .from('site_config')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) throw error;
}

import { useState } from 'react';
import { Check, Loader2, Save, AlertCircle } from 'lucide-react';

export default function SaveButton({ onSave, label = 'Salvar Alterações' }) {
  const [state, setState] = useState('idle'); // idle | saving | saved | error
  const [errMsg, setErrMsg] = useState('');

  const handle = async () => {
    setState('saving');
    setErrMsg('');
    try {
      await onSave();
      setState('saved');
      setTimeout(() => setState('idle'), 2500);
    } catch (e) {
      setErrMsg(e.message);
      setState('error');
      setTimeout(() => setState('idle'), 4000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handle}
        disabled={state === 'saving'}
        className="flex items-center gap-2 bg-vv-blue hover:bg-vv-blue/90 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
      >
        {state === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
        {state === 'saved' && <Check className="w-4 h-4" />}
        {state === 'error' && <AlertCircle className="w-4 h-4" />}
        {state === 'idle' && <Save className="w-4 h-4" />}
        {state === 'saving' ? 'Salvando...' : state === 'saved' ? 'Salvo!' : state === 'error' ? 'Erro' : label}
      </button>
      {state === 'error' && errMsg && (
        <span className="text-red-500 text-xs">{errMsg}</span>
      )}
    </div>
  );
}

/** Reusable field wrappers for admin editors */

export function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/10 transition-all bg-white"
      {...rest}
    />
  );
}

export function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-vv-blue focus:ring-2 focus:ring-vv-blue/10 transition-all bg-white resize-none"
    />
  );
}

export function ColorInput({ value, onChange, label }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value ?? '#000000'}
        onChange={e => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
      />
      <Input value={value} onChange={onChange} placeholder="#000000" />
    </div>
  );
}

export function SectionHeader({ title, description }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-vv-navy">{title}</h1>
      {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children }) {
  return <h2 className="text-base font-semibold text-vv-navy mb-4 pb-3 border-b border-slate-100">{children}</h2>;
}

/** Editable list of items with add/remove */
export function ListEditor({ items, onChange, renderItem, defaultItem, addLabel = '+ Adicionar' }) {
  const add = () => onChange([...items, { ...defaultItem }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, val) => onChange(items.map((it, idx) => idx === i ? val : it));

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 relative group">
          <button
            onClick={() => remove(i)}
            className="absolute top-3 right-3 text-slate-400 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
          {renderItem(item, (val) => update(i, val), i)}
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border-2 border-dashed border-slate-200 hover:border-vv-blue hover:text-vv-blue text-slate-400 rounded-xl py-2.5 text-sm transition-all"
      >
        {addLabel}
      </button>
    </div>
  );
}

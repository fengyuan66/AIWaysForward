import { useEffect, useState } from 'react';
import { safeSrc } from '../../lib/format.js';

// Label above the control (DS forms), optional hint under it.
export function Field({ label, hint, children, wide = false }) {
  return (
    <label className={`field${wide ? ' field--wide' : ''}`}>
      <span className="field__label">{label}</span>
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}

// Image picker: shows the current picture (or the one just chosen) and hands the chosen File to the form,
// which uploads it only when the form is saved.
export function ImageField({ label, current, onPick }) {
  const [preview, setPreview] = useState(null);
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const src = preview ?? safeSrc(current);
  return (
    <Field label={label} hint="JPG, PNG or WebP. It is shrunk to 720px wide before upload." wide>
      <span className="admin__image">
        {src && <img src={src} alt="" width="96" height="96" />}
        <input
          className="field__control"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setPreview(file ? URL.createObjectURL(file) : null);
            onPick(file);
          }}
        />
      </span>
    </Field>
  );
}

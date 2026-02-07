import { useState } from 'react';
import { addTrap } from '../../services/traps';
import { TRAP_TYPES, BAIT_TYPES } from '../../utils/constants';
import type { TrapType } from '../../types';

export default function TrapForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState<TrapType>('snap');
  const [location, setLocation] = useState('');
  const [baitType, setBaitType] = useState('peanut butter');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;

    setSubmitting(true);
    try {
      await addTrap({
        name: name.trim(),
        type,
        location: location.trim(),
        baitType,
        notes: notes.trim(),
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full bg-war-bg border border-war-border rounded px-3 py-2 text-war-text focus:outline-none focus:border-war-amber text-sm';
  const labelClass = 'block text-war-text-dim text-xs uppercase tracking-wider mb-1';

  return (
    <form onSubmit={handleSubmit} className="bg-war-surface border border-war-border rounded-lg p-4 mb-6">
      <h3 className="font-[family-name:var(--font-stencil)] text-war-amber text-lg mb-4">Deploy New Trap</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kitchen Snap #1"
            required
          />
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select className={inputClass} value={type} onChange={(e) => setType(e.target.value as TrapType)}>
            {TRAP_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input
            className={inputClass}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Behind the fridge"
            required
          />
        </div>
        <div>
          <label className={labelClass}>Bait</label>
          <select className={inputClass} value={baitType} onChange={(e) => setBaitType(e.target.value)}>
            {BAIT_TYPES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Notes</label>
          <input
            className={inputClass}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-war-red hover:bg-war-red-glow text-white px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {submitting ? 'Deploying...' : 'Deploy Trap'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-war-text-dim hover:text-war-text px-4 py-2 rounded text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

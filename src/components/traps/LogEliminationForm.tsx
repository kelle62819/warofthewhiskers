import { useState } from 'react';
import { addElimination } from '../../services/eliminations';

export default function LogEliminationForm({
  trapId,
  onClose,
}: {
  trapId: string;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addElimination({ trapId, notes: notes.trim() });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 p-3 bg-war-bg rounded border border-war-red/30">
      <p className="text-war-red text-xs uppercase tracking-wider font-semibold mb-2">Confirm Kill</p>
      <input
        className="w-full bg-war-surface border border-war-border rounded px-3 py-1.5 text-war-text text-sm focus:outline-none focus:border-war-red mb-2"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-war-red hover:bg-war-red-glow text-white px-3 py-1 rounded text-xs font-semibold transition-colors disabled:opacity-50"
        >
          {submitting ? '...' : 'Confirm'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-war-text-dim hover:text-war-text px-3 py-1 rounded text-xs transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

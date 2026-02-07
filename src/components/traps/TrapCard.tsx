import { useState } from 'react';
import { format } from 'date-fns';
import type { Trap, Elimination } from '../../types';
import { updateTrap, deleteTrap } from '../../services/traps';
import { TRAP_TYPES } from '../../utils/constants';
import { useAdmin } from '../../contexts/AdminContext';
import LogEliminationForm from './LogEliminationForm';

export default function TrapCard({
  trap,
  eliminations,
}: {
  trap: Trap;
  eliminations: Elimination[];
}) {
  const { isAdmin } = useAdmin();
  const [showLogForm, setShowLogForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const killCount = eliminations.filter((e) => e.trapId === trap.id).length;
  const typeLabel = TRAP_TYPES.find((t) => t.value === trap.type)?.label ?? trap.type;

  async function handleToggleActive() {
    await updateTrap(trap.id, { isActive: !trap.isActive });
  }

  async function handleDelete() {
    await deleteTrap(trap.id);
  }

  return (
    <div
      className={`bg-war-surface border rounded-lg p-4 ${
        trap.isActive ? 'border-war-border' : 'border-war-border/50 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-war-text">{trap.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="text-xs bg-war-surface-light text-war-text-dim px-2 py-0.5 rounded">
              {typeLabel}
            </span>
            <span className="text-xs bg-war-surface-light text-war-text-dim px-2 py-0.5 rounded">
              {trap.location}
            </span>
            <span className="text-xs bg-war-surface-light text-war-text-dim px-2 py-0.5 rounded">
              {trap.baitType}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-[family-name:var(--font-mono)] text-2xl text-war-red font-bold">
            {killCount}
          </div>
          <div className="text-war-text-dim text-xs">kills</div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3 text-xs text-war-text-dim">
        <span>Deployed {format(trap.dateAdded, 'MMM d')}</span>
        {trap.notes && <span>{trap.notes}</span>}
      </div>

      {isAdmin && (
        <div className="flex gap-2 mt-3">
          {trap.isActive && (
            <button
              onClick={() => setShowLogForm(!showLogForm)}
              className="bg-war-red/20 hover:bg-war-red/30 text-war-red px-3 py-1.5 rounded text-xs font-semibold transition-colors"
            >
              <img src="/mouse-icon.png" alt="" className="w-4 h-4 inline-block mr-1" />
              Log Kill
            </button>
          )}
          <button
            onClick={handleToggleActive}
            className="text-war-text-dim hover:text-war-text px-3 py-1.5 rounded text-xs transition-colors"
          >
            {trap.isActive ? 'Deactivate' : 'Reactivate'}
          </button>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-war-text-dim hover:text-war-red px-3 py-1.5 rounded text-xs transition-colors ml-auto"
            >
              Delete
            </button>
          ) : (
            <div className="flex gap-1 ml-auto">
              <button
                onClick={handleDelete}
                className="text-war-red px-2 py-1.5 rounded text-xs font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-war-text-dim px-2 py-1.5 rounded text-xs"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {showLogForm && (
        <LogEliminationForm trapId={trap.id} onClose={() => setShowLogForm(false)} />
      )}
    </div>
  );
}

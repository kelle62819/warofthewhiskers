import { useState } from 'react';
import { useTraps } from '../hooks/useTraps';
import { useEliminations } from '../hooks/useEliminations';
import TrapForm from '../components/traps/TrapForm';
import TrapCard from '../components/traps/TrapCard';
import TrapLeaderboard from '../components/traps/TrapLeaderboard';

export default function Traps() {
  const { traps, loading: trapsLoading } = useTraps();
  const { eliminations, loading: elimLoading } = useEliminations();
  const [showForm, setShowForm] = useState(false);

  const loading = trapsLoading || elimLoading;
  const activeTraps = traps.filter((t) => t.isActive);
  const inactiveTraps = traps.filter((t) => !t.isActive);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-[family-name:var(--font-stencil)] text-2xl text-war-red">Arsenal</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-war-red hover:bg-war-red-glow text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
        >
          {showForm ? 'Cancel' : '+ Deploy Trap'}
        </button>
      </div>

      {showForm && <TrapForm onClose={() => setShowForm(false)} />}

      {loading ? (
        <p className="text-war-text-dim text-center py-8">Loading arsenal...</p>
      ) : (
        <>
          <TrapLeaderboard traps={traps} eliminations={eliminations} />

          {activeTraps.length === 0 && !showForm && (
            <div className="text-center py-12 text-war-text-dim">
              <p className="text-lg mb-2">No traps deployed</p>
              <p className="text-sm">Click "Deploy Trap" to add your first weapon.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTraps.map((trap) => (
              <TrapCard key={trap.id} trap={trap} eliminations={eliminations} />
            ))}
          </div>

          {inactiveTraps.length > 0 && (
            <>
              <h3 className="text-war-text-dim text-sm uppercase tracking-wider mt-8 mb-3">
                Deactivated
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inactiveTraps.map((trap) => (
                  <TrapCard key={trap.id} trap={trap} eliminations={eliminations} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

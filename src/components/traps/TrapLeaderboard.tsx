import type { Trap, Elimination } from '../../types';

export default function TrapLeaderboard({
  traps,
  eliminations,
}: {
  traps: Trap[];
  eliminations: Elimination[];
}) {
  const ranked = traps
    .map((trap) => ({
      trap,
      kills: eliminations.filter((e) => e.trapId === trap.id).length,
    }))
    .filter((t) => t.kills > 0)
    .sort((a, b) => b.kills - a.kills);

  if (ranked.length === 0) {
    return null;
  }

  return (
    <div className="bg-war-surface border border-war-border rounded-lg p-4 mb-6">
      <h3 className="font-[family-name:var(--font-stencil)] text-war-amber text-lg mb-3">
        Leaderboard
      </h3>
      <div className="space-y-2">
        {ranked.map((entry, i) => (
          <div
            key={entry.trap.id}
            className="flex items-center gap-3 py-2 px-3 rounded bg-war-bg"
          >
            <span
              className={`font-[family-name:var(--font-mono)] text-sm w-6 ${
                i === 0 ? 'text-war-amber' : 'text-war-text-dim'
              }`}
            >
              #{i + 1}
            </span>
            <span className="flex-1 text-sm text-war-text">{entry.trap.name}</span>
            <span className="text-xs text-war-text-dim">{entry.trap.location}</span>
            <span className="font-[family-name:var(--font-mono)] text-war-red font-bold">
              {entry.kills}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

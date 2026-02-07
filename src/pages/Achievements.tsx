import { useTraps } from '../hooks/useTraps';
import { useEliminations } from '../hooks/useEliminations';
import { usePosts } from '../hooks/usePosts';
import { ACHIEVEMENTS, computeStats } from '../utils/achievements';

export default function Achievements() {
  const { traps, loading: trapsLoading } = useTraps();
  const { eliminations, loading: elimLoading } = useEliminations();
  const { posts, loading: postsLoading } = usePosts();

  const loading = trapsLoading || elimLoading || postsLoading;

  if (loading) {
    return <p className="text-war-text-dim text-center py-12">Reviewing service record...</p>;
  }

  const stats = computeStats(traps, eliminations, posts, null);
  const earned = ACHIEVEMENTS.filter((a) => a.check(stats));
  const unearned = ACHIEVEMENTS.filter((a) => !a.check(stats));

  return (
    <div>
      <h2 className="font-[family-name:var(--font-stencil)] text-2xl text-war-red mb-2">Medals of Honor</h2>
      <p className="text-war-text-dim text-sm mb-6">
        {earned.length} of {ACHIEVEMENTS.length} earned
      </p>

      {earned.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {earned.map((a) => (
            <div
              key={a.id}
              className="bg-war-surface border border-war-amber/40 rounded-lg p-4 text-center"
              style={{ boxShadow: '0 0 12px rgba(245, 158, 11, 0.2)' }}
            >
              <div className="text-3xl mb-2">{a.icon}</div>
              <h3 className="text-war-amber font-semibold text-sm">{a.name}</h3>
              <p className="text-war-text-dim text-xs mt-1">{a.description}</p>
            </div>
          ))}
        </div>
      )}

      {unearned.length > 0 && (
        <>
          <h3 className="text-war-text-dim text-sm uppercase tracking-wider mb-3">Locked</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {unearned.map((a) => (
              <div
                key={a.id}
                className="bg-war-surface border border-war-border rounded-lg p-4 text-center opacity-40"
              >
                <div className="text-3xl mb-2 grayscale">{a.icon}</div>
                <h3 className="text-war-text-dim font-semibold text-sm">{a.name}</h3>
                <p className="text-war-text-dim text-xs mt-1">{a.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

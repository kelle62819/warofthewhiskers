import { formatDistanceToNow } from 'date-fns';
import type { Elimination, Post, Trap } from '../../types';

interface ActivityItem {
  id: string;
  type: 'elimination' | 'post';
  timestamp: Date;
  text: string;
}

export default function RecentActivity({
  eliminations,
  posts,
  traps,
}: {
  eliminations: Elimination[];
  posts: Post[];
  traps: Trap[];
}) {
  const trapMap = new Map(traps.map((t) => [t.id, t]));

  const items: ActivityItem[] = [
    ...eliminations.slice(0, 10).map((e) => ({
      id: `e-${e.id}`,
      type: 'elimination' as const,
      timestamp: e.timestamp,
      text: `Kill confirmed${trapMap.get(e.trapId) ? ` — ${trapMap.get(e.trapId)!.name}` : ''}${e.notes ? ` (${e.notes})` : ''}`,
    })),
    ...posts.slice(0, 10).map((p) => ({
      id: `p-${p.id}`,
      type: 'post' as const,
      timestamp: p.timestamp,
      text: p.text.length > 80 ? p.text.slice(0, 80) + '...' : p.text,
    })),
  ]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10);

  if (items.length === 0) {
    return (
      <div className="bg-war-surface border border-war-border rounded-lg p-4 text-center text-war-text-dim text-sm">
        No activity yet. Deploy traps and start the hunt.
      </div>
    );
  }

  return (
    <div className="bg-war-surface border border-war-border rounded-lg p-4">
      <h3 className="font-[family-name:var(--font-stencil)] text-war-amber text-base mb-3">
        Recent Activity
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 py-1.5">
            <span className="text-sm mt-0.5">
              {item.type === 'elimination' ? (
                <img src="/mouse-icon.png" alt="" className="w-5 h-5 inline-block" />
              ) : '\u270D'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-war-text truncate">{item.text}</p>
              <p className="text-xs text-war-text-dim">
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import type { Elimination, Post, Trap } from '../../types';

interface ActivityItem {
  id: string;
  type: 'elimination' | 'post' | 'trap';
  timestamp: Date;
  text: string;
  link: string;
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
      link: '/traps',
    })),
    ...posts.slice(0, 10).map((p) => ({
      id: `p-${p.id}`,
      type: 'post' as const,
      timestamp: p.timestamp,
      text: p.text.length > 80 ? p.text.slice(0, 80) + '...' : p.text,
      link: '/blog',
    })),
    ...traps.slice(0, 10).map((t) => ({
      id: `t-${t.id}`,
      type: 'trap' as const,
      timestamp: t.dateAdded,
      text: `Trap deployed — ${t.name} (${t.location})`,
      link: '/traps',
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
          <Link key={item.id} to={item.link} className="flex items-start gap-3 py-1.5 rounded px-1 -mx-1 hover:bg-war-surface-light transition-colors">
            <span className="text-sm mt-0.5">
              {item.type === 'elimination' ? (
                <img src="/mouse-icon.png" alt="" className="w-5 h-5 inline-block" />
              ) : item.type === 'trap' ? '\u{1FAA4}' : '\u270D'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-war-text truncate">{item.text}</p>
              <p className="text-xs text-war-text-dim">
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

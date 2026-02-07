import { differenceInDays } from 'date-fns';
import type { Trap } from '../../types';

export default function QuickStats({
  traps,
  lastSightingDate,
}: {
  traps: Trap[];
  lastSightingDate: Date | null;
}) {
  const activeTraps = traps.filter((t) => t.isActive).length;
  const totalTraps = traps.length;
  const daysSinceSighting = lastSightingDate
    ? differenceInDays(new Date(), lastSightingDate)
    : null;

  const stats = [
    { label: 'Active Traps', value: activeTraps.toString() },
    { label: 'Total Deployed', value: totalTraps.toString() },
    {
      label: 'Days Since Sighting',
      value: daysSinceSighting !== null ? daysSinceSighting.toString() : '\u2014',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-war-surface border border-war-border rounded-lg px-3 py-3 text-center"
        >
          <div className="font-[family-name:var(--font-mono)] text-war-text text-lg">{stat.value}</div>
          <div className="text-war-text-dim text-xs uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

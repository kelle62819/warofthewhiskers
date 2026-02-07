import { useTraps } from '../hooks/useTraps';
import { useEliminations } from '../hooks/useEliminations';
import { getDailyEliminations, getTrapTypeStats, getBaitStats } from '../services/stats';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const CHART_COLORS = ['#dc2626', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function Stats() {
  const { traps, loading: trapsLoading } = useTraps();
  const { eliminations, loading: elimLoading } = useEliminations();

  const loading = trapsLoading || elimLoading;

  if (loading) {
    return <p className="text-war-text-dim text-center py-12">Gathering intelligence...</p>;
  }

  const dailyData = getDailyEliminations(eliminations);
  const trapTypeData = getTrapTypeStats(traps, eliminations);
  const baitData = getBaitStats(traps, eliminations);

  const noData = eliminations.length === 0;

  return (
    <div className="space-y-8">
      <h2 className="font-[family-name:var(--font-stencil)] text-2xl text-war-red">Intelligence Report</h2>

      {noData ? (
        <div className="text-center py-12 text-war-text-dim">
          <p className="text-lg mb-2">No data yet</p>
          <p className="text-sm">Log some eliminations to see charts.</p>
        </div>
      ) : (
        <>
          {/* Daily eliminations */}
          <div className="bg-war-surface border border-war-border rounded-lg p-4">
            <h3 className="font-[family-name:var(--font-stencil)] text-war-amber text-base mb-4">
              Daily Eliminations
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fill: '#888', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#e5e5e5' }}
                />
                <Bar dataKey="count" fill="#dc2626" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Trap type comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-war-surface border border-war-border rounded-lg p-4">
              <h3 className="font-[family-name:var(--font-stencil)] text-war-amber text-base mb-4">
                By Trap Type
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={trapTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" allowDecimals={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis type="category" dataKey="type" tick={{ fill: '#888', fontSize: 12 }} width={80} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#e5e5e5' }}
                  />
                  <Bar dataKey="kills" fill="#f59e0b" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bait effectiveness */}
            <div className="bg-war-surface border border-war-border rounded-lg p-4">
              <h3 className="font-[family-name:var(--font-stencil)] text-war-amber text-base mb-4">
                By Bait Type
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={baitData}
                    dataKey="kills"
                    nameKey="bait"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name} (${value})`}
                  >
                    {baitData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#e5e5e5' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </>
      )}
    </div>
  );
}

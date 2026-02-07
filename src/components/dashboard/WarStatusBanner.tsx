import type { WarStatus } from '../../types';
import { WAR_STATUSES } from '../../utils/constants';

const statusStyles: Record<WarStatus, string> = {
  ACTIVE: 'border-red-500/50 text-red-500 pulse-red',
  WINNING: 'border-amber-500/50 text-amber-500 pulse-amber',
  LOSING: 'border-red-700/50 text-red-700',
  VICTORY: 'border-green-500/50 text-green-500',
};

export default function WarStatusBanner({ status }: { status: WarStatus }) {
  const statusInfo = WAR_STATUSES.find((s) => s.value === status);
  const style = statusStyles[status];

  return (
    <div className={`border-2 rounded-lg px-4 py-3 text-center ${style}`}>
      <div className="text-xs uppercase tracking-widest text-war-text-dim mb-1">Threat Level</div>
      <div className="font-[family-name:var(--font-stencil)] text-xl">
        {statusInfo?.label ?? status}
      </div>
    </div>
  );
}

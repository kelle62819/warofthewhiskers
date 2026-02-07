import { differenceInDays } from 'date-fns';
import { CAMPAIGN_START_DATE, CAMPAIGN_NAME } from '../../utils/constants';

export default function CampaignTimer() {
  const today = new Date();
  const dayNumber = Math.max(1, differenceInDays(today, CAMPAIGN_START_DATE) + 1);

  return (
    <div className="bg-war-surface border border-war-border rounded-lg px-4 py-3 text-center">
      <div className="font-[family-name:var(--font-mono)] text-war-amber text-lg">
        DAY {dayNumber}
      </div>
      <div className="text-war-text-dim text-xs uppercase tracking-wider">
        {CAMPAIGN_NAME}
      </div>
    </div>
  );
}

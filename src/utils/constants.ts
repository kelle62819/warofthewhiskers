export const CAMPAIGN_START_DATE = new Date('2026-02-08');
export const CAMPAIGN_NAME = 'Operation Clean Sweep';

export const TRAP_TYPES = [
  { value: 'snap', label: 'Snap Trap' },
  { value: 'electronic', label: 'Electronic' },
  { value: 'live', label: 'Live Catch' },
  { value: 'glue', label: 'Glue Board' },
  { value: 'bucket', label: 'Bucket Trap' },
  { value: 'other', label: 'Other' },
] as const;

export const BAIT_TYPES = [
  'peanut butter',
  'cheese',
  'chocolate',
  'seeds',
  'bacon',
  'none',
  'other',
] as const;

export const WAR_STATUSES = [
  { value: 'ACTIVE', label: 'ACTIVE ENGAGEMENT', color: 'text-red-500' },
  { value: 'WINNING', label: 'GAINING GROUND', color: 'text-amber-500' },
  { value: 'LOSING', label: 'UNDER SIEGE', color: 'text-red-700' },
  { value: 'VICTORY', label: 'VICTORY DECLARED', color: 'text-green-500' },
] as const;

export interface Post {
  id: string;
  text: string;
  imageUrl: string | null;
  imagePath: string | null;
  timestamp: Date;
}

export interface Trap {
  id: string;
  name: string;
  type: TrapType;
  location: string;
  baitType: string;
  isActive: boolean;
  dateAdded: Date;
  notes: string;
}

export type TrapType = 'snap' | 'electronic' | 'live' | 'glue' | 'bucket' | 'other';

export interface Elimination {
  id: string;
  trapId: string;
  timestamp: Date;
  notes: string;
}

export interface CampaignConfig {
  campaignStartDate: Date;
  lastSightingDate: Date | null;
  warStatus: WarStatus;
}

export type WarStatus = 'ACTIVE' | 'WINNING' | 'LOSING' | 'VICTORY';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
  totalEliminations: number;
  totalTraps: number;
  uniqueTrapTypes: number;
  maxDailyEliminations: number;
  longestDailyStreak: number;
  daysSinceLastSighting: number | null;
  totalPosts: number;
}

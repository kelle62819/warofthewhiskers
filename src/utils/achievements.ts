import { format, startOfDay, differenceInDays } from 'date-fns';
import type { Achievement, AchievementStats, Trap, Elimination, Post } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Log your first elimination',
    icon: '\u{1F3AF}',
    check: (s) => s.totalEliminations >= 1,
  },
  {
    id: 'serial',
    name: 'Serial Killer',
    description: 'Reach 10 eliminations',
    icon: '\u{1F480}',
    check: (s) => s.totalEliminations >= 10,
  },
  {
    id: 'pest_pro',
    name: 'Pest Control Pro',
    description: 'Reach 25 eliminations',
    icon: '\u{1F3C6}',
    check: (s) => s.totalEliminations >= 25,
  },
  {
    id: 'exterminator',
    name: 'The Exterminator',
    description: 'Reach 50 eliminations',
    icon: '\u{2620}',
    check: (s) => s.totalEliminations >= 50,
  },
  {
    id: 'arsenal',
    name: 'Arsenal',
    description: 'Deploy 5 or more traps',
    icon: '\u{1FAA4}',
    check: (s) => s.totalTraps >= 5,
  },
  {
    id: 'diversified',
    name: 'Diversified Portfolio',
    description: 'Use 3 or more trap types',
    icon: '\u{1F4CA}',
    check: (s) => s.uniqueTrapTypes >= 3,
  },
  {
    id: 'double_kill',
    name: 'Double Kill',
    description: '2 eliminations in one day',
    icon: '\u{26A1}',
    check: (s) => s.maxDailyEliminations >= 2,
  },
  {
    id: 'triple_kill',
    name: 'Triple Kill',
    description: '3 eliminations in one day',
    icon: '\u{1F525}',
    check: (s) => s.maxDailyEliminations >= 3,
  },
  {
    id: 'week_streak',
    name: 'Week of Terror',
    description: 'Eliminations on 7 consecutive days',
    icon: '\u{1F4C5}',
    check: (s) => s.longestDailyStreak >= 7,
  },
  {
    id: 'peace',
    name: 'Peace Time',
    description: 'No sightings for 14 days',
    icon: '\u{1F54A}',
    check: (s) => s.daysSinceLastSighting !== null && s.daysSinceLastSighting >= 14,
  },
  {
    id: 'correspondent',
    name: 'War Correspondent',
    description: 'Write 10 blog posts',
    icon: '\u{1F4DD}',
    check: (s) => s.totalPosts >= 10,
  },
];

export function computeStats(
  traps: Trap[],
  eliminations: Elimination[],
  posts: Post[],
  lastSightingDate: Date | null
): AchievementStats {
  // Max daily eliminations
  const dailyCounts = new Map<string, number>();
  for (const e of eliminations) {
    const key = format(startOfDay(e.timestamp), 'yyyy-MM-dd');
    dailyCounts.set(key, (dailyCounts.get(key) ?? 0) + 1);
  }
  const maxDailyEliminations = dailyCounts.size > 0
    ? Math.max(...dailyCounts.values())
    : 0;

  // Longest daily streak
  const sortedDays = [...dailyCounts.keys()].sort();
  let longestStreak = 0;
  let currentStreak = 0;
  for (let i = 0; i < sortedDays.length; i++) {
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prev = new Date(sortedDays[i - 1]);
      const curr = new Date(sortedDays[i]);
      if (differenceInDays(curr, prev) === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak);
  }

  const uniqueTrapTypes = new Set(traps.map((t) => t.type)).size;

  return {
    totalEliminations: eliminations.length,
    totalTraps: traps.length,
    uniqueTrapTypes,
    maxDailyEliminations,
    longestDailyStreak: longestStreak,
    daysSinceLastSighting: lastSightingDate
      ? differenceInDays(new Date(), lastSightingDate)
      : null,
    totalPosts: posts.length,
  };
}

import { format, eachDayOfInterval, startOfDay } from 'date-fns';
import type { Trap, Elimination } from '../types';
import { CAMPAIGN_START_DATE } from '../utils/constants';

export function getDailyEliminations(eliminations: Elimination[]) {
  if (eliminations.length === 0) return [];

  const today = new Date();
  const days = eachDayOfInterval({ start: CAMPAIGN_START_DATE, end: today });

  const countByDate = new Map<string, number>();
  for (const e of eliminations) {
    const key = format(startOfDay(e.timestamp), 'yyyy-MM-dd');
    countByDate.set(key, (countByDate.get(key) ?? 0) + 1);
  }

  return days.map((day) => {
    const key = format(day, 'yyyy-MM-dd');
    return {
      date: format(day, 'MMM d'),
      count: countByDate.get(key) ?? 0,
    };
  });
}

export function getTrapTypeStats(traps: Trap[], eliminations: Elimination[]) {
  const killsByTrap = new Map<string, number>();
  for (const e of eliminations) {
    killsByTrap.set(e.trapId, (killsByTrap.get(e.trapId) ?? 0) + 1);
  }

  const byType = new Map<string, number>();
  for (const trap of traps) {
    const kills = killsByTrap.get(trap.id) ?? 0;
    byType.set(trap.type, (byType.get(trap.type) ?? 0) + kills);
  }

  return Array.from(byType.entries())
    .map(([type, kills]) => ({ type, kills }))
    .sort((a, b) => b.kills - a.kills);
}

export function getBaitStats(traps: Trap[], eliminations: Elimination[]) {
  const killsByTrap = new Map<string, number>();
  for (const e of eliminations) {
    killsByTrap.set(e.trapId, (killsByTrap.get(e.trapId) ?? 0) + 1);
  }

  const byBait = new Map<string, number>();
  for (const trap of traps) {
    const kills = killsByTrap.get(trap.id) ?? 0;
    byBait.set(trap.baitType, (byBait.get(trap.baitType) ?? 0) + kills);
  }

  return Array.from(byBait.entries())
    .map(([bait, kills]) => ({ bait, kills }))
    .sort((a, b) => b.kills - a.kills);
}


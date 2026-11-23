import { lessons } from '../data/lessons';
import { platformData } from '../data/platforms';
import { portfolioItems } from '../data/finalProject';
import type { CourseState } from './types';

export function localDate(date: Date): string {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

export function learnerAge(state: CourseState): number | null {
  const birthDate = state.profile?.birthDate;
  const today = localDate(new Date());
  if (typeof birthDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate) || birthDate > today) return null;
  return Number(today.slice(0, 4)) - Number(birthDate.slice(0, 4)) - Number(today.slice(5) < birthDate.slice(5));
}

export const lessonPercent = (state: CourseState) => Math.round((state.done.length / lessons.length) * 100);

export const scenariosExplored = (state: CourseState) => Object.keys(state.scenarios).length;

export const platformChecksDone = (state: CourseState) =>
  platformData.reduce((total, platform) => total + (state.platformChecks[platform.name]?.length ?? 0), 0);

export const platformChecksTotal = platformData.reduce((total, platform) => total + platform.checks.length, 0);

/** Readiness for the family conversation: all lessons and all portfolio milestones. */
export const isReadyForReview = (state: CourseState) =>
  state.done.length === lessons.length && state.portfolio.length === portfolioItems.length;

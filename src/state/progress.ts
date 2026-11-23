import { lessons } from '../data/lessons';
import { platformData } from '../data/platforms';
import { agreementFields, portfolioItems } from '../data/finalProject';
import { scenarios } from '../data/scenarios';
import type { CourseState } from './types';

export function localDate(date: Date): string {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

/** Age in whole years from a YYYY-MM-DD date, or null if the date is missing, malformed, or in the future. */
export function ageFromBirthDate(birthDate: unknown, today = localDate(new Date())): number | null {
  if (typeof birthDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate) || birthDate > today) return null;
  return Number(today.slice(0, 4)) - Number(birthDate.slice(0, 4)) - Number(today.slice(5) < birthDate.slice(5));
}

export const learnerAge = (state: CourseState) => ageFromBirthDate(state.profile?.birthDate);

export const lessonPercent = (state: CourseState) => Math.round((state.done.length / lessons.length) * 100);

export const platformChecksDone = (state: CourseState) =>
  platformData.reduce((total, platform) => total + (state.platformChecks[platform.name]?.length ?? 0), 0);

export const platformChecksTotal = platformData.reduce((total, platform) => total + platform.checks.length, 0);

/** Scenarios where the best answer has been chosen at least once (retries allowed). */
export const scenariosSolved = (state: CourseState) =>
  scenarios.filter((scenario, i) => state.labSolved.includes(i) || state.scenarios[i] === scenario.correct).length;

/** Platforms with every investigation checklist item checked. */
export const platformsResearched = (state: CourseState) =>
  platformData.filter((platform) => {
    const checked = state.platformChecks[platform.name] ?? [];
    return platform.checks.every((_, i) => checked.includes(i));
  }).length;

export const PLATFORMS_REQUIRED = 2;

export const agreementDrafted = (state: CourseState) =>
  agreementFields.filter(({ key }) => String(state.agreement[key] ?? '').trim().length > 0).length;

export interface ReadinessItem {
  key: 'lessons' | 'lab' | 'audit' | 'portfolio' | 'agreement';
  label: string;
  done: number;
  needed: number;
  complete: boolean;
  /** Route to the activity, or a section id on the Final Project page. */
  to: string;
}

/**
 * Everything required before the Final Project shows "Ready to review together"
 * (confirmed by the owner, November 2026). The parent still makes the decision.
 */
export function readinessItems(state: CourseState): ReadinessItem[] {
  const firstOpenLesson = lessons.find((l) => !state.done.includes(l.id)) ?? lessons[0];
  const items: Omit<ReadinessItem, 'complete'>[] = [
    { key: 'lessons', label: 'Lessons completed', done: state.done.length, needed: lessons.length, to: `/lessons/${firstOpenLesson.id}` },
    { key: 'lab', label: 'Safety Lab scenarios solved', done: scenariosSolved(state), needed: scenarios.length, to: '/lab' },
    { key: 'audit', label: 'Platforms fully researched', done: platformsResearched(state), needed: PLATFORMS_REQUIRED, to: '/audit' },
    { key: 'portfolio', label: 'Portfolio milestones checked', done: state.portfolio.length, needed: portfolioItems.length, to: 'portfolio' },
    { key: 'agreement', label: 'Agreement sections drafted', done: agreementDrafted(state), needed: agreementFields.length, to: 'agreement' },
  ];
  return items.map((item) => ({ ...item, done: Math.min(item.done, item.needed), complete: item.done >= item.needed }));
}


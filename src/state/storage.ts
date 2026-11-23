import type { CourseState } from './types';

export const storageKey = 'creator-compass-v1';

export function initialState(): CourseState {
  return {
    profile: null,
    done: [],
    reflections: {},
    choices: {},
    scores: {},
    scenarios: {},
    labSolved: [],
    labIndex: 0,
    platform: 0,
    platformChecks: {},
    videoChecks: [],
    portfolio: [],
    agreement: {},
    detective: [],
  };
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Merge saved data over the defaults, like the original app did, but drop
 * fields whose type is wrong so a damaged save or backup cannot crash rendering.
 */
export function mergeSaved(saved: unknown): CourseState {
  const base = initialState();
  if (!isObject(saved)) return base;
  const merged: Record<string, unknown> = { ...base, ...saved };
  for (const [key, fallback] of Object.entries(base)) {
    const value = merged[key];
    if (key === 'profile') {
      if (value !== null && !isObject(value)) merged[key] = null;
    } else if (Array.isArray(fallback)) {
      if (!Array.isArray(value)) merged[key] = fallback;
    } else if (typeof fallback === 'number') {
      if (typeof value !== 'number' || !Number.isFinite(value)) merged[key] = fallback;
    } else if (!isObject(value)) {
      merged[key] = fallback;
    }
  }
  return merged as unknown as CourseState;
}

export function loadState(): CourseState {
  try {
    return mergeSaved(JSON.parse(localStorage.getItem(storageKey) ?? 'null'));
  } catch {
    return initialState();
  }
}

export function saveState(state: CourseState): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    console.warn('Browser storage unavailable', error);
  }
}

/** Throws if storage cannot be cleared, so the caller can show an error. */
export function clearSavedState(): void {
  localStorage.removeItem(storageKey);
}

export function exportBackup(state: CourseState): void {
  const payload = { app: 'Creator Compass', version: 1, exported: new Date().toISOString(), data: state };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'creator-compass-progress.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Parse a version 1 backup file. Throws with a readable message on failure. */
export function parseBackup(text: string): CourseState {
  const obj: unknown = JSON.parse(text);
  if (!isObject(obj) || obj.app !== 'Creator Compass' || obj.version !== 1 || !obj.data) {
    throw new Error('Choose a valid In Frame: Going Public progress backup.');
  }
  const state = mergeSaved(obj.data);
  state.profile ??= {};
  return state;
}

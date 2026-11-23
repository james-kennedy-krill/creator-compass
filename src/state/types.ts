export interface ParentContact {
  name: string;
  email: string;
}

export interface Profile {
  learnerName?: string;
  birthDate?: string;
  /** 'she' | 'he' | 'they' | 'name' | 'other' | '' (not shared). See src/state/pronouns.ts. */
  pronouns?: string;
  /** Free text when `pronouns` is 'other'. */
  pronounsOther?: string;
  /** 'girl' | 'boy' | 'nonbinary' | 'other' | 'no-answer' | '' (not shared). */
  gender?: string;
  /** Free text when `gender` is 'other'. */
  genderOther?: string;
  parents?: ParentContact[];
}

/**
 * Saved course progress. The shape matches the version 1 format stored in
 * localStorage under `creator-compass-v1` and in exported backups.
 * Keys of the Record fields are lesson IDs, scenario indices, or platform names.
 */
export interface CourseState {
  /** null = the profile step has not been shown yet; {} = skipped or cleared. */
  profile: Profile | null;
  done: number[];
  reflections: Record<string, string>;
  choices: Record<string, Record<string, number>>;
  scores: Record<string, { score: number }>;
  scenarios: Record<string, number>;
  /** Scenario indices where the best answer has been chosen at least once. Added after version 1; older saves derive it from `scenarios`. */
  labSolved: number[];
  labIndex: number;
  platform: number;
  platformChecks: Record<string, number[]>;
  videoChecks: number[];
  portfolio: number[];
  agreement: Record<string, string>;
  /** Unused by the current UI; kept so older saves round-trip unchanged. */
  detective: unknown[];
}

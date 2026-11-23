export interface ParentContact {
  name: string;
  email: string;
}

export interface Profile {
  learnerName?: string;
  birthDate?: string;
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
  labIndex: number;
  platform: number;
  platformChecks: Record<string, number[]>;
  videoChecks: number[];
  portfolio: number[];
  agreement: Record<string, string>;
  /** Unused by the current UI; kept so older saves round-trip unchanged. */
  detective: unknown[];
}

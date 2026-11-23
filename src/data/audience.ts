import type { Profile } from '../state/types';
import type { Scenario, ScenarioText } from './types';

/**
 * Which examples and emphasis to show. Derived only from the gender question;
 * "Non-binary", "Something else", "Prefer not to say", and unanswered all use
 * 'general', which covers every emphasis.
 *
 * Rule: variants change examples and emphasis only. Every learner sees every
 * lesson, scenario, and safety step, and completion requirements are the same.
 */
export type Audience = 'general' | 'girl' | 'boy';

export function audienceFor(profile: Profile | null): Audience {
  const gender = profile?.gender;
  return gender === 'girl' || gender === 'boy' ? gender : 'general';
}

/** Text with optional replacements for girls or boys; `general` is the default. */
export type Variants<T> = { general: T } & Partial<Record<Exclude<Audience, 'general'>, T>>;

export const pick = <T,>(variants: Variants<T>, audience: Audience): T =>
  (audience !== 'general' ? variants[audience] : undefined) ?? variants.general;

/** Scenario text for this learner. Options stay in the same order, so saved answers still match. */
export function scenarioText(scenario: Scenario, audience: Audience): ScenarioText {
  const variant = audience !== 'general' ? scenario.variants?.[audience] : undefined;
  return {
    title: variant?.title ?? scenario.title,
    message: variant?.message ?? scenario.message,
    options: variant?.options ?? scenario.options,
    why: variant?.why ?? scenario.why,
  };
}

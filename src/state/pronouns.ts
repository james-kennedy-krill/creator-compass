import type { Profile } from './types';

export const pronounOptions = [
  { value: 'she', label: 'she/her' },
  { value: 'he', label: 'he/him' },
  { value: 'they', label: 'they/them' },
  { value: 'name', label: 'Just use my name' },
  { value: 'other', label: 'Something else' },
] as const;

export const genderOptions = [
  { value: 'girl', label: 'Girl' },
  { value: 'boy', label: 'Boy' },
  { value: 'nonbinary', label: 'Non-binary' },
  { value: 'other', label: 'Something else' },
  { value: 'no-answer', label: 'Prefer not to say' },
] as const;

/**
 * Third-person wording for the learner, used where adults read about them
 * (Parent Guide, parent report). Teen-facing pages address the learner as "you".
 */
export interface LearnerPronouns {
  /** she / he / they / the learner's name */
  subject: string;
  /** her / him / them / the learner's name */
  object: string;
  /** her / his / their / the learner's name + ’s */
  possessive: string;
  /** Pick the verb form that agrees with `subject`: verb('loves', 'love'). */
  verb: (singular: string, plural: string) => string;
}

const sets = {
  she: { subject: 'she', object: 'her', possessive: 'her', plural: false },
  he: { subject: 'he', object: 'him', possessive: 'his', plural: false },
  they: { subject: 'they', object: 'them', possessive: 'their', plural: true },
};

export function learnerPronouns(profile: Profile | null): LearnerPronouns {
  const name = typeof profile?.learnerName === 'string' ? profile.learnerName.trim() : '';
  const choice = profile?.pronouns;
  // Use the learner's name for "use my name" and for custom pronouns, which we
  // can't reliably conjugate. Without a name, fall back to they/them.
  if ((choice === 'name' || choice === 'other') && name) {
    return { subject: name, object: name, possessive: `${name}’s`, verb: (singular) => singular };
  }
  const set = choice === 'she' || choice === 'he' ? sets[choice] : sets.they;
  return { ...set, verb: (singular, plural) => (set.plural ? plural : singular) };
}

/** Text to show next to the learner's name, e.g. "she/her". Empty if not shared. */
export function pronounLabel(profile: Profile | null): string {
  const choice = profile?.pronouns;
  if (choice === 'other') return typeof profile?.pronounsOther === 'string' ? profile.pronounsOther.trim() : '';
  if (choice === 'name') return '';
  return pronounOptions.find((option) => option.value === choice)?.label ?? '';
}

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

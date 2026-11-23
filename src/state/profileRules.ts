import { ageFromBirthDate } from './progress';
import { genderOptions, pronounOptions } from './pronouns';
import type { ParentContact, Profile } from './types';

export const EMAIL_PATTERN = /^[^\s@,;?]+@[^\s@,;?]+\.[^\s@,;?]+$/;

/** Field names match the welcome form's input names. */
export type ProfileField =
  | 'learnerName'
  | 'birthDate'
  | 'pronouns'
  | 'pronounsOther'
  | 'gender'
  | 'genderOther'
  | 'parentName0'
  | 'parentEmail0'
  | 'parentName1'
  | 'parentEmail1';

export type ProfileErrors = Partial<Record<ProfileField, string>>;

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const isOption = (options: readonly { value: string }[], value: unknown) => options.some((o) => o.value === value);

function emailError(email: string): string | undefined {
  if (!email) return 'Add their email so you can send them your parent report.';
  if (!EMAIL_PATTERN.test(email)) return 'That email doesn’t look right. Check for typos (like name@example.com).';
  return undefined;
}

/**
 * Everything the course needs before the learner can continue (owner decision,
 * November 2026). The second parent or guardian is optional, but if any of
 * their details are filled in, both name and a valid email are needed.
 */
export function validateProfile(profile: Profile | null | undefined, today?: string): ProfileErrors {
  const errors: ProfileErrors = {};
  const p = profile ?? {};

  if (!text(p.learnerName)) errors.learnerName = 'Add your first name or a nickname.';

  const birthDate = text(p.birthDate);
  if (!birthDate) errors.birthDate = 'Add your birthday.';
  else if (ageFromBirthDate(birthDate, today) === null) errors.birthDate = 'That date is in the future. Check the year.';

  if (!isOption(pronounOptions, p.pronouns)) errors.pronouns = 'Choose the pronouns we should use, or “Just use my name.”';
  else if (p.pronouns === 'other' && !text(p.pronounsOther)) errors.pronounsOther = 'Type your pronouns, or choose another option.';

  if (!isOption(genderOptions, p.gender)) errors.gender = 'Choose one. “Prefer not to say” is a fine answer.';
  else if (p.gender === 'other' && !text(p.genderOther)) errors.genderOther = 'Describe your gender in your own words, or choose another option.';

  const parents: ParentContact[] = Array.isArray(p.parents) ? p.parents : [];
  const first = { name: text(parents[0]?.name), email: text(parents[0]?.email) };
  if (!first.name) errors.parentName0 = 'Add your parent or guardian’s name.';
  const firstEmail = emailError(first.email);
  if (firstEmail) errors.parentEmail0 = firstEmail;

  const second = { name: text(parents[1]?.name), email: text(parents[1]?.email) };
  if (second.name || second.email) {
    if (!second.name) errors.parentName1 = 'Add their name, or remove this parent or guardian.';
    const secondEmail = emailError(second.email);
    if (secondEmail) errors.parentEmail1 = secondEmail;
  }

  return errors;
}

export const isProfileComplete = (profile: Profile | null | undefined) =>
  Object.keys(validateProfile(profile)).length === 0;

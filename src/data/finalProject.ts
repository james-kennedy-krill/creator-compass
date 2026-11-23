import type { AgreementField, PortfolioItem } from './types';

// Positions and IDs are referenced by saved progress (creator-compass-v1). Do not reorder or renumber without a migration.
export const portfolioItems: PortfolioItem[] = [
  {
    "title": "Creator identity",
    "description": "A safe stage name, bio, and profile image with no identifying details."
  },
  {
    "title": "Safety response plan",
    "description": "What to do about suspicious contact, harassment, a crisis, or account compromise."
  },
  {
    "title": "Cross-platform audit",
    "description": "A current comparison of platform settings and age restrictions."
  },
  {
    "title": "Three practice videos",
    "description": "Film and privately review three short videos that show your talent using the pre-publish checklist."
  },
  {
    "title": "Family creator agreement",
    "description": "Agree on account boundaries, parent involvement, and a first-month review."
  }
];

export const auditChecklist: string[] = [
  "No street signs, school names, team logos, studio schedules, or visible location clues",
  "No address, personal contact details, or revealing metadata in the caption or profile",
  "Background and reflections checked frame-by-frame",
  "Everyone identifiable in the video has agreed to the intended audience",
  "Music/choreography usage follows the platform’s rules and collaborators are credited",
  "Video and caption would be okay to see outside the intended audience",
  "Comments, contacts, reuse, and visibility controls have been reviewed",
  "A trusted adult knows where to turn if harassment or harmful sharing happens"
];

// Agreement answers are keyed by `key`.
export const agreementFields: AgreementField[] = [
  { key: 'purpose', label: 'Why I want to share my talent' },
  { key: 'identity', label: 'My public profile and identity boundaries' },
  { key: 'posting', label: 'Our filming locations, approval process, and posting schedule' },
  { key: 'interactions', label: 'Rules for comments, DMs, strangers, and offers' },
  { key: 'wellbeing', label: 'My screen-time, school, sleep, and mental-health boundaries' },
  { key: 'emergency', label: 'My plan if something goes wrong' },
  { key: 'review', label: 'When we will review or pause the trial' },
];

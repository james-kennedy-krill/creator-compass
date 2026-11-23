import type { Platform } from './types';

// Saved platform checks are keyed by platform name and check index.
export const platformData: Platform[] = [
  {
    "name": "Instagram",
    "short": "Teen Accounts have built-in protections; younger teens need parental permission to loosen certain settings, including some Live protections.",
    "url": "https://about.fb.com/news/2024/09/instagram-teen-accounts/",
    "checks": [
      "Confirm Teen Account and real birthdate",
      "Review public/private account rules and parental approval",
      "Review who can comment, mention, and message",
      "Review remix/reuse and sharing settings",
      "Enable parental supervision where appropriate",
      "Locate block, report, and account security settings"
    ]
  },
  {
    "name": "TikTok",
    "short": "Teen safety features vary by age. Accounts for younger teens default to private, and some contact or download features are restricted.",
    "url": "https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/privacy-and-safety-settings-for-users-under-age-18",
    "checks": [
      "Confirm real age and privacy defaults",
      "Review followers and account discoverability",
      "Review who can comment or contact the account",
      "Check download, Duet, and Stitch availability",
      "Review Family Pairing and time limits",
      "Find safety reporting and authentication settings"
    ]
  },
  {
    "name": "YouTube",
    "short": "YouTube offers supervised teen account options and tools for video visibility, comments, and family oversight.",
    "url": "https://support.google.com/youtube/answer/15252891",
    "checks": [
      "Review channel identity and video visibility",
      "Review Shorts publishing options",
      "Understand comment moderation",
      "Explore Family Center teen supervision",
      "Check location and identifying details before uploads",
      "Find reporting and account protection tools"
    ]
  },
  {
    "name": "Snapchat",
    "short": "Snapchat Public Profiles are generally available starting at age 16, subject to applicable regional rules—not at 14–15.",
    "url": "https://help.snapchat.com/hc/en-us/articles/7012347065876-What-is-a-Public-Profile-on-Snapchat",
    "checks": [
      "Verify the minimum Public Profile age",
      "Review private profile and story audience",
      "Review friend/contact settings",
      "Find Ghost Mode and location-sharing controls",
      "Explore Snapchat Family Center",
      "Understand screenshots, saving, and reporting"
    ]
  }
];

export const platformReviewDate = 'November 2026';

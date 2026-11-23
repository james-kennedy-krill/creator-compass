import type { Scenario } from './types';

// Positions and IDs are referenced by saved progress (creator-compass-v1). Do not reorder or renumber without a migration.
export const scenarios: Scenario[] = [
  {
    "title": "The “talent scout”",
    "message": "Hey! I run a dance agency. Your videos are amazing. We have a private casting call—send your age, city, and a video in leggings. Please keep this between us for now.",
    "options": [
      "Send the details; the account looks professional.",
      "Stop, do not send private content, and ask a parent to verify the organization independently.",
      "Move to another app to ask for more details."
    ],
    "correct": 1,
    "why": "Flattery, a request for personal details, a change in content, and secrecy are all red flags. A legitimate opportunity for a minor must be independently verified and involve a trusted adult."
  },
  {
    "title": "The background clue",
    "message": "You filmed a great routine. In the reflection behind you, there is a sign showing your studio name. Your caption mentions the weekly class time.",
    "options": [
      "Publish; the clues are probably too small to notice.",
      "Only remove the location tag.",
      "Edit or reshoot to remove identifying details, then review the whole frame and caption."
    ],
    "correct": 2,
    "why": "Small details can be combined. Fix the video and the caption; removing only the location tag does not erase the studio sign or schedule."
  },
  {
    "title": "The comment pile-on",
    "message": "A harmless dance video gets popular, and several strangers leave comments about your body. One asks for another video filmed from a different angle.",
    "options": [
      "Block/report, limit or turn off comments, and tell a parent.",
      "Make the requested video to change the subject.",
      "Argue with every commenter."
    ],
    "correct": 0,
    "why": "She is never obligated to engage with or accommodate sexualized attention. Use safety controls and trusted support."
  },
  {
    "title": "A video goes viral",
    "message": "You woke up to 120,000 views. Your friends are excited, but you feel anxious and want to check your phone during class.",
    "options": [
      "Stay online; you must reply while the algorithm is promoting you.",
      "Pause notifications, stick to your routines, and discuss how you feel with someone you trust.",
      "Post more personal content immediately to maintain the momentum."
    ],
    "correct": 1,
    "why": "Views are not an emergency. You can pause the app, protect sleep and school, and make thoughtful decisions later."
  },
  {
    "title": "The “secret” threat",
    "message": "An account claims to have made an intimate AI fake of you and says it will share the image unless you pay money. It tells you not to tell anyone.",
    "options": [
      "Pay to keep it quiet.",
      "Send a real image to prove the AI fake is wrong.",
      "Stop contact, tell a trusted adult immediately, and use reporting/support resources."
    ],
    "correct": 2,
    "why": "Blackmail is not a contract. Do not pay or send content. Seek help and use platform reporting, NCMEC’s CyberTipline, and applicable image-removal tools."
  },
  {
    "title": "The duet with a friend",
    "message": "You and a friend made a great dance video together. Your friend says she is comfortable keeping it in a private group but not posting publicly.",
    "options": [
      "Respect her decision; keep it private or make a version without her.",
      "Post publicly with comments turned off.",
      "Post and remove it later if she complains."
    ],
    "correct": 0,
    "why": "Consent includes where and how something is shared. A public audience is different from a private one."
  }
];

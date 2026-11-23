import type { Scenario } from './types';

// Positions and IDs are referenced by saved progress (creator-compass-v1). Do not reorder or renumber without a migration.
export const scenarios: Scenario[] = [
  {
    "title": "The “talent scout”",
    "message": "Hey! I run a dance agency. Your videos are amazing. We have a private casting call—send your age, city, and a video in something more revealing. Please keep this between us for now.",
    "options": [
      "Send the details; the account looks professional.",
      "Stop, do not send private content, and ask a parent to verify the organization independently.",
      "Move to another app to ask for more details."
    ],
    "correct": 1,
    "why": "Flattery, a request for personal details, a change in content, and secrecy are all red flags. A legitimate opportunity for a minor must be independently verified and involve a trusted adult.",
    "variants": {
      "girl": {
        "message": "Hey! I run a dance agency. Your videos are amazing. We have a private casting call—send your age, city, and a video in leggings. Please keep this between us for now."
      },
      "boy": {
        "message": "Hey! I run a dance agency. Your videos are amazing. We have a private casting call—send your age, city, and a shirtless video. Please keep this between us for now."
      }
    }
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
    "why": "You are never obligated to engage with or accommodate sexualized attention. Use safety controls and trusted support."
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
    "message": "You and a friend made a great dance video together. Your friend says they’re comfortable keeping it in a private group but not posting publicly.",
    "options": [
      "Respect their decision; keep it private or make a version without them.",
      "Post publicly with comments turned off.",
      "Post and remove it later if they complain."
    ],
    "correct": 0,
    "why": "Consent includes where and how something is shared. A public audience is different from a private one.",
    "variants": {
      "girl": {
        "message": "You and a friend made a great dance video together. Your friend says she is comfortable keeping it in a private group but not posting publicly.",
        "options": [
          "Respect her decision; keep it private or make a version without her.",
          "Post publicly with comments turned off.",
          "Post and remove it later if she complains."
        ]
      },
      "boy": {
        "message": "You and a friend made a great dance video together. Your friend says he is comfortable keeping it in a private group but not posting publicly.",
        "options": [
          "Respect his decision; keep it private or make a version without him.",
          "Post publicly with comments turned off.",
          "Post and remove it later if he complains."
        ]
      }
    }
  },
  {
    "title": "The fast “crush”",
    "message": "An account you don’t know—a cute teen who says they go to a nearby school—has been flirting with you all evening. They sent a private photo first and keep asking for one back. “It’s only fair,” they say.",
    "options": [
      "Send one back; they sent theirs first.",
      "Stop replying, block and report the account, and tell a trusted adult.",
      "Send a photo that doesn’t show your face."
    ],
    "correct": 1,
    "why": "This is how financial sextortion often starts: fast flirting, a photo sent first, and pressure to “make it even.” That first photo is usually stolen. Once an image is sent, threats and demands for money typically follow. You can simply leave. Block, report, and talk to someone you trust. If you’ve already sent something, don’t pay. Keep the messages and get help right away; you are not in trouble.",
    "variants": {
      "girl": {
        "message": "A guy you don’t know—his profile says he’s 16 and goes to a nearby school—has been flirting with you all evening. He sent a private photo first and keeps asking for one back. “It’s only fair,” he says.",
        "options": [
          "Send one back; he sent his first.",
          "Stop replying, block and report the account, and tell a trusted adult.",
          "Send a photo that doesn’t show your face."
        ]
      },
      "boy": {
        "message": "A girl you don’t know—her profile says she’s 16 and goes to a nearby school—has been flirting with you all evening. She sent a private photo first and keeps asking for one back. “It’s only fair,” she says.",
        "options": [
          "Send one back; she sent hers first.",
          "Stop replying, block and report the account, and tell a trusted adult.",
          "Send a photo that doesn’t show your face."
        ],
        "why": "This is how financial sextortion usually starts, and it targets teen boys more than anyone else: fast flirting, a photo sent first, and pressure to “make it even.” That first photo is usually stolen, and the “girl” is often an adult scammer. Once an image is sent, threats and demands for money typically follow. You can simply leave. Block, report, and talk to someone you trust. If you’ve already sent something, don’t pay. Keep the messages and get help right away; you are not in trouble."
      }
    }
  }
];

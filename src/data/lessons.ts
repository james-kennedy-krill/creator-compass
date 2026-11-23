import type { Lesson } from './types';

// Positions and IDs are referenced by saved progress (creator-compass-v1). Do not reorder or renumber without a migration.
export const lessons: Lesson[] = [
  {
    "id": 1,
    "phase": "DISCOVER",
    "duration": "20–30 min",
    "title": "When you hit publish",
    "subtitle": "What happens after a video leaves your phone?",
    "why": "A public video can travel far beyond the people you imagined watching it.",
    "sections": [
      {
        "title": "Publishing is a handoff",
        "body": "When you post a video of your work publicly, you give other people the chance to watch, copy, screen-record, comment on, remix, or share it. A private account limits the audience, but someone who can see a post may still capture it. Deleting your original doesn't guarantee all copies disappear."
      },
      {
        "title": "The ripple effect",
        "body": "Picture a performance clip posted on Friday. A friend shares it. Someone from another school sends a screen recording in a group chat. A fan account reposts a shortened version. Each action creates a new audience. Going viral can be exciting, uncomfortable, or both—and you may not control which part of your video travels."
      },
      {
        "title": "Future-you gets a vote",
        "body": "Think beyond tonight's views. Would you be comfortable with a coach, teacher, future employer, or unfamiliar adult seeing the clip? That doesn't mean you must be perfect. It means publishing is a deliberate choice, not an automatic next step after filming."
      }
    ],
    "takeaway": "You can own your creative choices even when you cannot control every copy.",
    "mission": "Describe three ways a public video of your work might reach people you did not intend, and one reason you might decide not to post a video.",
    "questions": [
      {
        "prompt": "What changes when a video becomes public?",
        "options": [
          "Only your followers can copy it",
          "Someone outside your intended audience may save or repost it",
          "Deleting it will remove all copies"
        ],
        "answer": 1,
        "explanation": "People can record or share public posts outside your account."
      },
      {
        "prompt": "A video gets reposted without permission. What is the most accurate statement?",
        "options": [
          "Deleting your original definitely deletes the repost",
          "You can always stop all downloads",
          "You can report misuse, but copies may remain"
        ],
        "answer": 2,
        "explanation": "Reporting can help, but complete removal is not guaranteed."
      },
      {
        "prompt": "Which is a good pre-publish question?",
        "options": [
          "Will this get the most likes?",
          "Would I be okay with an unexpected audience seeing this?",
          "Did I post quickly enough?"
        ],
        "answer": 1,
        "explanation": "Consider the audience and your comfort, not just performance."
      }
    ]
  },
  {
    "id": 2,
    "phase": "DISCOVER",
    "duration": "25–35 min",
    "title": "Protect your real-world identity",
    "subtitle": "The tiny clues that add up to a big picture.",
    "why": "A stranger may learn a lot without you ever typing your address.",
    "sections": [
      {
        "title": "Privacy is a puzzle",
        "body": "A studio logo on a wall, a school sweatshirt, a location tag, an event poster, and a repeated class time may each seem harmless. Together, they can reveal where you spend time and when. The same is true of reflections, street signs, windows, and background conversation."
      },
      {
        "title": "Separate public creator from private person",
        "body": "Use a creative handle that doesn't include your full name, school, birthday, or location. A public bio can talk about what you create and what you’re working toward without saying where you practice. Keep your personal friends account separate from any creator presence, and review what those accounts reveal about each other."
      },
      {
        "title": "Film like a detective",
        "body": "Before you post, pause the video at random moments. Look behind you. Listen to the audio. Check captions, hashtags, and tags. Avoid filming around your home, your school, or recognizable everyday routes. Ask people in the background for permission—and remove identifiable clips when they say no."
      }
    ],
    "takeaway": "The safest personal detail is often the one you never publish.",
    "mission": "Invent a fictional creator profile. Write a safe username, a two-sentence bio, and five things the profile should never reveal. Do not enter your own identifying information here.",
    "questions": [
      {
        "prompt": "Which set of details is most concerning?",
        "options": [
          "A creative interest and a favorite song",
          "Studio logo, regular class time, and school name",
          "A neutral background and a stage name"
        ],
        "answer": 1,
        "explanation": "Location and schedule clues can be combined."
      },
      {
        "prompt": "What makes a good creator username?",
        "options": [
          "Full legal name plus school",
          "Street name and birth year",
          "A memorable stage name without identifying details"
        ],
        "answer": 2,
        "explanation": "Separate your public creative identity from private details."
      },
      {
        "prompt": "What should you check before uploading a video of your work?",
        "options": [
          "Only how the video looks",
          "Background, audio, captions, and location clues",
          "Only whether it has enough hashtags"
        ],
        "answer": 1,
        "explanation": "Clues appear in many places—not just your caption."
      }
    ]
  },
  {
    "id": 3,
    "phase": "DEFEND",
    "duration": "30–40 min",
    "title": "Strangers, scams & manipulation",
    "subtitle": "Recognize pressure before it becomes a problem.",
    "why": "Manipulation often starts with friendliness, compliments, or a too-good-to-be-true offer.",
    "sections": [
      {
        "title": "Nice is not the same as safe",
        "body": "A stranger may sound encouraging or claim to be a fellow creator, agent, photographer, or brand representative. Their profile, follower count, or professional-looking website does not verify their identity. Trust is earned through independently verifiable information—not praise."
      },
      {
        "title": "The warning-sign ladder",
        "body": "Watch for requests to move a conversation to a private app, share your age or location, send a private photo or video, keep the conversation secret, or meet someone alone. These requests can arrive slowly, one small step at a time. Adults who want to work legitimately with minors should welcome appropriate guardian involvement."
      },
      {
        "title": "Boundaries don't need a debate",
        "body": "You do not owe strangers replies, explanations, pictures, loyalty, or kindness at the expense of your safety. If something feels wrong, stop responding. Use platform blocking and reporting tools; if there is manipulation, sexual content, or threats, preserve safe evidence and bring a trusted adult into the situation."
      }
    ],
    "takeaway": "Attention is not trust, and secrecy is a warning sign.",
    "mission": "Write a three-sentence response plan for a message offering a sponsorship and asking to switch to a private chat. Include how you would verify the opportunity with an adult.",
    "questions": [
      {
        "prompt": "A stranger says “Don’t tell your parents about this opportunity.” You should:",
        "options": [
          "Keep the opportunity secret",
          "Stop and involve a trusted adult",
          "Give them a chance to explain in private"
        ],
        "answer": 1,
        "explanation": "Secrecy around minors is a serious warning sign."
      },
      {
        "prompt": "A large follower count proves an account is:",
        "options": [
          "Real and safe",
          "Officially approved",
          "Neither—identity must be verified independently"
        ],
        "answer": 2,
        "explanation": "Follower numbers can be misleading or fake."
      },
      {
        "prompt": "If you are uncomfortable with a message, you:",
        "options": [
          "Must reply politely",
          "Can stop engaging, block, report, and ask for help",
          "Should share more information to clarify"
        ],
        "answer": 1,
        "explanation": "You owe strangers no response."
      }
    ]
  },
  {
    "id": 4,
    "phase": "DEFEND",
    "duration": "25–35 min",
    "title": "Your image. Your boundaries.",
    "subtitle": "Sexualization, unauthorized edits & AI misuse.",
    "why": "Other people are responsible for how they treat you and your work.",
    "sections": [
      {
        "title": "When comments cross a line",
        "body": "Sharing your talent does not give anyone permission to sexualize you. Unwanted remarks, requests for private content, or requests to change a performance for someone's gratification are inappropriate. You do not need to defend your choices to strangers."
      },
      {
        "title": "Images can be misused",
        "body": "People can crop, stitch, miscaption, or edit a clip, including with AI tools. Some manipulated images may falsely suggest something you never did. You can reduce exposure with careful sharing controls, but no platform promises complete protection from recording or misuse."
      },
      {
        "title": "Respond, don’t negotiate",
        "body": "If someone sexualizes your content, do not argue with them. Use comment filters, block and report features, and tell a trusted adult. If someone threatens to circulate intimate imagery or demands images or money, do not comply or pay; get immediate help. Do not forward or download sexual images of minors while seeking assistance."
      }
    ],
    "takeaway": "It is never your responsibility to manage an adult stranger’s inappropriate behavior.",
    "mission": "Write a plan for what you would do if a stranger made a sexual comment about a video of your work or altered your video in a harmful way.",
    "questions": [
      {
        "prompt": "Who is responsible for an adult making a sexual comment about a teen creator?",
        "options": [
          "The creator for posting",
          "The adult making the comment",
          "The friends who watched the video"
        ],
        "answer": 1,
        "explanation": "The person making inappropriate comments is responsible."
      },
      {
        "prompt": "Someone threatens to share a sexualized fake image of you. What first?",
        "options": [
          "Send money to make it stop",
          "Keep it secret",
          "Tell a trusted adult, stop engaging, and report the threat"
        ],
        "answer": 2,
        "explanation": "You deserve help immediately; do not pay or comply."
      },
      {
        "prompt": "Disabling downloads means:",
        "options": [
          "Nobody can ever record your video",
          "Some saving methods may be limited, but screen recording can still happen",
          "All copies disappear"
        ],
        "answer": 1,
        "explanation": "Settings reduce some risk; they do not eliminate it."
      }
    ]
  },
  {
    "id": 5,
    "phase": "DEFEND",
    "duration": "20–30 min",
    "title": "Algorithms, likes & self-worth",
    "subtitle": "Create for joy, not just numbers.",
    "why": "Platforms are designed to hold attention; that does not make their metrics a fair score of you.",
    "sections": [
      {
        "title": "The number is not the meaning",
        "body": "Views vary with timing, recommendations, trends, luck, and many factors you cannot control. A video you spent weeks getting right may reach ten people. A silly clip may reach thousands. Neither number measures your skill, character, body, or value."
      },
      {
        "title": "The pressure trap",
        "body": "When attention feels rewarding, you may be tempted to post more often, imitate trends you dislike, or reveal more personal details. Notice when creating starts feeling like obligation. You can choose a posting schedule, take a break, and keep some of what you make just for yourself."
      },
      {
        "title": "Protect the art",
        "body": "Choose goals that you can control: learning a new technique, making a thoughtful edit, trying a new style, collaborating with permission, or enjoying the process. Decide in advance how you’ll respond to harsh criticism and what boundaries will protect school, sleep, and relationships."
      }
    ],
    "takeaway": "A low-view video does not make you less talented. A viral video does not make you more valuable.",
    "mission": "Write three non-numerical creative goals. Then explain how you would respond if a video you loved received almost no attention.",
    "questions": [
      {
        "prompt": "Which goal is fully within your control?",
        "options": [
          "Getting 10,000 likes",
          "Improving one difficult transition",
          "Going viral by Friday"
        ],
        "answer": 1,
        "explanation": "Process goals build skill and enjoyment regardless of metrics."
      },
      {
        "prompt": "A great video gets very few views. That means:",
        "options": [
          "It failed creatively",
          "You should post something more provocative",
          "Views cannot measure the quality of your work"
        ],
        "answer": 2,
        "explanation": "Reach is not a reliable measure of your worth or artistry."
      },
      {
        "prompt": "A healthy response to feeling pressured to post is:",
        "options": [
          "Take a break and reassess goals",
          "Post twice as often automatically",
          "Compare your body with popular creators"
        ],
        "answer": 0,
        "explanation": "A break can restore enjoyment and perspective."
      }
    ]
  },
  {
    "id": 6,
    "phase": "BUILD",
    "duration": "30–45 min",
    "title": "Security & platform controls",
    "subtitle": "Know the settings; understand their limits.",
    "why": "Real safety requires settings, habits, and support—not one magic toggle.",
    "sections": [
      {
        "title": "Lock down the account",
        "body": "Use a unique strong password or passkey, turn on multi-factor authentication when offered, and secure the recovery email or phone. Never share login codes with someone claiming to be a recruiter or support agent. Be cautious with unfamiliar links and connected apps."
      },
      {
        "title": "Map your controls",
        "body": "On every platform, find: account visibility, who can comment, who can contact you, who can tag or mention you, whether clips can be downloaded/remixed, location visibility, block/report tools, and parental supervision. Some features may not be available to your age group. Do not falsify your age to bypass safeguards."
      },
      {
        "title": "Settings change",
        "body": "Instagram, TikTok, YouTube, and Snapchat regularly change teen features. A course cannot replace checking current in-app settings with a parent or guardian. An app limiting downloads or DMs does not make a public post private. Start with the most restrictive practical settings."
      }
    ],
    "takeaway": "Know what each setting does—and what it cannot prevent.",
    "mission": "Use the Platform Audit section of this course to research safety tools on at least two apps. Write which app feels safest for a first limited trial and why.",
    "questions": [
      {
        "prompt": "Which provides the strongest account protection?",
        "options": [
          "Using the same password everywhere",
          "Unique password/passkey and multi-factor authentication",
          "Sharing a password with a helpful follower"
        ],
        "answer": 1,
        "explanation": "Strong authentication reduces account takeover risk."
      },
      {
        "prompt": "If a platform disables video downloads, then:",
        "options": [
          "Screen recording is impossible",
          "Public videos are guaranteed private",
          "People may still capture or share what they can view"
        ],
        "answer": 2,
        "explanation": "Platform controls do not prevent every form of copying."
      },
      {
        "prompt": "An age-restricted feature seems useful. You should:",
        "options": [
          "Enter an older birthdate",
          "Use your real age and respect the rule",
          "Use a stranger’s account"
        ],
        "answer": 1,
        "explanation": "Age protections should not be bypassed."
      }
    ]
  },
  {
    "id": 7,
    "phase": "BUILD",
    "duration": "25–35 min",
    "title": "Be a creator people can trust",
    "subtitle": "Consent, credit, boundaries & opportunities.",
    "why": "Being a good creator is about how you treat people, not just what you post.",
    "sections": [
      {
        "title": "Other people own their choices too",
        "body": "Ask before posting friends, classmates, or collaborators, even when the video seems harmless. Agree where a collaboration can be shared and whether collaborators can later request removal. Avoid publishing identifiable background people without permission."
      },
      {
        "title": "Music and choreography matter",
        "body": "A song being available in an app does not automatically mean you can use it in every context or on every platform. Permissions and licensing can differ for personal, commercial, and sponsored posts. Credit original creators and follow each platform’s current music policies."
      },
      {
        "title": "Opportunities deserve scrutiny",
        "body": "Watch for fake sponsorships, “ambassador” fees, requests to purchase something to qualify, account verification scams, and unsolicited links. Genuine business relationships involving a minor should be reviewed with a parent or guardian. Keep public and private contact channels separate."
      }
    ],
    "takeaway": "Respect consent, follow the rules, and protect your future options.",
    "mission": "Plan three videos that show your talent and could be shared safely. For each, record the location type, who appears, whether consent is needed, and whether you have permission to use any music or clips you include.",
    "questions": [
      {
        "prompt": "A friend appears clearly in your video but asks not to be posted. You should:",
        "options": [
          "Post because you filmed it",
          "Edit or reshoot rather than posting them",
          "Post for just one day"
        ],
        "answer": 1,
        "explanation": "Their consent matters."
      },
      {
        "prompt": "A popular song inside an app means:",
        "options": [
          "It is licensed for all uses on all platforms",
          "You own the song",
          "You still need to follow the platform’s usage rules"
        ],
        "answer": 2,
        "explanation": "Music use can depend on platform and context."
      },
      {
        "prompt": "A “brand ambassador” asks for a fee and your home address. Best move?",
        "options": [
          "Pay quickly",
          "Have a parent help verify independently; share nothing yet",
          "Reply with your school instead"
        ],
        "answer": 1,
        "explanation": "Unexpected payments and personal information requests can indicate scams."
      }
    ]
  },
  {
    "id": 8,
    "phase": "RESPOND",
    "duration": "30–40 min",
    "title": "When something goes wrong",
    "subtitle": "You don’t have to handle a crisis alone.",
    "why": "A practiced response plan makes it easier to ask for help quickly.",
    "sections": [
      {
        "title": "The four-step response",
        "body": "When there is harassment, impersonation, threats, doxxing, or suspicious contact: (1) stop engaging; (2) tell a trusted adult; (3) preserve appropriate evidence, such as usernames, message details, and ordinary screenshots; (4) use platform report/block tools and get additional help as needed. If there is immediate danger, contact emergency services."
      },
      {
        "title": "Blackmail is not a negotiation",
        "body": "If someone threatens to share intimate imagery or demands money or more images, do not pay, do not send anything else, and do not keep it secret. Get help from a parent or another trusted adult. NCMEC’s CyberTipline can receive reports of suspected child sexual exploitation. Take It Down can help limit circulation of eligible intimate imagery made before age 18 on participating platforms."
      },
      {
        "title": "Your help plan includes no shame",
        "body": "People sometimes hide problems because they fear losing their phone or disappointing parents. Agree in advance: asking for help is always the right move. Adults can respond calmly and address safety first. If one adult is unavailable, choose another trusted adult, a counselor, or an appropriate local service."
      }
    ],
    "takeaway": "The right first move in a frightening situation is to get help—not to hide it.",
    "mission": "Write your personal response plan using role labels (parent, counselor, trusted adult) rather than names or contact details. Include what you would do if your first trusted adult was unavailable.",
    "questions": [
      {
        "prompt": "Someone threatens to release an intimate image unless you send money. What should you do?",
        "options": [
          "Pay immediately",
          "Stop engaging and tell a trusted adult right away",
          "Send one more image"
        ],
        "answer": 1,
        "explanation": "Do not pay or comply; get help and report the threat."
      },
      {
        "prompt": "Which is the best evidence approach?",
        "options": [
          "Forward sexual images of minors to friends",
          "Keep safe records of usernames/messages and ask an adult for guidance; don’t download intimate imagery",
          "Delete all clues before reporting"
        ],
        "answer": 1,
        "explanation": "Do not circulate intimate imagery; preserve safe contextual evidence."
      },
      {
        "prompt": "You worry you made a mistake online. What is still true?",
        "options": [
          "You should handle it alone",
          "Help is only for perfect behavior",
          "You deserve support and can tell a trusted adult"
        ],
        "answer": 2,
        "explanation": "Safety matters more than embarrassment."
      }
    ]
  }
];

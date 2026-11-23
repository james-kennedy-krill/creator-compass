import type { Variants } from './audience';

export interface Spotlight {
  title: string;
  body: string;
}

/**
 * Extra emphasis shown inside a lesson, keyed by lesson ID. Each variant must
 * carry the same safety steps; only the framing and examples change.
 *
 * Lesson 8 sextortion guidance checked against FBI and NCMEC pages, November 2026:
 * https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/sextortion/financially-motivated-sextortion
 * https://www.missingkids.org/theissues/sextortion
 */
export const spotlights: Record<number, Variants<Spotlight>> = {
  4: {
    general: {
      title: 'It can happen to anyone',
      body: 'Sexual comments and requests reach creators of every gender. Sometimes they’re about bodies, costumes, or camera angles. Sometimes they’re disguised as jokes, dares, or “compliments,” or as pressure to film in less clothing. Whatever form they take, they’re inappropriate. You can block, report, and tell a trusted adult.',
    },
    girl: {
      title: 'What this can look like',
      body: 'Comments about your body or costume, requests for a “different angle,” or messages asking for a private version of a routine. They can come from accounts that seem friendly or even professional. None of it is a compliment you have to accept. You can block, report, and tell a trusted adult.',
    },
    boy: {
      title: 'Boys get these comments too',
      body: 'Sexual comments aimed at boys are often framed as jokes, dares, or “compliments,” or as pressure to film shirtless or show more. Some people assume boys won’t mind or won’t tell anyone. It’s just as inappropriate when it happens to you. You can block, report, and tell a trusted adult.',
    },
  },
  8: {
    general: {
      title: 'Know this scam: financial sextortion',
      body: 'Someone you don’t know, often a fake account posing as a teen, flirts fast and asks for a private photo. As soon as one is sent, they demand money or gift cards and threaten to share it with your friends and family. Teen boys are targeted most often, but it can happen to anyone. Don’t pay, because paying rarely makes it stop. Stop replying, but keep the messages. Tell a trusted adult right away, and report the account in the app and to the CyberTipline. Take It Down can help get images removed. You are not in trouble, and you are not alone.',
    },
    boy: {
      title: 'Teen boys are the main target of this scam',
      body: 'Financial sextortion targets teen boys more than anyone else. It usually starts with a fake account posing as a girl around your age who flirts fast and sends a photo first. Once you send something back, the threats and money demands start, sometimes within minutes. Don’t pay, because paying rarely makes it stop. Stop replying, but keep the messages. Tell a trusted adult right away, and report the account in the app and to the CyberTipline. Take It Down can help get images removed. You are not in trouble, and you are not alone.',
    },
  },
};

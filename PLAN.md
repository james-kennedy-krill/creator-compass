# Course adjustments

## Confirmed

- The course prepares one teenage dancer to make safer decisions about sharing dance videos publicly. The family requires completion before account creation, and the parent decides whether to permit a supervised trial.
- The course is a React + TypeScript app (Vite, pnpm, React Router hash routing). It includes eight lessons, seven Safety Lab scenarios, a four-platform audit, a Final Project with a practice-video checklist and family agreement, a Parent Guide, and resources.

## Personalization

- The dashboard is the entry point. The first time a learner opens a course activity, the profile step offers an optional nickname, pronouns, gender, date of birth, and contact details for up to two parents or guardians. Every field is optional and stays on the device.
- The profile personalizes the dashboard greeting and the age prompt in Platform Audit. Pronouns set the Parent Guide's third-person wording and appear on the parent report next to the learner's name.
  - With no pronouns shared, the wording uses they/them.
  - "Just use my name," or custom pronouns, use the learner's name instead (they/them if no name is given).
  - Teen-facing pages address the learner as "you."
- **Gender-aware content (confirmed November 2026).** The gender answer picks examples and emphasis, in `src/data/audience.ts`. Girl and Boy get tailored variants. Non-binary, Something else, Prefer not to say, and unanswered all get the general version, which covers every emphasis. Pronouns never drive content. Variants change framing and examples only: every learner sees every lesson, scenario, and safety step, completion requirements are the same, and scenario variants keep their options in the same order so saved answers still match. Gender does not appear on the parent report.
  - Lesson 4 and Lesson 8 show a Spotlight card (`src/data/spotlights.ts`). Lesson 4 covers sexualized comments, including that boys receive them too. Lesson 8 covers financial sextortion, which targets teen boys most, checked against FBI and NCMEC guidance in November 2026.
  - Safety Lab scenario 7, "The fast crush," covers how financial sextortion starts and is shown to everyone. Scenario 1 swaps the clothing request in its example, and scenario 6 matches the friend's pronouns to the learner's gender (they/them in the general version).
  - Resources include the FBI's financially motivated sextortion page.
- The Final Project links to a printable parent report with course progress and the family creator agreement. Families can save it as a PDF and attach it to an email draft.
- Before expanding beyond the current local-only design for public use, decide whether families need hosted accounts or automated delivery and what personal information those features would actually require.

## Development tooling

- Use pnpm and Vite for local development, builds, and build previews. GitHub Pages runs `pnpm build` and publishes `dist/`.
- **React migration (confirmed November 2026, branch `feature/react-migration`).** The course was ported from the single-file `index.html` to React 19 + TypeScript with these choices:
  - React Router's hash router. Old hashes such as `#home` and `#lesson-3` redirect to `#/` and `#/lessons/3`.
  - The original CSS moved unchanged into `src/styles/global.css`.
  - One context and reducer, still saving to `creator-compass-v1` in the version 1 format. Version 1 backups import without conversion.
  - Course data is extracted into typed modules under `src/data/`.
- The course is used from the hosted URL. Offline or single-file use is not needed (owner decision, November 2026).

## Completion criteria (confirmed November 2026)

- A lesson is complete when the reflection has at least 40 characters, the quiz score is at least two out of three, and the learner selects **Complete lesson**.
- The Final Project shows **Ready to review together** only when all of these are done. It lists each one with progress and a link to the activity:
  - all eight lessons completed
  - all seven Safety Lab scenarios solved, meaning the best answer was chosen at least once (retries are unlimited, and choosing a different answer later doesn't undo it)
  - at least two platforms fully researched in Platform Audit, meaning every checklist item for that platform is checked
  - all five portfolio milestones checked
  - all seven family agreement sections drafted (any non-blank text; quality is judged in the parent conversation)
- The rules live in `readinessItems` in `src/state/progress.ts`. The parent report lists the same items. The parent still makes the account decision.

## Open decisions

- **First adjustments.** Add the owner’s requested curriculum, interface, or workflow changes here as they come up.

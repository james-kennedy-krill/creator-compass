# Course adjustments

## Confirmed

- The course prepares one teenage dancer to make safer decisions about sharing dance videos publicly. The family requires completion before account creation, and the parent decides whether to permit a supervised trial.
- The course is a React + TypeScript app (Vite, pnpm, React Router hash routing). It includes eight lessons, six Safety Lab scenarios, a four-platform audit, a Final Project with a practice-video checklist and family agreement, a Parent Guide, and resources.

## Personalization

- The dashboard is the entry point. The first time a learner opens a course activity, the profile step offers an optional learner nickname, date of birth, and contact details for up to two parents or guardians. The profile personalizes the dashboard greeting and the age prompt in Platform Audit.
- The Final Project links to a printable parent report with course progress and the family creator agreement. Families can save it as a PDF and attach it to an email draft.
- Before expanding beyond the current local-only design for public use, decide whether families need hosted accounts or automated delivery and what personal information those features would actually require.

## Development tooling

- Use pnpm and Vite for local development, builds, and build previews. GitHub Pages runs `pnpm build` and publishes `dist/`.
- **React migration (confirmed November 2026, branch `feature/react-migration`).** The course was ported from the single-file `index.html` to React 19 + TypeScript with these choices:
  - React Router's hash router. Old hashes such as `#home` and `#lesson-3` redirect to `#/` and `#/lessons/3`.
  - The original CSS moved unchanged into `src/styles/global.css`.
  - One context and reducer, still saving to `creator-compass-v1` in the version 1 format. Version 1 backups import without conversion.
  - Course data is extracted into typed modules under `src/data/`.
- The built site can no longer be opened straight from the file system (`file://`), so families use the hosted URL or `pnpm preview`. If offline single-file use is still wanted, consider a single-file build plugin.

## Open decisions

- **First adjustments.** Add the owner’s requested curriculum, interface, or workflow changes here as they come up.
- **Completion criteria.** Today a lesson requires a reflection of at least 40 characters and a score of at least two out of three, followed by the learner selecting **Complete lesson**. The Final Project displays **Ready to review together** when all eight lessons and five portfolio milestones are marked complete. The readiness calculation does not separately check Safety Lab participation, Platform Audit checkmarks, or agreement text. Confirm which of those activities should be required if the family wants a different readiness rule.

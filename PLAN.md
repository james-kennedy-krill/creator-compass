# Course adjustments

## Confirmed

- The course prepares one teenage dancer to make safer decisions about sharing dance videos publicly. The family requires completion before account creation, and the parent decides whether to permit a supervised trial.
- The course runs from `index.html`. It includes eight lessons, six Safety Lab scenarios, a four-platform audit, a Final Project with a practice-video checklist and family agreement, a Parent Guide, and resources.

## Personalization

- The dashboard is the entry point. The first time a learner opens a course activity, the profile step offers an optional learner nickname, date of birth, and contact details for up to two parents or guardians. The profile personalizes the dashboard greeting and the age prompt in Platform Audit.
- The Final Project links to a printable parent report with course progress and the family creator agreement. Families can save it as a PDF and attach it to an email draft.
- Before expanding beyond the current local-only design for public use, decide whether families need hosted accounts or automated delivery and what personal information those features would actually require.

## Development tooling

- Use pnpm and Vite for local development, builds, and build previews. GitHub Pages deploys the root static HTML.
- Consider a React migration if the course grows enough to benefit from reusable components. If we proceed, preserve existing saved progress and version 1 backups, and update GitHub Pages to publish the Vite build output.

## Open decisions

- **First adjustments.** Add the owner’s requested curriculum, interface, or workflow changes here as they come up.
- **Completion criteria.** Today a lesson requires a reflection of at least 40 characters and a score of at least two out of three, followed by the learner selecting **Complete lesson**. The Final Project displays **Ready to review together** when all eight lessons and five portfolio milestones are marked complete. The readiness calculation does not separately check Safety Lab participation, Platform Audit checkmarks, or agreement text. Confirm which of those activities should be required if the family wants a different readiness rule.

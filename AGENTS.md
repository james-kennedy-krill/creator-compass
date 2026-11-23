# Creator Compass

## Purpose

Creator Compass is an interactive online safety course for a teenage dancer who wants to share dance videos publicly. The parent requires course completion before allowing her to create accounts. Keep the final decision with the parent and respect each platform’s age and feature eligibility rules. The site provides practice, progress tracking, and a family readiness conversation.

## Working in this repo

- Read `README.md` and the relevant parts of `index.html` before making changes. Read `PLAN.md` for open decisions and update it when the owner confirms a change in direction.
- Keep the course usable as a self-contained static `index.html` with inline CSS and vanilla JavaScript. Local browser use and static hosting share the same entry point. Use `pnpm dev` for the local Vite server and `pnpm build` to check the optional build. GitHub Pages serves the root HTML directly.
- Keep learner data on the device. Preserve the no-sign-in, no-analytics, no-tracking, and no-media-upload design. Use fictional examples and test data. Keep names, account handles, locations, schedules, private family terms, and learner backups out of the repo. The GitHub Pages workflow packages the repository root.
- Write directly to the teen in a calm, practical, non-shaming voice. Use realistic dance-related scenarios and give concrete next steps. Encourage trusted-adult support and keep parent facilitation guidance in the Parent Guide where practical.
- When changing platform rules, safety features, or reporting guidance, check current official platform or safety-organization sources. Account for age and regional restrictions where applicable. Update review dates only for material actually checked.

## Editing and verifying

- Curriculum and reference data live in `lessons`, `scenarios`, `platformData`, `resources`, `portfolioItems`, and `auditChecklist`. The `render*` functions build hash-routed views. Delegated event handlers near the bottom handle progress and interactions.
- Preserve existing progress in `localStorage` under `creator-compass-v1` and compatibility with version 1 JSON backups. Progress uses lesson IDs, platform names, and positional indices for several activities. Check how existing answers and checkmarks map before reordering items or changing identifiers. Escape learner-entered and imported text before inserting it into HTML templates.
- For curriculum structure or completion changes, check navigation, displayed totals, quiz answer indices, completion conditions, and the Final Project readiness message together. Keep teen-facing instructions aligned with what the UI actually requires.
- Verify affected paths in a browser at phone and desktop widths, including keyboard interaction where relevant. For progress changes, use fictional answers to check saving, reloading, and backup export/import. For agreement changes, check print preview when relevant.

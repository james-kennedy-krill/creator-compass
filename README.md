# In Frame: Going Public

The first In Frame course from Digital Creator Academy helps teens prepare to share their talents publicly. It covers what to share, how to set boundaries, and how to handle attention, with parent participation. Works on phones, tablets, and computers.

## Start using it

1. Open the published site (or run it locally; see below) in a browser such as Chrome, Safari, Edge, or Firefox.
2. Select **Start the course** or open an activity from the dashboard. Fill in the course profile with a parent or guardian before you continue: your nickname, pronouns, gender, birthday, and a parent or guardian’s name and email. A second parent or guardian is optional.
3. Complete the eight lessons. Each has a 3-question knowledge check (retry until every answer is right) followed by a short reflection.
4. Solve every Safety Lab scenario and fully research at least two platforms in Platform Audit, then build the Final Project and draft every section of the family agreement. The Final Project's readiness checklist shows what's left.
5. Open the parent report from the Final Project and save it as a PDF using the browser’s print dialog. If you entered a parent email, open a draft and attach the PDF before sending it.
6. Use **Export progress backup** on the dashboard periodically to preserve the local browser data.

No sign-in, third-party scripts, database, server, analytics, cookies, video uploads, or third-party trackers. Progress is saved with browser `localStorage` on the current device/browser. Profile details, including pronouns, gender, date of birth, and parent emails, are also stored in the browser and included in backups. Use a trusted device and keep backups private. You can edit or clear the profile from the dashboard. If browser data is cleared, it may disappear. Use the same HTTPS address each time so progress stays in one place.

Use **Reset Progress** on the dashboard to erase this course’s saved data from the current browser and return to the dashboard. Previously downloaded backups remain available.

## Local development

The course is a React + TypeScript app built with Vite. Install the dependencies and start the dev server from the repository root.

```sh
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) or use the URL Vite prints. Browser progress is scoped to the URL’s origin, so the development server keeps separate progress from GitHub Pages.

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm typecheck` | Check TypeScript types |
| `pnpm build` | Type-check and build the static site into `dist/` |
| `pnpm preview` | Serve the `dist/` build locally |

Project layout:

- `src/data/` holds the lessons, scenarios, platform audit, resources, Final Project and Parent Guide content, plus the gender-aware variants (`audience.ts`, `spotlights.ts`).
- `src/pages/` has one component per page.
- `src/components/` has the layout and navigation, toast messages and backup helpers.
- `src/state/` has saved progress: its types, the reducer, `localStorage` handling and readiness calculations.
- `src/styles/global.css` has the site styles.

Pages use hash URLs such as `#/lessons/3`. Older links like `#lesson-3` and `#home` are redirected automatically.

## Publish as a website

Pushing to `main` runs the GitHub Pages workflow. It installs dependencies, runs `pnpm build`, and publishes `dist/`. Any static host (Vercel, Netlify, Cloudflare Pages) works the same way: build with `pnpm build` and serve `dist/`. The build uses relative paths, so it works from a subfolder. No server, API keys or environment variables are needed.

The built site has to be served over HTTP. Opening `dist/index.html` directly from disk will not work; use `pnpm preview` to view a build locally.

**Important:** Hosting the site does *not* upload your teen's saved lesson answers to the server. Browser storage belongs to each device and website origin. Before switching to a new address, export a backup and import it at the new location.

## Educational disclaimer

The curriculum is for education and discussion, not an eligibility guarantee or a substitute for emergency support. Public posting must follow the actual platform's age restrictions and local rules. The parent decides whether a supervised, time-limited trial is appropriate.

Safety references include NCMEC NetSmartz / CyberTipline / Take It Down, the FBI's financial sextortion guidance, FTC, StopBullying.gov, and official help pages for Instagram, TikTok, YouTube, and Snapchat. Platform policies change; references were reviewed in November 2026.

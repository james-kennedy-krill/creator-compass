# Creator Compass — Interactive Teen Creator Safety Course

A complete, self-contained browser course for an almost-15-year-old who wants to share dance videos publicly, with parent participation. Works on phones, tablets, and computers.

## Start using it

1. Open `index.html` in a browser (Chrome, Safari, Edge, Firefox).
2. Select **Start the course** or open an activity from the dashboard. Set up the optional course profile with a parent or guardian, or continue without one.
3. Complete the eight lessons, reflection exercises, and 3-question quizzes.
4. Visit Safety Lab and Platform Audit, then build the Final Project and family agreement.
5. Open the parent report from the Final Project and save it as a PDF using the browser’s print dialog. If you entered a parent email, open a draft and attach the PDF before sending it.
6. Use **Export progress backup** on the dashboard periodically to preserve the local browser data.

No sign-in, external JavaScript, database, server, analytics, cookies, video uploads, or third-party trackers. Progress is saved with browser `localStorage` on the current device/browser. Optional profile details, including date of birth and parent emails, are also stored in the browser and included in backups. Use a trusted device and keep backups private. You can edit or clear the profile from the dashboard. If browser data is cleared, it may disappear; file-based browser privacy policies may limit storage reliability. Hosting at an HTTPS origin is preferable for reliable progress persistence.

Use **Reset Progress** on the dashboard to erase this course’s saved data from the current browser and return to the dashboard. Previously downloaded backups remain available.

## Local development

Install the development dependencies and start Vite from the repository root.

```sh
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) or use the URL Vite prints. Browser progress is scoped to the URL’s origin, so the development server has separate progress from GitHub Pages and the local HTML file.

Run `pnpm build` to generate `dist/` and `pnpm preview` to serve that build locally. The course can still be opened directly as `index.html`, and GitHub Pages continues to publish the root HTML without a build.

## Publish as a website

This is a static website with a single `index.html`. You can deploy it by uploading the folder to Vercel or to any static hosting provider, including GitHub Pages, Netlify, or Cloudflare Pages. The folder contents are all you need—no build step or API keys.

**Vercel:** Create a static project/import a repo containing `index.html`, then deploy. The root file is the website's entrypoint. You can keep the deployment unlisted while testing (unlisted is not equivalent to access control; use real hosting access controls if needed).

**Important:** Hosting the site does *not* upload your teen's saved lesson answers to the server. Browser storage belongs to each device and website origin. Export a backup before switching from the local HTML file to a hosted URL; import on the new location if needed.

## Educational disclaimer

The curriculum is for education and discussion, not an eligibility guarantee or a substitute for emergency support. Public posting must follow the actual platform's age restrictions and local rules. The parent decides whether a supervised, time-limited trial is appropriate.

Safety references include NCMEC NetSmartz / CyberTipline / Take It Down, FTC, StopBullying.gov, and official help pages for Instagram, TikTok, YouTube, and Snapchat. Platform policies change; references were reviewed in November 2026.

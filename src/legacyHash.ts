/**
 * The original single-file app used hashes like `#home`, `#lab`, and
 * `#lesson-3`. Rewrite those to router paths (`#/`, `#/lab`, `#/lessons/3`)
 * so bookmarks and shared links keep working.
 */
export function legacyHashToPath(hash: string): string | null {
  const value = hash.replace(/^#/, '');
  if (value.startsWith('/')) return null;
  if (value === '' || value === 'home') return '/';
  const lesson = /^lesson-(\d+)$/.exec(value);
  if (lesson) return `/lessons/${lesson[1]}`;
  return `/${value}`;
}

export function redirectLegacyHash(): void {
  const path = legacyHashToPath(window.location.hash);
  if (path !== null) window.history.replaceState(window.history.state, '', `#${path}`);
}

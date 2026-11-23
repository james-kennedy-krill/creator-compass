import { useEffect } from 'react';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router';
import { lessons } from '../data/lessons';
import { useCourse } from '../state/CourseContext';
import { lessonPercent } from '../state/progress';

const navClass = ({ isActive }: { isActive: boolean }) => `navitem${isActive ? ' active' : ''}`;

function NavItem({ to, icon, children }: { to: string; icon: string; children: string }) {
  return (
    <NavLink to={to} end className={navClass}>
      <span className="navicon">{icon}</span>
      {children}
    </NavLink>
  );
}

const mobileLinks: [string, string][] = [
  ['/', 'Lessons'],
  ['/lab', 'Safety Lab'],
  ['/audit', 'Platform Audit'],
  ['/final', 'Final Project'],
  ['/parent', 'Parent Guide'],
  ['/resources', 'Resources'],
];

export default function Layout() {
  const { state } = useCourse();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // The first time a learner opens an activity, offer the profile step and
  // return them to that activity afterwards.
  if (state.profile === null && pathname !== '/' && pathname !== '/welcome') {
    return <Navigate to="/welcome" replace state={{ from: pathname }} />;
  }

  const onboarding = pathname === '/welcome' && state.profile === null;

  return (
    <div className={`shell${onboarding ? ' onboarding' : ''}`}>
      <aside className="sidebar">
        <NavLink to="/" className="logo">
          <span className="logo-mark">↗</span>
          <span>
            <small>Digital creator academy</small>
            <strong>Creator Compass</strong>
          </span>
        </NavLink>
        <div className="desktoplinks">
          <div className="navlabel">THE COURSE</div>
          <NavItem to="/" icon="⌂">Your dashboard</NavItem>
          {lessons.map((lesson) => {
            const done = state.done.includes(lesson.id);
            return (
              <NavLink
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className={({ isActive }) => `navitem${isActive ? ' active' : ''}${done ? ' complete' : ''}`}
              >
                <span className="number">{done ? '✓' : lesson.id}</span>
                <span style={{ lineHeight: 1.2 }}>{lesson.title}</span>
              </NavLink>
            );
          })}
          <div className="navlabel">PRACTICE & LAUNCH</div>
          <NavItem to="/lab" icon="◇">Safety Lab</NavItem>
          <NavItem to="/audit" icon="▦">Platform Audit</NavItem>
          <NavItem to="/final" icon="✦">Final Project</NavItem>
          <div className="navlabel">FOR FAMILIES</div>
          <NavItem to="/parent" icon="♡">Parent Guide</NavItem>
          <NavItem to="/resources" icon="↗">Resources</NavItem>
        </div>
        <nav className="topnav-mobile" aria-label="Mobile navigation">
          {mobileLinks.map(([to, label]) => (
            <NavLink key={to} to={to} end>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="tiny">YOUR LEARNING JOURNEY</span>
          <div className="mini-progress">
            <div style={{ width: `${lessonPercent(state)}%` }} />
          </div>
          <span className="tiny">
            {state.done.length} of {lessons.length} lessons completed
          </span>
        </div>
      </aside>
      <div className="content">
        <header className="topbar">
          <span className="eyebrow">Create boldly. Share thoughtfully.</span>
          <span className="tag">PRIVATE • SAVES ON THIS DEVICE</span>
        </header>
        <main id="main">
          <Outlet />
          <div className="footer">
            Creator Compass is educational, not a substitute for platform rules or professional emergency support.
            Complete this course with a parent or trusted adult. Your responses are saved only in this browser, with no
            accounts, analytics, or uploads. Last safety-links review: November 2026.
          </div>
        </main>
      </div>
    </div>
  );
}

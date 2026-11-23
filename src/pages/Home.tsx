import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useBackup } from '../components/useBackup';
import { portfolioItems } from '../data/finalProject';
import { lessons } from '../data/lessons';
import { scenarios } from '../data/scenarios';
import { useCourse } from '../state/CourseContext';
import { scenariosSolved } from '../state/progress';
import { clearSavedState } from '../state/storage';

export default function Home() {
  const { state, dispatch } = useCourse();
  const { exportProgress, importProgress } = useBackup();
  const navigate = useNavigate();
  const resetDialog = useRef<HTMLDialogElement>(null);
  const [resetError, setResetError] = useState(false);
  const next = lessons.find((l) => !state.done.includes(l.id)) ?? lessons[lessons.length - 1];

  const showReset = () => {
    setResetError(false);
    resetDialog.current?.showModal();
  };

  const confirmReset = () => {
    const dialog = resetDialog.current;
    if (!dialog?.open) return;
    try {
      clearSavedState();
    } catch {
      setResetError(true);
      return;
    }
    dispatch({ type: 'reset' });
    dialog.close();
    navigate('/');
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow" style={{ color: '#b6d282' }}>THE NEXT CHAPTER STARTS HERE</div>
          <h1>
            Make art.
            <br />
            <span>Keep your agency.</span>
          </h1>
          <p className="lead">
            {state.profile?.learnerName ? `Hi, ${state.profile.learnerName}. ` : ''}
            You want to put your dancing out into the world. This course helps you understand what that means—and build
            the judgment to do it with confidence.
          </p>
          <div className="btn-row">
            <Link className="btn btn-light" to={`/lessons/${next.id}`}>
              {state.done.length ? 'Continue learning' : 'Start the course'} <span>→</span>
            </Link>
            <Link className="btn" style={{ background: '#344058' }} to="/lab">Try a scenario</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="visual-orbit" />
          <div className="art-text">YOUR MOVE / YOUR RULES</div>
        </div>
      </section>

      <div className="grid-3">
        <div className="stat"><strong>{state.done.length} / {lessons.length}</strong><span>Lessons completed</span></div>
        <div className="stat"><strong>{scenariosSolved(state)} / {scenarios.length}</strong><span>Safety scenarios solved</span></div>
        <div className="stat"><strong>{state.portfolio.length} / {portfolioItems.length}</strong><span>Final project milestones</span></div>
      </div>

      <div className="note">
        <b>Welcome to your creative future.</b> This isn't a test of whether you're “good enough” to be online. It's a
        place to practice decisions, build healthy boundaries, and plan with your parent.{' '}
        <b>Your mistakes in this course are practice, not failures.</b>
      </div>

      <div className="section-head section">
        <h2>The learning path</h2>
        <span className="muted small">{lessons.length} lessons • roughly 4–6 weeks</span>
      </div>
      <div className="grid-2">
        {lessons.map((l) => {
          const done = state.done.includes(l.id);
          return (
            <Link key={l.id} className={`card module${done ? ' complete' : ''}`} to={`/lessons/${l.id}`}>
              <span className="numberblock">{done ? '✓' : String(l.id).padStart(2, '0')}</span>
              <span>
                <span className="eyebrow" style={{ fontSize: 10 }}>{l.phase} • {l.duration}</span>
                <h3>{l.title}</h3>
                <p>{l.subtitle}</p>
                <span className="chip">{done ? 'Completed' : 'Open lesson →'}</span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="section-head section"><h2>Practice beyond the lessons</h2></div>
      <div className="grid-3">
        <div className="card">
          <div className="pill">01 / REACT</div>
          <h3 style={{ marginTop: 16 }}>Safety Lab</h3>
          <p className="muted small">Choose what to do in realistic messages, comments, and emergencies.</p>
          <Link className="btn btn-small btn-outline" to="/lab">Try scenarios ↗</Link>
        </div>
        <div className="card">
          <div className="pill">02 / COMPARE</div>
          <h3 style={{ marginTop: 16 }}>Platform Audit</h3>
          <p className="muted small">Compare the safety tools on the apps you may eventually use.</p>
          <Link className="btn btn-small btn-outline" to="/audit">Review platforms ↗</Link>
        </div>
        <div className="card">
          <div className="pill">03 / PREPARE</div>
          <h3 style={{ marginTop: 16 }}>Final Project</h3>
          <p className="muted small">Build your portfolio, publishing checklist, and family plan.</p>
          <Link className="btn btn-small btn-outline" to="/final">View milestones ↗</Link>
        </div>
      </div>

      <div className="section">
        <div className="card" style={{ background: '#f0eafa' }}>
          <h3>How your progress works</h3>
          <p className="small">
            For each lesson, read the material, write a thoughtful reflection, and answer at least 2 of 3 questions
            correctly. You can revise and try again. Before your family review, you’ll also solve every Safety Lab
            scenario, fully research two platforms, check off your portfolio, and draft each part of your family
            agreement. The Final Project shows what’s left. You and your parent decide when the final plan is ready;
            course completion never automatically authorizes a public account.
          </p>
          <div className="btn-row">
            <button className="btn btn-small btn-outline" onClick={exportProgress}>Export progress backup</button>
            <button className="btn btn-small btn-outline" onClick={() => importProgress()}>Import backup</button>
            <Link className="btn btn-small btn-outline" to="/welcome">Edit course profile</Link>
            <button className="btn btn-small btn-outline" onClick={showReset}>Reset Progress</button>
          </div>
          <dialog className="card" ref={resetDialog} aria-labelledby="reset-title" aria-describedby="reset-warning">
            <h2 id="reset-title">Reset your course progress?</h2>
            <p id="reset-warning">
              This permanently erases all progress saved in this browser, including your profile, quiz answers,
              reflections, checklists, and family agreement. Only continue if you truly want to start over from the
              beginning.
            </p>
            <div className="btn-row">
              <form method="dialog">
                <button className="btn btn-outline" autoFocus>Cancel</button>
              </form>
              <button className="btn btn-danger" onClick={confirmReset}>Erase progress and start over</button>
            </div>
            <p role="alert" hidden={!resetError}>Progress could not be cleared. Please try again.</p>
          </dialog>
        </div>
      </div>
    </>
  );
}

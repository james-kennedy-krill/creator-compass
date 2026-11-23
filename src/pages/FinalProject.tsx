import { Fragment } from 'react';
import { Link } from 'react-router';
import { useToast } from '../components/Toast';
import { useBackup } from '../components/useBackup';
import { agreementFields, auditChecklist, portfolioItems } from '../data/finalProject';
import { lessons } from '../data/lessons';
import { scenarios } from '../data/scenarios';
import { useCourse } from '../state/CourseContext';
import { readinessItems, scenariosSolved } from '../state/progress';

export default function FinalProject() {
  const { state, dispatch } = useCourse();
  const { exportProgress } = useBackup();
  const toast = useToast();
  const readiness = readinessItems(state);
  const ready = readiness.every((item) => item.complete);
  const remaining = readiness.filter((item) => !item.complete).length;
  const videoReviewDone = state.videoChecks.length === auditChecklist.length;

  return (
    <>
      <div className="detail-head">
        <div className="eyebrow">THE CREATOR PORTFOLIO</div>
        <h1>Show you're ready to lead.</h1>
        <p className="lead">
          Finishing a course is only the start. Your final project is a conversation about your judgment, goals, and
          boundaries with a parent—not a pass that unlocks public social media automatically.
        </p>
      </div>
      <div className="grid-3">
        <div className="stat"><strong>{state.done.length}/{lessons.length}</strong><span>Lessons</span></div>
        <div className="stat"><strong>{scenariosSolved(state)}/{scenarios.length}</strong><span>Scenarios solved</span></div>
        <div className="stat"><strong>{state.portfolio.length}/{portfolioItems.length}</strong><span>Portfolio milestones</span></div>
      </div>

      <div className="section" id="portfolio"><h2>01 / Creator portfolio</h2></div>
      <div className="card">
        {portfolioItems.map((item, i) => (
          <label className="checkline" key={i}>
            <input
              type="checkbox"
              checked={state.portfolio.includes(i)}
              onChange={(e) => dispatch({ type: 'toggleListItem', key: 'portfolio', index: i, on: e.target.checked })}
            />
            <span>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="section">
        <h2>02 / The pre-publish review</h2>
        <p className="muted">
          Use this checklist on each of your three private practice videos. This is a review guide, not an automatic
          risk detector—no video uploads are required.
        </p>
      </div>
      <div className="card">
        {auditChecklist.map((item, i) => (
          <label className="checkline" key={i}>
            <input
              type="checkbox"
              checked={state.videoChecks.includes(i)}
              onChange={(e) => dispatch({ type: 'toggleListItem', key: 'videoChecks', index: i, on: e.target.checked })}
            />
            <span><strong>{item}</strong></span>
          </label>
        ))}
        <div className="muted-panel">
          <b>{state.videoChecks.length}/{auditChecklist.length} checks reviewed</b>
          <p className="small muted" style={{ margin: '5px 0 0' }}>
            {videoReviewDone
              ? 'Review complete for this practice video. A trusted adult should still review it before any public posting.'
              : 'Review every item; if something is unclear, edit or reshoot before posting.'}
          </p>
          <button
            className="btn btn-small btn-outline"
            style={{ marginTop: 12 }}
            onClick={() => {
              dispatch({ type: 'resetVideoChecks' });
              toast('Checklist reset for the next video');
            }}
          >
            Reset for next video
          </button>
        </div>
      </div>

      <div className="section" id="agreement">
        <h2>03 / Our family creator agreement</h2>
        <p className="muted">
          Draft your proposed boundaries in every section. They don’t need to be perfect; your parent can discuss and
          revise them with you. Avoid typing sensitive contact details here.
        </p>
      </div>
      <div className="agreement">
        {agreementFields.map(({ key, label }) => (
          <Fragment key={key}>
            <label htmlFor={`ag-${key}`}>{label}</label>
            <textarea
              id={`ag-${key}`}
              placeholder="My proposal is..."
              value={state.agreement[key] ?? ''}
              onChange={(e) => dispatch({ type: 'setAgreement', key, text: e.target.value })}
            />
          </Fragment>
        ))}
        <div className="btn-row">
          <Link className="btn" to="/report">Open parent report</Link>
          <button className="btn btn-outline" onClick={exportProgress}>Export course data</button>
        </div>
      </div>

      <div className="section">
        <div className="card" style={{ background: ready ? '#e5f5db' : '#e9e6fa' }}>
          <div className="eyebrow">FAMILY READINESS CONVERSATION</div>
          <h2 style={{ marginTop: 10 }}>{ready ? 'Ready to review together.' : 'Learning first. Conversation next.'}</h2>
          <p>
            {ready
              ? 'You’ve finished everything on the list. Sit down together, discuss the agreement and actual platform rules, and decide whether a time-limited supervised trial is appropriate.'
              : `${remaining} ${remaining === 1 ? 'step is' : 'steps are'} left before your family review. A parent should review the substance—not just the check marks.`}
          </p>
          <ul className="readiness-list">
            {readiness.map((item) => (
              <li key={item.key} className={item.complete ? 'complete' : ''}>
                <span className="readiness-mark" aria-hidden="true">{item.complete ? '✓' : ''}</span>
                <span className="readiness-label">
                  {item.label}
                  <span className="sr-only">{item.complete ? ' (complete)' : ' (not complete yet)'}</span>
                </span>
                <span className="readiness-count">{item.done} / {item.needed}</span>
                {!item.complete && (item.to.startsWith('/') ? (
                  <Link className="readiness-go" to={item.to}>Go<span className="sr-only"> to {item.label.toLowerCase()}</span> →</Link>
                ) : (
                  <button
                    type="button"
                    className="link-button readiness-go"
                    onClick={() => document.getElementById(item.to)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  >
                    Go<span className="sr-only"> to {item.label.toLowerCase()}</span> →
                  </button>
                ))}
              </li>
            ))}
          </ul>
          <Link className="btn btn-outline btn-small" to="/parent">Open parent guide ↗</Link>
        </div>
      </div>
    </>
  );
}

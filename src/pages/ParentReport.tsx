import { Link } from 'react-router';
import { agreementFields, portfolioItems } from '../data/finalProject';
import { lessons } from '../data/lessons';
import { scenarios } from '../data/scenarios';
import { useCourse } from '../state/CourseContext';
import { isReadyForReview, platformChecksDone, platformChecksTotal, scenariosExplored } from '../state/progress';

const EMAIL_PATTERN = /^[^\s@,;?]+@[^\s@,;?]+$/;
const EMAIL_SUBJECT = 'Creator Compass parent report';
const EMAIL_BODY = 'Hi, I’m sharing my Creator Compass report for us to review together.';

export default function ParentReport() {
  const { state } = useCourse();
  const profile = state.profile ?? {};
  const parents = Array.isArray(profile.parents) ? profile.parents : [];
  const names = parents.map((parent) => parent?.name).filter(Boolean).join(' and ');
  const ready = isReadyForReview(state);
  const emailParents = parents.filter((parent) => typeof parent?.email === 'string' && EMAIL_PATTERN.test(parent.email));

  return (
    <>
      <div className="detail-head">
        <div className="eyebrow">CREATOR COMPASS</div>
        <h1>Parent report</h1>
        {profile.learnerName && <p className="lead">Prepared by {profile.learnerName}</p>}
        {names && <p>Prepared for {names}</p>}
        <p>
          {ready
            ? 'The lesson and portfolio milestones are marked complete. Review the work together before deciding whether to allow a supervised trial.'
            : 'Course in progress. Review the remaining work together before making an account decision.'}
        </p>
      </div>
      <div className="card">
        <h2>Course progress</h2>
        <ul>
          <li>{state.done.length} of {lessons.length} lessons completed</li>
          <li>{scenariosExplored(state)} of {scenarios.length} Safety Lab scenarios explored</li>
          <li>{platformChecksDone(state)} of {platformChecksTotal} platform audit items checked</li>
          <li>{state.portfolio.length} of {portfolioItems.length} portfolio milestones marked complete</li>
        </ul>
      </div>
      <div className="section">
        <h2>Family creator agreement</h2>
        {agreementFields.map(({ key, label }) => (
          <section className="card" key={key}>
            <h3>{label}</h3>
            <p className="report-text">{String(state.agreement[key] ?? '').trim() || 'To discuss together'}</p>
          </section>
        ))}
      </div>
      <div className="section report-actions">
        <p>
          Review the agreement before sharing. Save the report as a PDF using the print dialog, then attach that PDF to
          your email draft.
        </p>
        <div className="btn-row">
          <button className="btn" onClick={() => window.print()}>Print / save as PDF</button>
          {emailParents.map((parent, i) => (
            <a
              key={i}
              className="btn btn-outline"
              href={`mailto:${encodeURIComponent(parent.email)}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`}
            >
              Draft email to {parent.name || parent.email}
            </a>
          ))}
          <Link className="btn btn-outline" to="/final">Back to Final Project</Link>
        </div>
      </div>
    </>
  );
}

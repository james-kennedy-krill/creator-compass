import { Link } from 'react-router';
import { agreementFields } from '../data/finalProject';
import { useCourse } from '../state/CourseContext';
import { EMAIL_PATTERN } from '../state/profileRules';
import { pronounLabel } from '../state/pronouns';
import { platformChecksDone, platformChecksTotal, readinessItems } from '../state/progress';

const EMAIL_SUBJECT = 'In Frame: Going Public | Parent report';
const EMAIL_BODY = 'Hi, I’m sharing my report for In Frame: Going Public for us to review together.';

export default function ParentReport() {
  const { state } = useCourse();
  const profile = state.profile ?? {};
  const parents = Array.isArray(profile.parents) ? profile.parents : [];
  const names = parents.map((parent) => parent?.name).filter(Boolean).join(' and ');
  const readiness = readinessItems(state);
  const ready = readiness.every((item) => item.complete);
  const pronouns = pronounLabel(state.profile);
  const emailParents = parents.filter((parent) => typeof parent?.email === 'string' && EMAIL_PATTERN.test(parent.email));

  return (
    <>
      <div className="detail-head">
        <div className="eyebrow">In Frame: Going Public</div>
        <h1>Parent report</h1>
        {profile.learnerName && (
          <p className="lead">
            Prepared by {profile.learnerName}
            {pronouns && ` (${pronouns})`}
          </p>
        )}
        {names && <p>Prepared for {names}</p>}
        <p>
          {ready
            ? 'Every readiness step is complete. Review the work together before deciding whether to allow a supervised trial.'
            : 'Course in progress. Review the remaining work together before making an account decision.'}
        </p>
      </div>
      <div className="card">
        <h2>Course progress</h2>
        <ul>
          {readiness.map((item) => (
            <li key={item.key}>
              {item.complete ? '✓ ' : ''}
              {item.label}: {item.done} of {item.needed}
            </li>
          ))}
          <li>
            Platform audit items checked overall: {platformChecksDone(state)} of {platformChecksTotal}
          </li>
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

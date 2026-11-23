import { useBackup } from '../components/useBackup';
import { platformData, platformReviewDate } from '../data/platforms';
import { useCourse } from '../state/CourseContext';
import { learnerAge, platformChecksDone, platformChecksTotal, platformsResearched, PLATFORMS_REQUIRED } from '../state/progress';

export default function PlatformAudit() {
  const { state, dispatch } = useCourse();
  const { exportProgress } = useBackup();
  const age = learnerAge(state);
  const p = platformData[state.platform] ?? platformData[0];
  const checked = state.platformChecks[p.name] ?? [];
  const isComplete = (name: string, count: number) => (state.platformChecks[name]?.length ?? 0) >= count;
  const researched = platformsResearched(state);

  return (
    <>
      <div className="detail-head">
        <div className="eyebrow">RESEARCH & COMPARE</div>
        <h1>Know your platforms.</h1>
        <p className="lead">
          Every app has different features, and safety settings change. Your mission is to learn how to investigate
          them—not to memorize screenshots that may become outdated.
        </p>
        {age !== null && <p>Look up the settings and eligibility rules for age {age} with your parent or guardian.</p>}
      </div>
      <div className="note">
        <b>Important:</b> Use your real age. Never create an adult account to bypass protections. Snapchat Public
        Profiles generally start at age 16; the platform may not be an option for public posting yet.
      </div>
      <div className="card">
        <div className="eyebrow">PLATFORM EXPLORER</div>
        <div className="platform-tabs">
          {platformData.map((platform, i) => (
            <button
              key={platform.name}
              className={`platform-tab${p === platform ? ' active' : ''}`}
              aria-pressed={p === platform}
              onClick={() => dispatch({ type: 'selectPlatform', index: i })}
            >
              {isComplete(platform.name, platform.checks.length) && <span aria-label="fully researched">✓ </span>}
              {platform.name}
            </button>
          ))}
        </div>
        <h2 style={{ fontSize: 31 }}>{p.name}</h2>
        <p>{p.short}</p>
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-outline">
          Read official platform guidance ↗
        </a>
        <p className="muted small" style={{ marginTop: 12 }}>
          This snapshot was reviewed in {platformReviewDate}. Always recheck before creating or changing an account.
        </p>
        <hr className="divider" />
        <h3>
          Investigation checklist <span className="muted small">{checked.length} / {p.checks.length}</span>
        </h3>
        {p.checks.map((item, i) => (
          <label className="checkline" key={i}>
            <input
              type="checkbox"
              checked={checked.includes(i)}
              onChange={(e) => dispatch({ type: 'togglePlatformCheck', platform: p.name, index: i, on: e.target.checked })}
            />
            <span>
              <strong>{item}</strong>
              <span>Find the current rule in the app or its official help center.</span>
            </span>
          </label>
        ))}
      </div>
      <div className="section">
        <div className="card" style={{ background: '#e9e5fa' }}>
          <h3>Your research progress</h3>
          <p>
            <b>
              {Math.min(researched, PLATFORMS_REQUIRED)} of {PLATFORMS_REQUIRED} platforms fully researched
            </b>{' '}
            {researched >= PLATFORMS_REQUIRED
              ? '— that’s enough for your family review. You can keep researching the others.'
              : '— check every item for at least two platforms before your family review.'}
          </p>
          <p className="muted small">
            {platformChecksDone(state)} of {platformChecksTotal} investigation items checked across{' '}
            {platformData.length} platforms. Researching a platform does not mean you are allowed to make a public
            account on it.
          </p>
          <button className="btn btn-outline btn-small" onClick={exportProgress}>Save a backup of your work</button>
        </div>
      </div>
    </>
  );
}

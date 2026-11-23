import { discussionPrompts, trialBoundaries } from '../data/parentGuide';
import { useCourse } from '../state/CourseContext';
import { capitalize, learnerPronouns } from '../state/pronouns';

export default function ParentGuide() {
  const { state } = useCourse();
  // Wording follows the learner's pronouns from the course profile (they/them if not shared).
  const { subject: they, object: them, possessive: their, verb } = learnerPronouns(state.profile);
  const They = capitalize(they);

  return (
    <>
      <div className="detail-head">
        <div className="eyebrow">FOR PARENTS / GUARDIANS</div>
        <h1>
          Coach the judgment.
          <br />
          Keep the connection.
        </h1>
        <p className="lead">
          This course is designed to be completed by a teen with meaningful, calm adult participation. It doesn't make
          public posting risk-free.
        </p>
      </div>
      <div className="grid-2">
        <div className="card">
          <span className="pill">THE APPROACH</span>
          <h3 style={{ marginTop: 17 }}>Curiosity before control</h3>
          <p>
            Ask what {they} {verb('loves', 'love')} about creating and what {they} {verb('hopes', 'hope')} sharing will
            feel like. Explore potential benefits honestly, then make the risks discussable. {They} should never need to
            hide a frightening experience to avoid losing your trust.
          </p>
        </div>
        <div className="card">
          <span className="pill coral">THE LIMIT</span>
          <h3 style={{ marginTop: 17 }}>Completion ≠ permission</h3>
          <p>
            Even after finishing, the two of you may decide to wait, try private sharing, or approve one age-permitted
            platform with strict boundaries. Revisit the agreement as {their} maturity and the platforms change.
          </p>
        </div>
      </div>

      <div className="section"><h2>How to facilitate</h2></div>
      <div className="card">
        <div className="grid-2">
          <div>
            <h3>Each week</h3>
            <p className="small">
              Aim for 1–2 lessons. Let {them} read, answer, and write first. Then spend 15–20 minutes discussing
              situations without trying to catch {them} out.
            </p>
          </div>
          <div>
            <h3>In the final review</h3>
            <p className="small">
              Ask {them} to explain a privacy risk in one of {their} videos, demonstrate an app setting, identify manipulation
              tactics, and walk you through the emergency plan.
            </p>
          </div>
          <div>
            <h3>What to evaluate</h3>
            <p className="small">
              Look for specific reasoning, willingness to ask for help, respect for others' consent, and ability to
              recognize risky tradeoffs. A perfect quiz score matters less than a thoughtful explanation.
            </p>
          </div>
          <div>
            <h3>Agree on support</h3>
            <p className="small">
              Make help-seeking nonpunitive. Safety comes first if {they} {verb('reports', 'report')} harassment, exploitation, or embarrassing
              mistakes; any later discussion of rules should be separate and measured.
            </p>
          </div>
        </div>
      </div>

      <div className="section"><h2>Suggested trial boundaries</h2></div>
      <div className="card">
        {trialBoundaries.map(({ title, description }) => (
          <div key={title} style={{ padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
            <b>{title}</b>
            <p className="muted small" style={{ margin: '2px 0' }}>{description}</p>
          </div>
        ))}
      </div>

      <div className="section"><h2>Discussion prompts</h2></div>
      <div className="card">
        <ol>
          {discussionPrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ol>
      </div>
      <div className="note">
        <b>In a crisis:</b> Prioritize reassurance and real-world safety. For threats, blackmail, or suspected child
        exploitation, involve a trusted adult immediately, use platform reporting tools, and consult NCMEC's
        CyberTipline. Do not forward sexual images of minors to document an incident.
      </div>
    </>
  );
}

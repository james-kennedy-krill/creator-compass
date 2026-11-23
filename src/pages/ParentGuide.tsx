import { discussionPrompts, trialBoundaries } from '../data/parentGuide';

export default function ParentGuide() {
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
            Ask what she loves about dancing and what she hopes sharing will feel like. Explore potential benefits
            honestly, then make the risks discussable. She should never need to hide a frightening experience to avoid
            losing your trust.
          </p>
        </div>
        <div className="card">
          <span className="pill coral">THE LIMIT</span>
          <h3 style={{ marginTop: 17 }}>Completion ≠ permission</h3>
          <p>
            Even after finishing, the two of you may decide to wait, try private sharing, or approve one age-permitted
            platform with strict boundaries. Revisit the agreement as her maturity and the platforms change.
          </p>
        </div>
      </div>

      <div className="section"><h2>How to facilitate</h2></div>
      <div className="card">
        <div className="grid-2">
          <div>
            <h3>Each week</h3>
            <p className="small">
              Aim for 1–2 lessons. Let her read, answer, and write first. Then spend 15–20 minutes discussing situations
              without trying to catch her out.
            </p>
          </div>
          <div>
            <h3>In the final review</h3>
            <p className="small">
              Ask her to explain a privacy risk in one of her videos, demonstrate an app setting, identify manipulation
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
              Make help-seeking nonpunitive. Safety comes first if she reports harassment, exploitation, or embarrassing
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

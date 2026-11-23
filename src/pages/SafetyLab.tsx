import { audienceFor, scenarioText } from '../data/audience';
import { scenarios } from '../data/scenarios';
import { useCourse } from '../state/CourseContext';
import { scenariosExplored } from '../state/progress';

const letter = (i: number) => String.fromCharCode(65 + i);

export default function SafetyLab() {
  const { state, dispatch } = useCourse();
  const i = Math.min(Math.max(0, state.labIndex), scenarios.length - 1);
  const scenario = scenarios[i];
  const s = { ...scenarioText(scenario, audienceFor(state.profile)), correct: scenario.correct };
  const answer = state.scenarios[i];
  const last = i === scenarios.length - 1;

  return (
    <>
      <div className="detail-head">
        <div className="eyebrow">REAL-WORLD PRACTICE</div>
        <h1>The Safety Lab.</h1>
        <p className="lead">
          The internet doesn't give you multiple-choice questions. Here, you get a chance to practice before a difficult
          situation happens.
        </p>
        <span className="pill">{scenariosExplored(state)} / {scenarios.length} scenarios explored</span>
      </div>
      <div className="lab-panel">
        <div className="scenario-num">SCENARIO {i + 1} OF {scenarios.length}</div>
        <h2 style={{ marginTop: 9 }}>{s.title}</h2>
        <div className="scenario-msg">“{s.message}”</div>
        <h3>What would you do?</h3>
        <div className="labchoices">
          {s.options.map((option, j) => (
            <button
              key={j}
              className={`labchoice${answer === j ? ' selected' : ''}`}
              aria-pressed={answer === j}
              onClick={() => dispatch({ type: 'answerScenario', index: i, choice: j })}
            >
              <b>{letter(j)}.</b> {option}
            </button>
          ))}
        </div>
        {answer !== undefined && (
          <div className={`feedback${answer === s.correct ? '' : ' warn'}`}>
            <b>{answer === s.correct ? 'Strong choice.' : `A better approach is option ${letter(s.correct)}.`}</b>
            <p style={{ margin: '7px 0 0' }}>{s.why}</p>
          </div>
        )}
        <hr className="divider" />
        <div className="btn-row" style={{ justifyContent: 'space-between' }}>
          <button
            className="btn btn-outline"
            disabled={i === 0}
            onClick={() => dispatch({ type: 'labStep', index: Math.max(0, state.labIndex - 1) })}
          >
            ← Previous
          </button>
          <button
            className="btn btn-light"
            onClick={() => dispatch({ type: 'labStep', index: (state.labIndex + 1) % scenarios.length })}
          >
            {last ? 'Restart lab ↻' : 'Next situation →'}
          </button>
        </div>
      </div>
      <div className="note">
        <b>Learning rule:</b> Sometimes an answer that seems polite is unsafe. You do not have to be polite to someone
        who crosses your boundaries.
      </div>
      <p className="muted small">
        All scenarios are fictional. If something like this is happening in real life, involve a trusted adult promptly.
      </p>
    </>
  );
}

import { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { useToast } from '../components/Toast';
import { audienceFor, pick } from '../data/audience';
import { lessons } from '../data/lessons';
import { spotlights } from '../data/spotlights';
import type { Lesson as LessonData } from '../data/types';
import { useCourse } from '../state/CourseContext';
import { lessonPercent } from '../state/progress';

const MIN_REFLECTION = 40;

export default function LessonRoute() {
  const { id } = useParams();
  const lesson = lessons.find((l) => String(l.id) === id);
  if (!lesson) return <Navigate to="/" replace />;
  // Keyed so each lesson gets fresh refs and form state.
  return <Lesson key={lesson.id} lesson={lesson} />;
}

function Lesson({ lesson: l }: { lesson: LessonData }) {
  const { state, dispatch } = useCourse();
  const toast = useToast();
  const reflectionRef = useRef<HTMLTextAreaElement>(null);
  const saved = state.choices[l.id] ?? {};
  const grade = state.scores[l.id];
  // Answers graded at the last check. Older saves without `checked` were graded on their current choices.
  const checked: Record<string, number> = grade
    ? typeof grade.checked === 'object' && grade.checked !== null ? grade.checked : saved
    : {};
  /** True once this question's checked answer is right; the answer is revealed only then. */
  const solved = (qi: number) => saved[qi] !== undefined && checked[qi] === saved[qi] && saved[qi] === l.questions[qi].answer;
  /** True when the current answer was checked and is wrong. Choosing a different answer clears it. */
  const missed = (qi: number) => saved[qi] !== undefined && checked[qi] === saved[qi] && saved[qi] !== l.questions[qi].answer;
  const total = l.questions.length;
  const solvedCount = l.questions.filter((_, qi) => solved(qi)).length;
  const quizPassed = solvedCount === total;
  const reflection = state.reflections[l.id] ?? '';
  const done = state.done.includes(l.id);
  const next = lessons.find((other) => other.id === l.id + 1);
  const spotlightVariants = spotlights[l.id];
  const spotlight = spotlightVariants ? pick(spotlightVariants, audienceFor(state.profile)) : null;

  const checkAnswers = () => {
    if (l.questions.some((_, i) => saved[i] === undefined)) {
      toast(`Answer all ${total} questions first`);
      return;
    }
    const score = l.questions.reduce((n, q, i) => n + (saved[i] === q.answer ? 1 : 0), 0);
    dispatch({ type: 'gradeLesson', lessonId: l.id, score, checked: { ...saved } });
    toast(score === total ? 'Knowledge check passed. Now write your reflection.' : 'Pick a different answer for the ones marked, then check again');
  };

  const finish = () => {
    if (!quizPassed) {
      toast('Get every knowledge check question right first');
      return;
    }
    if (reflection.trim().length < MIN_REFLECTION) {
      toast(`Add at least ${MIN_REFLECTION} characters to your reflection`);
      reflectionRef.current?.focus();
      return;
    }
    dispatch({ type: 'completeLesson', lessonId: l.id });
    toast('Lesson completed!');
  };

  return (
    <>
      <div className="detail-head">
        <div className="crumb">
          <Link to="/">Dashboard</Link> / Lesson {l.id} of {lessons.length}
        </div>
        <div className="eyebrow">{l.phase} • {l.duration}</div>
        <h1>{l.title}</h1>
        <p className="lead">{l.subtitle}</p>
        <span className={`pill${done ? ' teal' : ''}`}>{done ? '✓ Lesson completed' : '✧ Your next skill'}</span>
      </div>
      <div className="lesson-grid">
        <div>
          <div className="story-card">
            <span className="eyebrow">WHY IT MATTERS</span>
            <h2 style={{ marginTop: 12, fontSize: 29 }}>{l.why}</h2>
            <p className="muted small">Read each section, check what you know, then put it into your own words.</p>
          </div>
          {l.sections.map((section, i) => (
            <article className="story-card" key={section.title}>
              <div className="eyebrow">0{i + 1} / LEARN</div>
              <h3 style={{ marginTop: 10 }}>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
          {spotlight && (
            <aside className="spotlight" aria-labelledby={`spotlight-${l.id}`}>
              <div className="eyebrow">SPOTLIGHT</div>
              <h3 id={`spotlight-${l.id}`}>{spotlight.title}</h3>
              <p>{spotlight.body}</p>
            </aside>
          )}
          <div className="note purple"><b>Worth remembering:</b> {l.takeaway}</div>

          <div className="quiz">
            <span className="eyebrow">KNOWLEDGE CHECK</span>
            <h3 style={{ marginTop: 10 }}>Show what you know</h3>
            <p className="muted small">
              Choose an answer for each question, then check. If one is marked “Not quite,” pick a different answer
              and check again. Get all {total} right to move on to your reflection.
            </p>
            {l.questions.map((q, qi) => {
              const isSolved = solved(qi);
              const isMissed = missed(qi);
              return (
                <fieldset className="question" key={qi} disabled={isSolved}>
                  <legend className="q-title">{qi + 1}. {q.prompt}</legend>
                  {q.options.map((option, oi) => {
                    const selected = saved[qi] === oi;
                    const status = selected && isSolved ? ' correct' : selected && isMissed ? ' incorrect' : '';
                    return (
                      <label className={`choice${status}`} key={oi}>
                        <input
                          type="radio"
                          name={`q${qi}`}
                          value={oi}
                          checked={selected}
                          onChange={() => dispatch({ type: 'answerQuestion', lessonId: l.id, question: qi, choice: oi })}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                  <div aria-live="polite">
                    {isSolved && (
                      <div className="feedback">
                        <b>Correct.</b> {q.explanation}
                      </div>
                    )}
                    {isMissed && (
                      <div className="feedback warn">
                        <b>Not quite.</b> Pick a different answer, then check again.
                      </div>
                    )}
                  </div>
                </fieldset>
              );
            })}
            <div className="btn-row">
              {!quizPassed && <button className="btn" onClick={checkAnswers}>Check answers</button>}
              {grade && (
                <span className={`pill ${quizPassed ? 'teal' : 'coral'}`}>
                  {quizPassed ? '✓ All correct' : `${solvedCount} / ${total} correct so far`}
                </span>
              )}
            </div>
          </div>

          <div className="activity">
            <div className="eyebrow">YOUR MISSION / SHORT RESPONSE</div>
            <h3 style={{ marginTop: 10 }}>Put it into your own words</h3>
            {!quizPassed && !reflection && (
              <p className="small muted">Finish the knowledge check first. Then come back here to write.</p>
            )}
            <p>{l.mission}</p>
            <label htmlFor={`reflection-${l.id}`} className="prompt-label">
              Your response (at least {MIN_REFLECTION} characters; no real names, addresses, or contact details)
            </label>
            <textarea
              id={`reflection-${l.id}`}
              ref={reflectionRef}
              placeholder="I think I would..."
              value={reflection}
              onChange={(e) => dispatch({ type: 'setReflection', lessonId: l.id, text: e.target.value })}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <span className="small muted">Auto-saved on this device.</span>
              <span className="small muted">{reflection.trim().length} characters</span>
            </div>
          </div>

          <div className="card" style={{ background: '#eaf1e2' }}>
            <h3>{done ? 'This lesson is complete ✓' : 'Ready to finish?'}</h3>
            <p className="small">
              {done
                ? 'You can revisit your reflection, but your completion stays saved.'
                : 'Get every knowledge check question right and write your reflection. Then save your completion.'}
            </p>
            <div className="btn-row">
              <button className={`btn ${done ? 'btn-outline' : 'btn-light'}`} onClick={finish}>
                {done ? 'Save updates' : 'Complete lesson ✓'}
              </button>
              {next ? (
                <Link className="btn btn-outline" to={`/lessons/${next.id}`}>Next lesson →</Link>
              ) : (
                <Link className="btn btn-outline" to="/final">Final project →</Link>
              )}
            </div>
          </div>
        </div>
        <aside>
          <div className="sidebar-note">
            <b>Creator mindset</b>
            <p className="small">Strong creators practice judgment, not perfection.</p>
            <ul>
              <li>Read with curiosity.</li>
              <li>Answer honestly.</li>
              <li>Bring confusing moments to a trusted adult.</li>
              <li>There is no need to publish anything during the course.</li>
            </ul>
            <hr className="divider" />
            <span className="small">
              Lessons complete: <b>{state.done.length} / {lessons.length}</b>
            </span>
            <div className="mini-progress" style={{ background: '#c9d6c5' }}>
              <div style={{ background: '#457b52', width: `${lessonPercent(state)}%` }} />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

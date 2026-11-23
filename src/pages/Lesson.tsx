import { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { useToast } from '../components/Toast';
import { lessons } from '../data/lessons';
import type { Lesson as LessonData } from '../data/types';
import { useCourse } from '../state/CourseContext';
import { lessonPercent } from '../state/progress';

const MIN_REFLECTION = 40;
const PASSING_SCORE = 2;

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
  const reflection = state.reflections[l.id] ?? '';
  const done = state.done.includes(l.id);
  const next = lessons.find((other) => other.id === l.id + 1);

  const checkAnswers = () => {
    if (l.questions.some((_, i) => saved[i] === undefined)) {
      toast('Answer all three questions first');
      return;
    }
    const score = l.questions.reduce((n, q, i) => n + (saved[i] === q.answer ? 1 : 0), 0);
    dispatch({ type: 'gradeLesson', lessonId: l.id, score });
    toast(score >= PASSING_SCORE ? 'Knowledge check passed' : 'Review the explanations and try again');
  };

  const finish = () => {
    if (reflection.trim().length < MIN_REFLECTION) {
      toast(`Add at least ${MIN_REFLECTION} characters to your reflection`);
      reflectionRef.current?.focus();
      return;
    }
    if ((grade?.score ?? 0) < PASSING_SCORE) {
      toast('Pass the knowledge check (2 of 3) first');
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
            <p className="muted small">Read each section, then complete your personal reflection and knowledge check.</p>
          </div>
          {l.sections.map((section, i) => (
            <article className="story-card" key={section.title}>
              <div className="eyebrow">0{i + 1} / LEARN</div>
              <h3 style={{ marginTop: 10 }}>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
          <div className="note purple"><b>Worth remembering:</b> {l.takeaway}</div>

          <div className="activity">
            <div className="eyebrow">YOUR MISSION / SHORT RESPONSE</div>
            <h3 style={{ marginTop: 10 }}>Put it into your own words</h3>
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

          <div className="quiz">
            <span className="eyebrow">KNOWLEDGE CHECK</span>
            <h3 style={{ marginTop: 10 }}>Show what you know</h3>
            <p className="muted small">
              Three questions. Choose an answer for each, then check. You need {PASSING_SCORE} correct answers to
              complete this lesson.
            </p>
            {l.questions.map((q, qi) => (
              <div className="question" key={qi}>
                <div className="q-title">{qi + 1}. {q.prompt}</div>
                {q.options.map((option, oi) => {
                  let status = '';
                  if (grade && oi === q.answer) status = ' correct';
                  else if (grade && saved[qi] === oi) status = ' incorrect';
                  return (
                    <label className={`choice${status}`} key={oi}>
                      <input
                        type="radio"
                        name={`q${qi}`}
                        value={oi}
                        checked={saved[qi] === oi}
                        onChange={() => dispatch({ type: 'answerQuestion', lessonId: l.id, question: qi, choice: oi })}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
                {grade && (
                  <div className={`feedback${saved[qi] === q.answer ? '' : ' warn'}`}>
                    <b>{saved[qi] === q.answer ? 'Correct.' : 'Try a different answer.'}</b> {q.explanation}
                  </div>
                )}
              </div>
            ))}
            <div className="btn-row">
              <button className="btn" onClick={checkAnswers}>Check answers</button>
              {grade && (
                <span className={`pill ${grade.score >= PASSING_SCORE ? 'teal' : 'coral'}`}>
                  {grade.score} / {l.questions.length} correct
                </span>
              )}
            </div>
          </div>

          <div className="card" style={{ background: '#eaf1e2' }}>
            <h3>{done ? 'This lesson is complete ✓' : 'Ready to finish?'}</h3>
            <p className="small">
              {done
                ? 'You can revisit your reflection, but your completion stays saved.'
                : 'Finish your reflection and pass the quiz. Then save your completion.'}
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

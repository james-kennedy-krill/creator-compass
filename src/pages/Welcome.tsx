import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useBackup } from '../components/useBackup';
import { useCourse } from '../state/CourseContext';
import { localDate } from '../state/progress';

export default function Welcome() {
  const { state, dispatch } = useCourse();
  const { importProgress } = useBackup();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: string } | null)?.from ?? '/';
  const profile = state.profile ?? {};
  const editing = state.profile !== null;

  const continueFromProfile = () => navigate(destination);

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();
    dispatch({
      type: 'setProfile',
      profile: {
        learnerName: value('learnerName'),
        birthDate: value('birthDate'),
        parents: [0, 1].map((i) => ({ name: value(`parentName${i}`), email: value(`parentEmail${i}`) })),
      },
    });
    continueFromProfile();
  };

  const skipOrClear = () => {
    dispatch({ type: 'setProfile', profile: {} });
    continueFromProfile();
  };

  return (
    <>
      <div className="detail-head">
        <h1>{editing ? 'Course profile' : 'Welcome to Creator Compass'}</h1>
        <p className="lead">
          Set up your course with a parent or guardian. You can use a nickname and leave any field blank.
        </p>
      </div>
      {/* Keyed so the fields reset if the profile is replaced by an import. */}
      <form className="card" onSubmit={save} key={JSON.stringify(state.profile)}>
        <p className="small">
          These details are saved in this browser and included in progress backups. Use a device you trust. Your date
          of birth helps you review age-specific platform rules. Parent emails are used when you open an email draft.
        </p>
        <label className="prompt-label" htmlFor="learner-name">Your first name or nickname</label>
        <input type="text" id="learner-name" name="learnerName" maxLength={80} autoComplete="off" defaultValue={profile.learnerName ?? ''} />
        <label className="prompt-label" htmlFor="birth-date">Your date of birth</label>
        <input type="date" id="birth-date" name="birthDate" max={localDate(new Date())} autoComplete="off" defaultValue={profile.birthDate ?? ''} />
        <div className="grid-2">
          {[0, 1].map((i) => (
            <div key={i}>
              <label className="prompt-label" htmlFor={`parent-name-${i}`}>Parent or guardian {i + 1} name</label>
              <input type="text" id={`parent-name-${i}`} name={`parentName${i}`} maxLength={80} autoComplete="off" defaultValue={profile.parents?.[i]?.name ?? ''} />
              <label className="prompt-label" htmlFor={`parent-email-${i}`}>Parent or guardian {i + 1} email</label>
              <input type="email" id={`parent-email-${i}`} name={`parentEmail${i}`} maxLength={254} autoComplete="off" defaultValue={profile.parents?.[i]?.email ?? ''} />
            </div>
          ))}
        </div>
        <div className="btn-row section">
          <button className="btn btn-light" type="submit">{editing ? 'Save profile' : 'Save and continue'}</button>
          {editing ? (
            <button className="btn btn-outline" type="button" onClick={skipOrClear}>Clear profile</button>
          ) : (
            <>
              <button className="btn btn-outline" type="button" onClick={skipOrClear}>Continue without a profile</button>
              <button className="btn btn-outline" type="button" onClick={() => importProgress(continueFromProfile)}>
                Import progress backup
              </button>
            </>
          )}
          <Link to="/">Back to dashboard</Link>
        </div>
      </form>
    </>
  );
}

import { useEffect, useRef, useState, type FormEvent, type Ref } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useBackup } from '../components/useBackup';
import { useCourse } from '../state/CourseContext';
import { ageFromBirthDate, localDate } from '../state/progress';
import { genderOptions, pronounOptions } from '../state/pronouns';
import type { ParentContact, Profile } from '../state/types';

const blankParent: ParentContact = { name: '', email: '' };
const hasDetails = (parent?: ParentContact) => Boolean(parent?.name?.trim() || parent?.email?.trim());

export default function Welcome() {
  const { state } = useCourse();
  // Remount the form if the saved profile is replaced (for example by an import).
  return <WelcomeForm key={JSON.stringify(state.profile)} profile={state.profile} />;
}

function WelcomeForm({ profile }: { profile: Profile | null }) {
  const { dispatch } = useCourse();
  const { importProgress } = useBackup();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: string } | null)?.from ?? '/';
  const editing = profile !== null;
  const saved = profile ?? {};

  const [birthDate, setBirthDate] = useState(saved.birthDate ?? '');
  const [pronouns, setPronouns] = useState(saved.pronouns ?? '');
  const [gender, setGender] = useState(saved.gender ?? '');
  const [showSecondParent, setShowSecondParent] = useState(hasDetails(saved.parents?.[1]));
  const secondParentName = useRef<HTMLInputElement>(null);
  const addParentButton = useRef<HTMLButtonElement>(null);
  // Move focus only after the learner adds or removes the second guardian, not on first render.
  const focusAfterToggle = useRef(false);

  useEffect(() => {
    if (!focusAfterToggle.current) return;
    focusAfterToggle.current = false;
    (showSecondParent ? secondParentName.current : addParentButton.current)?.focus();
  }, [showSecondParent]);

  const today = localDate(new Date());
  const continueFromProfile = () => navigate(destination);

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();
    const parent = (i: number): ParentContact => ({ name: value(`parentName${i}`), email: value(`parentEmail${i}`) });
    dispatch({
      type: 'setProfile',
      profile: {
        learnerName: value('learnerName'),
        birthDate,
        pronouns,
        pronounsOther: pronouns === 'other' ? value('pronounsOther') : '',
        gender,
        genderOther: gender === 'other' ? value('genderOther') : '',
        // Always two entries, matching the saved format used since version 1.
        parents: [parent(0), showSecondParent ? parent(1) : blankParent],
      },
    });
    continueFromProfile();
  };

  const skipOrClear = () => {
    dispatch({ type: 'setProfile', profile: {} });
    continueFromProfile();
  };

  const toggleSecondParent = (show: boolean) => {
    focusAfterToggle.current = true;
    setShowSecondParent(show);
  };

  return (
    <div className="welcome">
      {!editing && (
        <div className="welcome-brand">
          <span className="logo-mark" aria-hidden="true">↗</span>
          <span>Creator Compass</span>
        </div>
      )}

      <div className="detail-head">
        {editing && (
          <div className="crumb">
            <Link to="/">Dashboard</Link> / Course profile
          </div>
        )}
        <div className="eyebrow">{editing ? 'YOUR COURSE PROFILE' : 'BEFORE YOU START'}</div>
        <h1>{editing ? 'Your details' : 'Let’s set up your course.'}</h1>
        <p className="lead">
          {editing
            ? 'Update or clear anything here. Changes are saved on this device only.'
            : 'A few quick details make the course feel like yours. Fill this in with a parent or guardian. Everything is optional, so skip anything you’d rather not add.'}
        </p>
        <ul className="welcome-promises" aria-label="How your details are handled">
          <li>✓ Stays on this device</li>
          <li>✓ No account or sign-in</li>
          <li>✓ Every field is optional</li>
        </ul>
      </div>

      <form className="welcome-form" onSubmit={save}>
        <fieldset className="card form-section">
          <legend className="eyebrow">01 / ABOUT YOU</legend>

          <label className="prompt-label" htmlFor="learner-name">What should we call you?</label>
          <p className="field-hint" id="learner-name-hint">
            A first name or nickname is perfect. You’ll see it on your dashboard and parent report.
          </p>
          <input
            type="text"
            id="learner-name"
            name="learnerName"
            maxLength={80}
            autoComplete="off"
            aria-describedby="learner-name-hint"
            defaultValue={saved.learnerName ?? ''}
          />

          <ChoiceGroup
            id="pronouns"
            question="What pronouns do you use?"
            hint="The lessons talk to you as “you.” Pronouns are used in the Parent Guide and parent report, where a parent reads about you."
            options={pronounOptions}
            value={pronouns}
            onChange={setPronouns}
            otherName="pronounsOther"
            otherLabel="Your pronouns"
            otherPlaceholder="For example, xe/xem"
            otherDefault={saved.pronounsOther ?? ''}
          />

          <ChoiceGroup
            id="gender"
            question="How do you describe your gender?"
            hint="This helps the course choose examples that fit you. You’ll still see every lesson either way."
            options={genderOptions}
            value={gender}
            onChange={setGender}
            otherName="genderOther"
            otherLabel="Your gender, in your own words"
            otherDefault={saved.genderOther ?? ''}
          />

          <label className="prompt-label" htmlFor="birth-date">When’s your birthday?</label>
          <p className="field-hint" id="birth-date-hint">
            Apps have different rules at different ages. This is only used to show which ones apply to you.
          </p>
          <div className="birthday-row">
            <input
              type="date"
              id="birth-date"
              name="birthDate"
              className="input-date"
              max={today}
              autoComplete="off"
              aria-describedby="birth-date-hint birth-date-age"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <AgePreview birthDate={birthDate} today={today} />
          </div>
        </fieldset>

        <fieldset className="card form-section">
          <legend className="eyebrow">02 / YOUR PARENT OR GUARDIAN</legend>
          <p className="section-intro">
            Who’s doing this course with you? Their email is only used if you choose to send them your parent report.
            The course never sends anything on its own.
          </p>

          <GuardianFields index={0} title="Parent or guardian" parent={saved.parents?.[0]} />

          {showSecondParent ? (
            <GuardianFields
              index={1}
              title="Second parent or guardian"
              parent={saved.parents?.[1]}
              nameRef={secondParentName}
              onRemove={() => toggleSecondParent(false)}
            />
          ) : (
            <button type="button" className="add-guardian" ref={addParentButton} onClick={() => toggleSecondParent(true)}>
              <span aria-hidden="true">+</span> Add a second parent or guardian
            </button>
          )}
        </fieldset>

        <div className="privacy-note">
          <b>Where this information goes</b>
          <ul>
            <li>It’s saved in this browser on this device. It isn’t uploaded anywhere.</li>
            <li>It’s included in progress backups you download, so keep those files private. That includes your pronouns and gender.</li>
            <li>Use a device you trust. You can change or clear these details from your dashboard anytime.</li>
          </ul>
        </div>

        <div className="btn-row welcome-actions">
          <button className="btn btn-light" type="submit">
            {editing ? 'Save changes' : 'Save and continue'} <span aria-hidden="true">→</span>
          </button>
          {editing ? (
            <>
              <Link className="btn btn-outline" to="/">Cancel</Link>
              <button className="btn btn-outline btn-danger-outline" type="button" onClick={skipOrClear}>
                Clear my details
              </button>
            </>
          ) : (
            <button className="btn btn-outline" type="button" onClick={skipOrClear}>Skip for now</button>
          )}
        </div>

        {!editing && (
          <p className="welcome-import small muted">
            Already started on another device?{' '}
            <button type="button" className="link-button" onClick={() => importProgress(continueFromProfile)}>
              Import a progress backup
            </button>
          </p>
        )}
      </form>
    </div>
  );
}

interface GuardianFieldsProps {
  index: number;
  title: string;
  parent?: ParentContact;
  nameRef?: Ref<HTMLInputElement>;
  onRemove?: () => void;
}

function GuardianFields({ index, title, parent, nameRef, onRemove }: GuardianFieldsProps) {
  const id = (field: string) => `parent-${field}-${index}`;
  return (
    <fieldset className="guardian">
      <legend>{title}</legend>
      {onRemove && (
        <button type="button" className="link-button small guardian-remove" onClick={onRemove} aria-label={`Remove ${title.toLowerCase()}`}>
          Remove
        </button>
      )}
      <div className="guardian-fields">
        <div>
          <label className="prompt-label" htmlFor={id('name')}>Their name</label>
          <input
            type="text"
            id={id('name')}
            name={`parentName${index}`}
            ref={nameRef}
            maxLength={80}
            autoComplete="off"
            placeholder="“Mom” or “Dad” works too"
            defaultValue={parent?.name ?? ''}
          />
        </div>
        <div>
          <label className="prompt-label" htmlFor={id('email')}>Their email</label>
          <input
            type="email"
            id={id('email')}
            name={`parentEmail${index}`}
            maxLength={254}
            autoComplete="off"
            inputMode="email"
            placeholder="name@example.com"
            defaultValue={parent?.email ?? ''}
          />
        </div>
      </div>
    </fieldset>
  );
}

interface ChoiceGroupProps {
  id: string;
  question: string;
  hint: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  otherName: string;
  otherLabel: string;
  otherPlaceholder?: string;
  otherDefault: string;
}

/** Optional single-choice question shown as pill buttons, with free text for "Something else". */
function ChoiceGroup(props: ChoiceGroupProps) {
  const { id, question, hint, options, value, onChange, otherName, otherLabel, otherPlaceholder, otherDefault } = props;
  return (
    <fieldset className="choice-group" aria-describedby={`${id}-hint`}>
      <legend className="prompt-label">{question}</legend>
      <p className="field-hint" id={`${id}-hint`}>{hint}</p>
      <div className="choice-pills">
        {options.map((option) => (
          <label key={option.value} className={`choice-pill${value === option.value ? ' selected' : ''}`}>
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
        {value && (
          <button type="button" className="link-button small choice-clear" onClick={() => onChange('')}>
            Clear
          </button>
        )}
      </div>
      {value === 'other' && (
        <div className="choice-other">
          <label className="prompt-label" htmlFor={`${id}-other`}>{otherLabel}</label>
          <input
            type="text"
            id={`${id}-other`}
            name={otherName}
            maxLength={40}
            autoComplete="off"
            placeholder={otherPlaceholder}
            defaultValue={otherDefault}
          />
        </div>
      )}
    </fieldset>
  );
}

/** Live age readout beside the birthday field. Announced politely to screen readers as it changes. */
function AgePreview({ birthDate, today }: { birthDate: string; today: string }) {
  const age = ageFromBirthDate(birthDate, today);
  let content;
  let tone = '';
  if (!birthDate) {
    content = <span className="muted">Your age will show here</span>;
  } else if (birthDate > today) {
    content = 'That date is in the future';
    tone = ' warn';
  } else if (age === null) {
    content = <span className="muted">Finish entering the date</span>;
  } else {
    content = (
      <>
        You’re <strong>{age}</strong>
      </>
    );
    tone = ' ok';
  }
  return (
    <p className={`age-preview${tone}`} id="birth-date-age" aria-live="polite">
      {content}
    </p>
  );
}

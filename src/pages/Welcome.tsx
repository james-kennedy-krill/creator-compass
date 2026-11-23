import { useEffect, useRef, useState, type FormEvent, type Ref } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useBackup } from '../components/useBackup';
import { useCourse } from '../state/CourseContext';
import { isProfileComplete, validateProfile, type ProfileErrors, type ProfileField } from '../state/profileRules';
import { ageFromBirthDate, localDate } from '../state/progress';
import { genderOptions, pronounOptions } from '../state/pronouns';
import type { ParentContact, Profile } from '../state/types';

const blankParent: ParentContact = { name: '', email: '' };
const hasDetails = (parent?: ParentContact) => Boolean(parent?.name?.trim() || parent?.email?.trim());

/** Order used to move focus to the first problem after a save attempt. */
const fieldOrder: ProfileField[] = [
  'learnerName',
  'pronouns',
  'pronounsOther',
  'gender',
  'genderOther',
  'birthDate',
  'parentName0',
  'parentEmail0',
  'parentName1',
  'parentEmail1',
];

/** The element to focus for each field. Radio groups focus their first option. */
const focusTarget: Record<ProfileField, string> = {
  learnerName: '#learner-name',
  pronouns: 'input[name="pronouns"]',
  pronounsOther: '#pronouns-other',
  gender: 'input[name="gender"]',
  genderOther: '#gender-other',
  birthDate: '#birth-date',
  parentName0: '#parent-name-0',
  parentEmail0: '#parent-email-0',
  parentName1: '#parent-name-1',
  parentEmail1: '#parent-email-1',
};

type Mode = 'new' | 'finish' | 'edit';

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
  const mode: Mode = profile === null ? 'new' : isProfileComplete(profile) ? 'edit' : 'finish';
  const saved = profile ?? {};

  const [birthDate, setBirthDate] = useState(saved.birthDate ?? '');
  const [pronouns, setPronouns] = useState(saved.pronouns ?? '');
  const [gender, setGender] = useState(saved.gender ?? '');
  const [showSecondParent, setShowSecondParent] = useState(hasDetails(saved.parents?.[1]));
  const [errors, setErrors] = useState<ProfileErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
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
  const errorCount = Object.keys(errors).length;

  const clearError = (field: string) =>
    setErrors((current) => {
      if (!(field in current)) return current;
      const next = { ...current };
      delete next[field as ProfileField];
      return next;
    });

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();
    const parent = (i: number): ParentContact => ({ name: value(`parentName${i}`), email: value(`parentEmail${i}`) });
    const next: Profile = {
      learnerName: value('learnerName'),
      birthDate,
      pronouns,
      pronounsOther: pronouns === 'other' ? value('pronounsOther') : '',
      gender,
      genderOther: gender === 'other' ? value('genderOther') : '',
      // Always two entries, matching the saved format used since version 1.
      parents: [parent(0), showSecondParent ? parent(1) : blankParent],
    };

    const problems = validateProfile(next, today);
    if (Object.keys(problems).length > 0) {
      setErrors(problems);
      const first = fieldOrder.find((field) => problems[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(focusTarget[first])?.focus();
      return;
    }
    dispatch({ type: 'setProfile', profile: next });
    continueFromProfile();
  };

  const toggleSecondParent = (show: boolean) => {
    focusAfterToggle.current = true;
    setShowSecondParent(show);
    if (!show) {
      clearError('parentName1');
      clearError('parentEmail1');
    }
  };

  const heading = {
    new: {
      eyebrow: 'BEFORE YOU START',
      title: 'Let’s set up your course.',
      lead: 'This course ends with a report you share with your parent or guardian, so we need a few details first. Fill this in together. It takes about two minutes.',
    },
    finish: {
      eyebrow: 'ONE MORE STEP',
      title: 'Finish setting up your course.',
      lead: 'Your progress is safe. The course now ends with a report you share with your parent or guardian, so we need a few more details before you continue.',
    },
    edit: {
      eyebrow: 'YOUR COURSE PROFILE',
      title: 'Your details',
      lead: 'Update your details here. Changes are saved on this device only.',
    },
  }[mode];

  return (
    <div className="welcome">
      {mode !== 'edit' && (
        <div className="welcome-brand">
          <span className="logo-mark" aria-hidden="true">↗</span>
          <span>In Frame: Going Public</span>
        </div>
      )}

      <div className="detail-head">
        {mode === 'edit' && (
          <div className="crumb">
            <Link to="/">Dashboard</Link> / Course profile
          </div>
        )}
        <div className="eyebrow">{heading.eyebrow}</div>
        <h1>{heading.title}</h1>
        <p className="lead">{heading.lead}</p>
        <ul className="welcome-promises" aria-label="How your details are handled">
          <li>✓ Stays on this device</li>
          <li>✓ No account or sign-in</li>
          <li>✓ You choose when to share your report</li>
        </ul>
      </div>

      <form
        className="welcome-form"
        onSubmit={save}
        onInput={(e) => clearError((e.target as HTMLInputElement).name)}
        noValidate
        ref={formRef}
      >
        <p className="small muted required-note">Every question is required unless it says optional.</p>

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
            required
            aria-invalid={Boolean(errors.learnerName)}
            aria-describedby={describedBy('learner-name-hint', errors.learnerName && 'learner-name-error')}
            defaultValue={saved.learnerName ?? ''}
          />
          <FieldError id="learner-name-error" message={errors.learnerName} />

          <ChoiceGroup
            id="pronouns"
            question="What pronouns do you use?"
            hint="The lessons talk to you as “you.” Pronouns are used in the Parent Guide and parent report, where a parent reads about you."
            options={pronounOptions}
            value={pronouns}
            onChange={(value) => {
              setPronouns(value);
              clearError('pronouns');
            }}
            error={errors.pronouns}
            otherName="pronounsOther"
            otherLabel="Your pronouns"
            otherPlaceholder="For example, xe/xem"
            otherDefault={saved.pronounsOther ?? ''}
            otherError={errors.pronounsOther}
          />

          <ChoiceGroup
            id="gender"
            question="How do you describe your gender?"
            hint="This helps the course choose examples that fit you. “Prefer not to say” is a fine answer, and you’ll see every lesson either way."
            options={genderOptions}
            value={gender}
            onChange={(value) => {
              setGender(value);
              clearError('gender');
            }}
            error={errors.gender}
            otherName="genderOther"
            otherLabel="Your gender, in your own words"
            otherDefault={saved.genderOther ?? ''}
            otherError={errors.genderOther}
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
              required
              aria-invalid={Boolean(errors.birthDate)}
              aria-describedby={describedBy('birth-date-hint', 'birth-date-age', errors.birthDate && 'birth-date-error')}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <AgePreview birthDate={birthDate} today={today} />
          </div>
          <FieldError id="birth-date-error" message={errors.birthDate} />
        </fieldset>

        <fieldset className="card form-section">
          <legend className="eyebrow">02 / YOUR PARENT OR GUARDIAN</legend>
          <p className="section-intro">
            Who’s doing this course with you? At the end, you’ll send them your parent report, so we need their email.
            The course never sends anything on its own. You choose when.
          </p>

          <GuardianFields index={0} title="Parent or guardian" parent={saved.parents?.[0]} errors={errors} />

          {showSecondParent ? (
            <GuardianFields
              index={1}
              title="Second parent or guardian"
              optional
              parent={saved.parents?.[1]}
              errors={errors}
              nameRef={secondParentName}
              onRemove={() => toggleSecondParent(false)}
            />
          ) : (
            <button type="button" className="add-guardian" ref={addParentButton} onClick={() => toggleSecondParent(true)}>
              <span aria-hidden="true">+</span> Add a second parent or guardian <span className="optional-tag">optional</span>
            </button>
          )}
        </fieldset>

        <div className="privacy-note">
          <b>Where this information goes</b>
          <ul>
            <li>It’s saved in this browser on this device. It isn’t uploaded anywhere.</li>
            <li>It’s included in progress backups you download, so keep those files private. That includes your pronouns and gender.</li>
            <li>Use a device you trust. You can update these details from your dashboard anytime.</li>
          </ul>
        </div>

        {errorCount > 0 && (
          <p className="form-error-summary" role="alert">
            {errorCount === 1 ? 'One answer needs' : `${errorCount} answers need`} your attention before you can continue.
            Look for the messages in red above.
          </p>
        )}

        <div className="btn-row welcome-actions">
          <button className="btn btn-light" type="submit">
            {mode === 'edit' ? 'Save changes' : 'Save and continue'} <span aria-hidden="true">→</span>
          </button>
          {mode === 'edit' && <Link className="btn btn-outline" to="/">Cancel</Link>}
        </div>

        {mode !== 'edit' && (
          <div className="welcome-links small muted">
            <p>
              Already started on another device?{' '}
              <button
                type="button"
                className="link-button"
                onClick={() =>
                  importProgress((imported) => {
                    // A backup without a complete profile stays here so the details can be filled in.
                    if (isProfileComplete(imported.profile)) continueFromProfile();
                  })
                }
              >
                Import a progress backup
              </button>
            </p>
            <p>
              Need help with something urgent right now? <Link to="/resources">Open help resources</Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(' ') || undefined;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="field-error" id={id}>
      {message}
    </p>
  );
}

interface GuardianFieldsProps {
  index: 0 | 1;
  title: string;
  optional?: boolean;
  parent?: ParentContact;
  errors: ProfileErrors;
  nameRef?: Ref<HTMLInputElement>;
  onRemove?: () => void;
}

function GuardianFields({ index, title, optional, parent, errors, nameRef, onRemove }: GuardianFieldsProps) {
  const id = (field: string) => `parent-${field}-${index}`;
  const errorId = (field: string) => `${id(field)}-error`;
  const nameError = errors[`parentName${index}`];
  const emailError = errors[`parentEmail${index}`];
  return (
    <fieldset className="guardian">
      <legend>
        {title}
        {optional && <span className="optional-tag">optional</span>}
      </legend>
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
            required={!optional}
            placeholder="“Mom” or “Dad” works too"
            aria-invalid={Boolean(nameError)}
            aria-describedby={describedBy(nameError && errorId('name'))}
            defaultValue={parent?.name ?? ''}
          />
          <FieldError id={errorId('name')} message={nameError} />
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
            required={!optional}
            placeholder="name@example.com"
            aria-invalid={Boolean(emailError)}
            aria-describedby={describedBy(emailError && errorId('email'))}
            defaultValue={parent?.email ?? ''}
          />
          <FieldError id={errorId('email')} message={emailError} />
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
  error?: string;
  otherName: string;
  otherLabel: string;
  otherPlaceholder?: string;
  otherDefault: string;
  otherError?: string;
}

/** Required single-choice question shown as pill buttons, with free text for "Something else". */
function ChoiceGroup(props: ChoiceGroupProps) {
  const { id, question, hint, options, value, onChange, error, otherName, otherLabel, otherPlaceholder, otherDefault, otherError } = props;
  return (
    <fieldset
      className={`choice-group${error ? ' has-error' : ''}`}
      aria-describedby={describedBy(`${id}-hint`, error && `${id}-error`)}
    >
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
              aria-invalid={Boolean(error)}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <FieldError id={`${id}-error`} message={error} />
      {value === 'other' && (
        <div className="choice-other">
          <label className="prompt-label" htmlFor={`${id}-other`}>{otherLabel}</label>
          <input
            type="text"
            id={`${id}-other`}
            name={otherName}
            maxLength={40}
            autoComplete="off"
            required
            placeholder={otherPlaceholder}
            aria-invalid={Boolean(otherError)}
            aria-describedby={describedBy(otherError && `${id}-other-error`)}
            defaultValue={otherDefault}
          />
          <FieldError id={`${id}-other-error`} message={otherError} />
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

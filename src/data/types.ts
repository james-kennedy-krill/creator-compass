export interface LessonSection {
  title: string;
  body: string;
}

export interface QuizQuestion {
  prompt: string;
  options: string[];
  /** Index into `options`. Saved answers are compared against this index. */
  answer: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  phase: string;
  duration: string;
  title: string;
  subtitle: string;
  why: string;
  sections: LessonSection[];
  takeaway: string;
  mission: string;
  questions: QuizQuestion[];
}

export interface Scenario {
  title: string;
  message: string;
  options: string[];
  correct: number;
  why: string;
}

export interface Platform {
  name: string;
  short: string;
  url: string;
  checks: string[];
}

export interface Resource {
  name: string;
  description: string;
  url: string;
  icon: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
}

export interface AgreementField {
  key: string;
  label: string;
}

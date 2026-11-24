import { createContext, useContext, useEffect, useReducer, useRef, type ReactNode } from 'react';
import { scenarios } from '../data/scenarios';
import { initialState, loadState, saveState } from './storage';
import type { CourseState, Profile } from './types';

type ListKey = 'portfolio' | 'videoChecks';

export type CourseAction =
  | { type: 'setProfile'; profile: Profile }
  | { type: 'answerQuestion'; lessonId: number; question: number; choice: number }
  | { type: 'gradeLesson'; lessonId: number; score: number; checked: Record<string, number> }
  | { type: 'completeLesson'; lessonId: number }
  | { type: 'setReflection'; lessonId: number; text: string }
  | { type: 'answerScenario'; index: number; choice: number }
  | { type: 'labStep'; index: number }
  | { type: 'selectPlatform'; index: number }
  | { type: 'togglePlatformCheck'; platform: string; index: number; on: boolean }
  | { type: 'toggleListItem'; key: ListKey; index: number; on: boolean }
  | { type: 'resetVideoChecks' }
  | { type: 'setAgreement'; key: string; text: string }
  | { type: 'replace'; state: CourseState }
  | { type: 'reset' };

function toggle(list: number[], value: number, on: boolean): number[] {
  const set = new Set(list);
  if (on) set.add(value);
  else set.delete(value);
  return [...set];
}

function reducer(state: CourseState, action: CourseAction): CourseState {
  switch (action.type) {
    case 'setProfile':
      return { ...state, profile: action.profile };
    case 'answerQuestion': {
      // Keep the last check so answers already marked correct stay revealed.
      const choices = { ...state.choices[action.lessonId], [action.question]: action.choice };
      return { ...state, choices: { ...state.choices, [action.lessonId]: choices } };
    }
    case 'gradeLesson':
      return {
        ...state,
        scores: { ...state.scores, [action.lessonId]: { score: action.score, checked: action.checked } },
      };
    case 'completeLesson':
      if (state.done.includes(action.lessonId)) return { ...state };
      return { ...state, done: [...state.done, action.lessonId].sort((a, b) => a - b) };
    case 'setReflection':
      return { ...state, reflections: { ...state.reflections, [action.lessonId]: action.text } };
    case 'answerScenario': {
      const solved = scenarios[action.index]?.correct === action.choice;
      return {
        ...state,
        scenarios: { ...state.scenarios, [action.index]: action.choice },
        labSolved: solved ? toggle(state.labSolved, action.index, true) : state.labSolved,
      };
    }
    case 'labStep':
      return { ...state, labIndex: action.index };
    case 'selectPlatform':
      return { ...state, platform: action.index };
    case 'togglePlatformCheck': {
      const current = state.platformChecks[action.platform] ?? [];
      return {
        ...state,
        platformChecks: { ...state.platformChecks, [action.platform]: toggle(current, action.index, action.on) },
      };
    }
    case 'toggleListItem':
      return { ...state, [action.key]: toggle(state[action.key], action.index, action.on) };
    case 'resetVideoChecks':
      return { ...state, videoChecks: [] };
    case 'setAgreement':
      return { ...state, agreement: { ...state.agreement, [action.key]: action.text } };
    case 'replace':
      return action.state;
    case 'reset':
      return initialState();
  }
}

interface CourseContextValue {
  state: CourseState;
  dispatch: (action: CourseAction) => void;
}

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [state, rawDispatch] = useReducer(reducer, undefined, loadState);
  // Save after learner actions only. Skip the initial load, and skip a reset
  // so cleared storage stays cleared (the original app behaved the same way).
  const skipSave = useRef(true);

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    saveState(state);
  }, [state]);

  const dispatch = useRef((action: CourseAction) => {
    if (action.type === 'reset') skipSave.current = true;
    rawDispatch(action);
  }).current;

  return <CourseContext.Provider value={{ state, dispatch }}>{children}</CourseContext.Provider>;
}

export function useCourse(): CourseContextValue {
  const value = useContext(CourseContext);
  if (!value) throw new Error('useCourse must be used inside CourseProvider');
  return value;
}

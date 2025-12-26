import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  type GamificationState,
  type SectionId,
  type Difficulty,
  type AchievementNotification,
  type CourseId,
  XP_CONFIG,
} from './types';
import { loadState, saveState } from './storage';
import { createDefaultState } from './defaults';
import { calculateLevel, calculateXP } from './xpCalculator';
import { updateStreak } from './streakManager';
import { calculateMastery } from './masteryCalculator';
import { checkAchievements } from './achievements';
import { getLogger } from '../utils/logger';

const logger = getLogger('Gamification');

// =============================================================================
// CONTEXT TYPES
// =============================================================================

interface GamificationContextValue {
  state: GamificationState;
  isLoading: boolean;
  notifications: AchievementNotification[];
  visitSection: (sectionId: number) => void;
  completeSection: (sectionId: number) => void;
  recordQuiz: (
    sectionId: number,
    difficulty: Difficulty,
    score: number,
    correctAnswers: number,
    totalQuestions: number
  ) => void;
  useVisualization: (sectionId: number, visualizationName: string) => void;
  dismissNotification: (id: string) => void;
  resetProgress: () => void;
}

// =============================================================================
// ACTIONS
// =============================================================================

type Action =
  | { type: 'LOAD_STATE'; payload: GamificationState }
  | { type: 'VISIT_SECTION'; payload: { sectionId: SectionId } }
  | { type: 'COMPLETE_SECTION'; payload: { sectionId: SectionId } }
  | { type: 'RECORD_QUIZ'; payload: { sectionId: SectionId; difficulty: Difficulty; score: number; correctAnswers: number; totalQuestions: number } }
  | { type: 'USE_VISUALIZATION'; payload: { sectionId: SectionId; name: string } }
  | { type: 'UPDATE_STREAK' }
  | { type: 'RESET_PROGRESS' };

// =============================================================================
// REDUCER
// =============================================================================

function gamificationReducer(state: GamificationState, action: Action): GamificationState {
  const now = new Date().toISOString();

  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'VISIT_SECTION': {
      const { sectionId } = action.payload;
      const existing = state.sections[sectionId];

      if (existing?.visitedAt) {
        return state; // Already visited
      }

      const newXP = state.user.totalXP + XP_CONFIG.SECTION_VISIT;

      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newXP,
          level: calculateLevel(newXP),
        },
        sections: {
          ...state.sections,
          [sectionId]: {
            sectionId,
            visitedAt: now,
            completedAt: existing?.completedAt ?? null,
            timeSpentSeconds: existing?.timeSpentSeconds ?? 0,
            quizAttempts: existing?.quizAttempts ?? [],
            masteryLevel: existing?.masteryLevel ?? 'learning',
            visualizationsInteracted: existing?.visualizationsInteracted ?? [],
          },
        },
        dailyGoals: {
          ...state.dailyGoals,
          xpEarned: state.dailyGoals.xpEarned + XP_CONFIG.SECTION_VISIT,
        },
        lastUpdated: now,
      };
    }

    case 'COMPLETE_SECTION': {
      const { sectionId } = action.payload;
      const existing = state.sections[sectionId];

      if (existing?.completedAt) {
        return state; // Already completed
      }

      // Guard against completing a section that was never visited
      if (!existing) {
        logger.warn(`Attempted to complete unvisited section: ${sectionId}`);
        return state;
      }

      const newXP = state.user.totalXP + XP_CONFIG.SECTION_COMPLETE;
      const newSectionsCompleted = [...state.user.sectionsCompleted, sectionId];

      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newXP,
          level: calculateLevel(newXP),
          sectionsCompleted: newSectionsCompleted,
        },
        sections: {
          ...state.sections,
          [sectionId]: {
            ...existing,
            completedAt: now,
            masteryLevel: calculateMastery(existing),
          },
        },
        dailyGoals: {
          ...state.dailyGoals,
          xpEarned: state.dailyGoals.xpEarned + XP_CONFIG.SECTION_COMPLETE,
        },
        lastUpdated: now,
      };
    }

    case 'RECORD_QUIZ': {
      const { sectionId, difficulty, score, correctAnswers, totalQuestions } = action.payload;
      const existing = state.sections[sectionId];

      // Guard against recording quiz for unvisited section
      if (!existing) {
        logger.warn(`Section ${sectionId} was not visited before quiz`);
        return state;
      }

      const baseXP = calculateXP(difficulty, score);
      const isPerfect = correctAnswers === totalQuestions;
      const xpEarned = isPerfect ? Math.round(baseXP * (1 + XP_CONFIG.QUIZ_PERFECT_BONUS)) : baseXP;
      const newXP = state.user.totalXP + xpEarned;

      const newAttempt = {
        timestamp: now,
        difficulty,
        score,
        correctAnswers,
        totalQuestions,
      };

      const newAttempts = [...existing.quizAttempts, newAttempt];
      const updatedSection = { ...existing, quizAttempts: newAttempts };

      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newXP,
          level: calculateLevel(newXP),
          quizzesTaken: state.user.quizzesTaken + 1,
          perfectQuizzes: isPerfect ? state.user.perfectQuizzes + 1 : state.user.perfectQuizzes,
        },
        sections: {
          ...state.sections,
          [sectionId]: {
            ...updatedSection,
            masteryLevel: calculateMastery(updatedSection),
          },
        },
        dailyGoals: {
          ...state.dailyGoals,
          xpEarned: state.dailyGoals.xpEarned + xpEarned,
        },
        lastUpdated: now,
      };
    }

    case 'USE_VISUALIZATION': {
      const { sectionId, name } = action.payload;
      const existing = state.sections[sectionId];

      if (existing?.visualizationsInteracted.includes(name)) {
        return state; // Already used this visualization
      }

      // Guard against using visualization for unvisited section
      if (!existing) {
        logger.warn(`Section ${sectionId} was not visited before visualization`);
        return state;
      }

      const newXP = state.user.totalXP + XP_CONFIG.VISUALIZATION_USE;
      const newVisualizations = [...existing.visualizationsInteracted, name];

      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newXP,
          level: calculateLevel(newXP),
          visualizationsUsed: state.user.visualizationsUsed + 1,
        },
        sections: {
          ...state.sections,
          [sectionId]: {
            ...existing,
            visualizationsInteracted: newVisualizations,
          },
        },
        dailyGoals: {
          ...state.dailyGoals,
          xpEarned: state.dailyGoals.xpEarned + XP_CONFIG.VISUALIZATION_USE,
        },
        lastUpdated: now,
      };
    }

    case 'UPDATE_STREAK':
      return updateStreak(state);

    case 'RESET_PROGRESS':
      return createDefaultState();

    default:
      return state;
  }
}

// =============================================================================
// CONTEXT
// =============================================================================

const GamificationContext = createContext<GamificationContextValue | null>(null);

interface GamificationProviderProps {
  children: ReactNode;
  courseId: CourseId;
}

export function GamificationProvider({ children, courseId }: GamificationProviderProps) {
  const [state, dispatch] = useReducer(gamificationReducer, createDefaultState());
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);

  // Helper to create section ID - memoized with courseId
  const makeSectionId = useCallback(
    (numericId: number): SectionId => {
      return `${courseId}:${numericId}` as SectionId;
    },
    [courseId]
  );

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      dispatch({ type: 'LOAD_STATE', payload: saved });
    }
    setIsLoading(false);
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    if (!isLoading) {
      saveState(state);
    }
  }, [state, isLoading]);

  // Update streak on mount
  useEffect(() => {
    if (!isLoading) {
      dispatch({ type: 'UPDATE_STREAK' });
    }
  }, [isLoading]);

  // Check achievements on state changes
  useEffect(() => {
    if (!isLoading) {
      const newAchievements = checkAchievements(state);
      if (newAchievements.length > 0) {
        setNotifications((prev) => [...prev, ...newAchievements]);
      }
    }
  }, [state, isLoading]);

  // Memoized action handlers
  const visitSection = useCallback(
    (sectionId: number) => {
      dispatch({ type: 'VISIT_SECTION', payload: { sectionId: makeSectionId(sectionId) } });
    },
    [makeSectionId]
  );

  const completeSection = useCallback(
    (sectionId: number) => {
      dispatch({ type: 'COMPLETE_SECTION', payload: { sectionId: makeSectionId(sectionId) } });
    },
    [makeSectionId]
  );

  const recordQuiz = useCallback(
    (sectionId: number, difficulty: Difficulty, score: number, correctAnswers: number, totalQuestions: number) => {
      dispatch({
        type: 'RECORD_QUIZ',
        payload: { sectionId: makeSectionId(sectionId), difficulty, score, correctAnswers, totalQuestions },
      });
    },
    [makeSectionId]
  );

  const useVisualization = useCallback(
    (sectionId: number, name: string) => {
      dispatch({ type: 'USE_VISUALIZATION', payload: { sectionId: makeSectionId(sectionId), name } });
    },
    [makeSectionId]
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET_PROGRESS' });
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo<GamificationContextValue>(
    () => ({
      state,
      isLoading,
      notifications,
      visitSection,
      completeSection,
      recordQuiz,
      useVisualization,
      dismissNotification,
      resetProgress,
    }),
    [
      state,
      isLoading,
      notifications,
      visitSection,
      completeSection,
      recordQuiz,
      useVisualization,
      dismissNotification,
      resetProgress,
    ]
  );

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}

// =============================================================================
// GAMIFICATION TYPES
// =============================================================================
// Shared type definitions for the gamification system.
// These types are used across all courses for consistent XP tracking.
// =============================================================================

/**
 * Course identifier type
 */
export type CourseId = 'ba' | 'aa' | 'crypto' | 'linalg' | 'template' | string;

/**
 * Section ID format: "courseId:sectionNumber" (e.g., "ba:5", "aa:12")
 */
export type SectionId = `${CourseId}:${number}`;

/**
 * Mastery levels for section progress
 */
export type MasteryLevel = 'none' | 'learning' | 'familiar' | 'mastered';

/**
 * Quiz difficulty levels
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Achievement categories
 */
export type AchievementCategory = 'progress' | 'mastery' | 'dedication' | 'exploration';

/**
 * Individual quiz attempt record
 */
export interface QuizAttempt {
  timestamp: string;
  difficulty: Difficulty;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

/**
 * Per-section progress tracking
 */
export interface SectionProgress {
  sectionId: SectionId;
  visitedAt: string | null;
  completedAt: string | null;
  timeSpentSeconds: number;
  quizAttempts: QuizAttempt[];
  masteryLevel: MasteryLevel;
  visualizationsInteracted: string[];
}

/**
 * User-level progress aggregates
 */
export interface UserProgress {
  totalXP: number;
  level: number;
  sectionsCompleted: SectionId[];
  partsCompleted: string[];
  quizzesTaken: number;
  perfectQuizzes: number;
  visualizationsUsed: number;
  totalTimeSpentMinutes: number;
  joinedAt: string;
}

/**
 * Achievement progress tracking
 */
export interface AchievementProgress {
  id: string;
  unlockedAt: string | null;
  progress: number;
  target: number;
}

/**
 * Daily streak tracking
 */
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  freezesRemaining: number;
  freezeUsedToday: boolean;
}

/**
 * Daily goal state
 */
export interface DailyGoalState {
  date: string;
  xpEarned: number;
  xpGoal: number;
  completed: boolean;
}

/**
 * Complete gamification state (stored in localStorage)
 */
export interface GamificationState {
  version: number;
  user: UserProgress;
  sections: Record<SectionId, SectionProgress>;
  achievements: AchievementProgress[];
  streak: StreakData;
  dailyGoals: DailyGoalState;
  lastUpdated: string;
}

/**
 * Achievement notification for toasts
 */
export interface AchievementNotification {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  xpReward: number;
  timestamp: number;
}

// =============================================================================
// XP CONFIGURATION
// =============================================================================

export const XP_CONFIG = {
  SECTION_VISIT: 10,
  SECTION_COMPLETE: 25,
  QUIZ_EASY: 15,
  QUIZ_MEDIUM: 25,
  QUIZ_HARD: 40,
  QUIZ_PERFECT_BONUS: 0.5,  // 50% bonus for perfect score
  VISUALIZATION_USE: 5,
  PART_COMPLETE_BONUS: 50,
  STREAK_DAILY_BONUS: 5,
  STREAK_BONUS_CAP: 50,
} as const;

export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  850,    // Level 5
  1300,   // Level 6
  1900,   // Level 7
  2650,   // Level 8
  3550,   // Level 9
  4600,   // Level 10
] as const;

export const DAILY_XP_GOAL = 50;

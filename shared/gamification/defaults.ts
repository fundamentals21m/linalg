import type { GamificationState } from './types';
import { DAILY_XP_GOAL } from './types';

/**
 * Create default gamification state for new users
 */
export function createDefaultState(): GamificationState {
  const now = new Date().toISOString();
  const today = now.split('T')[0];

  return {
    version: 2,
    user: {
      totalXP: 0,
      level: 1,
      sectionsCompleted: [],
      partsCompleted: [],
      quizzesTaken: 0,
      perfectQuizzes: 0,
      visualizationsUsed: 0,
      totalTimeSpentMinutes: 0,
      joinedAt: now,
    },
    sections: {},
    achievements: getDefaultAchievements(),
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      freezesRemaining: 2,
      freezeUsedToday: false,
    },
    dailyGoals: {
      date: today,
      xpEarned: 0,
      xpGoal: DAILY_XP_GOAL,
      completed: false,
    },
    lastUpdated: now,
  };
}

/**
 * Get default achievement progress entries
 */
function getDefaultAchievements() {
  return [
    // Progress achievements
    { id: 'first-section', unlockedAt: null, progress: 0, target: 1 },
    { id: 'ten-sections', unlockedAt: null, progress: 0, target: 10 },
    { id: 'half-course', unlockedAt: null, progress: 0, target: 50 },
    { id: 'course-complete', unlockedAt: null, progress: 0, target: 100 },

    // Mastery achievements
    { id: 'first-mastery', unlockedAt: null, progress: 0, target: 1 },
    { id: 'quiz-master', unlockedAt: null, progress: 0, target: 10 },
    { id: 'perfectionist', unlockedAt: null, progress: 0, target: 5 },

    // Dedication achievements
    { id: 'week-streak', unlockedAt: null, progress: 0, target: 7 },
    { id: 'month-streak', unlockedAt: null, progress: 0, target: 30 },
    { id: 'level-5', unlockedAt: null, progress: 0, target: 5 },
    { id: 'level-10', unlockedAt: null, progress: 0, target: 10 },

    // Exploration achievements
    { id: 'first-visualization', unlockedAt: null, progress: 0, target: 1 },
    { id: 'explorer', unlockedAt: null, progress: 0, target: 10 },
  ];
}

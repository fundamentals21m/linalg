import type { GamificationState } from './types';
import { DAILY_XP_GOAL } from './types';

/**
 * Update streak based on current activity
 */
export function updateStreak(state: GamificationState): GamificationState {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const lastActivity = state.streak.lastActivityDate;

  // Reset daily goals if it's a new day
  if (state.dailyGoals.date !== today) {
    state = {
      ...state,
      dailyGoals: {
        date: today,
        xpEarned: 0,
        xpGoal: DAILY_XP_GOAL,
        completed: false,
      },
      streak: {
        ...state.streak,
        freezeUsedToday: false,
      },
    };
  }

  if (!lastActivity) {
    // First activity ever
    return {
      ...state,
      streak: {
        ...state.streak,
        currentStreak: 1,
        longestStreak: Math.max(1, state.streak.longestStreak),
        lastActivityDate: today,
      },
    };
  }

  const lastDate = new Date(lastActivity);
  const daysDiff = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    // Same day, no change needed
    return state;
  }

  if (daysDiff === 1) {
    // Consecutive day - increment streak
    const newStreak = state.streak.currentStreak + 1;
    return {
      ...state,
      streak: {
        ...state.streak,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, state.streak.longestStreak),
        lastActivityDate: today,
      },
    };
  }

  if (daysDiff === 2 && state.streak.freezesRemaining > 0 && !state.streak.freezeUsedToday) {
    // Use streak freeze
    return {
      ...state,
      streak: {
        ...state.streak,
        freezesRemaining: state.streak.freezesRemaining - 1,
        freezeUsedToday: true,
        lastActivityDate: today,
      },
    };
  }

  // Streak broken
  return {
    ...state,
    streak: {
      ...state.streak,
      currentStreak: 1,
      lastActivityDate: today,
    },
  };
}

/**
 * Check if daily goal is completed
 */
export function checkDailyGoalCompletion(state: GamificationState): GamificationState {
  if (state.dailyGoals.completed) return state;

  if (state.dailyGoals.xpEarned >= state.dailyGoals.xpGoal) {
    return {
      ...state,
      dailyGoals: {
        ...state.dailyGoals,
        completed: true,
      },
    };
  }

  return state;
}

/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { updateStreak, checkDailyGoalCompletion } from './streakManager';
import type { GamificationState } from './types';
import { DAILY_XP_GOAL } from './types';

/**
 * Helper to create a base GamificationState for testing
 */
function createMockState(overrides?: Partial<GamificationState>): GamificationState {
  const today = new Date().toISOString().split('T')[0];
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
      joinedAt: today,
    },
    sections: {},
    achievements: [],
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
    lastUpdated: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Helper to get date string for N days ago
 */
function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

describe('updateStreak', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set a fixed date for consistent testing
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('first activity ever', () => {
    it('should initialize streak to 1 for first activity', () => {
      const state = createMockState({
        streak: {
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: null,
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(1);
      expect(result.streak.longestStreak).toBe(1);
      expect(result.streak.lastActivityDate).toBe('2024-06-15');
    });

    it('should preserve existing longestStreak if higher', () => {
      const state = createMockState({
        streak: {
          currentStreak: 0,
          longestStreak: 10,
          lastActivityDate: null,
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(1);
      expect(result.streak.longestStreak).toBe(10);
    });
  });

  describe('same day activity', () => {
    it('should not change streak for same day activity', () => {
      const state = createMockState({
        streak: {
          currentStreak: 5,
          longestStreak: 10,
          lastActivityDate: '2024-06-15',
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(5);
      expect(result.streak.longestStreak).toBe(10);
      expect(result.streak.lastActivityDate).toBe('2024-06-15');
    });
  });

  describe('consecutive day activity', () => {
    it('should increment streak for consecutive day', () => {
      const state = createMockState({
        streak: {
          currentStreak: 5,
          longestStreak: 5,
          lastActivityDate: '2024-06-14', // yesterday
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(6);
      expect(result.streak.longestStreak).toBe(6);
      expect(result.streak.lastActivityDate).toBe('2024-06-15');
    });

    it('should update longestStreak when current exceeds it', () => {
      const state = createMockState({
        streak: {
          currentStreak: 10,
          longestStreak: 10,
          lastActivityDate: '2024-06-14',
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(11);
      expect(result.streak.longestStreak).toBe(11);
    });

    it('should not update longestStreak when current is less', () => {
      const state = createMockState({
        streak: {
          currentStreak: 3,
          longestStreak: 15,
          lastActivityDate: '2024-06-14',
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(4);
      expect(result.streak.longestStreak).toBe(15);
    });
  });

  describe('streak freeze usage', () => {
    it('should use freeze when missing one day and freezes available', () => {
      const state = createMockState({
        streak: {
          currentStreak: 5,
          longestStreak: 10,
          lastActivityDate: '2024-06-13', // 2 days ago
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(5); // preserved
      expect(result.streak.freezesRemaining).toBe(1); // one used
      expect(result.streak.freezeUsedToday).toBe(true);
      expect(result.streak.lastActivityDate).toBe('2024-06-15');
    });

    it('should not use freeze when already used today', () => {
      const state = createMockState({
        streak: {
          currentStreak: 5,
          longestStreak: 10,
          lastActivityDate: '2024-06-13',
          freezesRemaining: 2,
          freezeUsedToday: true, // already used
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(1); // streak broken
      expect(result.streak.freezesRemaining).toBe(2); // not consumed
    });

    it('should not use freeze when no freezes remaining', () => {
      const state = createMockState({
        streak: {
          currentStreak: 5,
          longestStreak: 10,
          lastActivityDate: '2024-06-13',
          freezesRemaining: 0,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(1); // streak broken
      expect(result.streak.freezesRemaining).toBe(0);
    });
  });

  describe('streak broken', () => {
    it('should reset streak when missing more than one day', () => {
      const state = createMockState({
        streak: {
          currentStreak: 10,
          longestStreak: 10,
          lastActivityDate: '2024-06-12', // 3 days ago
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(1);
      expect(result.streak.longestStreak).toBe(10); // preserved
      expect(result.streak.lastActivityDate).toBe('2024-06-15');
    });

    it('should reset streak for very old last activity', () => {
      const state = createMockState({
        streak: {
          currentStreak: 50,
          longestStreak: 50,
          lastActivityDate: '2024-01-01', // months ago
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.streak.currentStreak).toBe(1);
      expect(result.streak.longestStreak).toBe(50);
    });
  });

  describe('daily goals reset', () => {
    it('should reset daily goals on new day', () => {
      const state = createMockState({
        dailyGoals: {
          date: '2024-06-14', // yesterday
          xpEarned: 100,
          xpGoal: DAILY_XP_GOAL,
          completed: true,
        },
        streak: {
          currentStreak: 5,
          longestStreak: 5,
          lastActivityDate: '2024-06-14',
          freezesRemaining: 2,
          freezeUsedToday: true,
        },
      });

      const result = updateStreak(state);

      expect(result.dailyGoals.date).toBe('2024-06-15');
      expect(result.dailyGoals.xpEarned).toBe(0);
      expect(result.dailyGoals.completed).toBe(false);
      expect(result.streak.freezeUsedToday).toBe(false); // reset
    });

    it('should not reset daily goals on same day', () => {
      const state = createMockState({
        dailyGoals: {
          date: '2024-06-15', // today
          xpEarned: 30,
          xpGoal: DAILY_XP_GOAL,
          completed: false,
        },
        streak: {
          currentStreak: 5,
          longestStreak: 5,
          lastActivityDate: '2024-06-15',
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
      });

      const result = updateStreak(state);

      expect(result.dailyGoals.xpEarned).toBe(30); // preserved
      expect(result.dailyGoals.completed).toBe(false);
    });
  });
});

describe('checkDailyGoalCompletion', () => {
  it('should mark goal as completed when xpEarned >= xpGoal', () => {
    const state = createMockState({
      dailyGoals: {
        date: '2024-06-15',
        xpEarned: DAILY_XP_GOAL,
        xpGoal: DAILY_XP_GOAL,
        completed: false,
      },
    });

    const result = checkDailyGoalCompletion(state);

    expect(result.dailyGoals.completed).toBe(true);
  });

  it('should mark goal as completed when xpEarned exceeds xpGoal', () => {
    const state = createMockState({
      dailyGoals: {
        date: '2024-06-15',
        xpEarned: DAILY_XP_GOAL + 50,
        xpGoal: DAILY_XP_GOAL,
        completed: false,
      },
    });

    const result = checkDailyGoalCompletion(state);

    expect(result.dailyGoals.completed).toBe(true);
  });

  it('should not mark goal as completed when xpEarned < xpGoal', () => {
    const state = createMockState({
      dailyGoals: {
        date: '2024-06-15',
        xpEarned: DAILY_XP_GOAL - 1,
        xpGoal: DAILY_XP_GOAL,
        completed: false,
      },
    });

    const result = checkDailyGoalCompletion(state);

    expect(result.dailyGoals.completed).toBe(false);
  });

  it('should return unchanged state if already completed', () => {
    const state = createMockState({
      dailyGoals: {
        date: '2024-06-15',
        xpEarned: 25, // below goal but already completed
        xpGoal: DAILY_XP_GOAL,
        completed: true,
      },
    });

    const result = checkDailyGoalCompletion(state);

    expect(result).toBe(state); // same reference
    expect(result.dailyGoals.completed).toBe(true);
  });

  it('should handle zero xpEarned', () => {
    const state = createMockState({
      dailyGoals: {
        date: '2024-06-15',
        xpEarned: 0,
        xpGoal: DAILY_XP_GOAL,
        completed: false,
      },
    });

    const result = checkDailyGoalCompletion(state);

    expect(result.dailyGoals.completed).toBe(false);
  });

  it('should handle custom xpGoal values', () => {
    const customGoal = 100;
    const state = createMockState({
      dailyGoals: {
        date: '2024-06-15',
        xpEarned: customGoal,
        xpGoal: customGoal,
        completed: false,
      },
    });

    const result = checkDailyGoalCompletion(state);

    expect(result.dailyGoals.completed).toBe(true);
  });
});

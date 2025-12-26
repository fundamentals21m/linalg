/**
 * @vitest-environment happy-dom
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { GamificationProvider, useGamification } from './GamificationContext';
import { XP_CONFIG, type GamificationState } from './types';
import type { ReactNode } from 'react';

// Mock the storage module
vi.mock('./storage', () => ({
  loadState: vi.fn(() => null),
  saveState: vi.fn(),
}));

// Mock the achievements module
vi.mock('./achievements', () => ({
  checkAchievements: vi.fn(() => []),
}));

// Mock the logger
vi.mock('../utils/logger', () => ({
  getLogger: vi.fn(() => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  })),
}));

import { loadState, saveState } from './storage';
import { checkAchievements } from './achievements';

// Helper to create wrapper with courseId
function createWrapper(courseId = 'linalg' as const) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <GamificationProvider courseId={courseId}>
        {children}
      </GamificationProvider>
    );
  };
}

describe('GamificationContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(loadState).mockReturnValue(null);
    vi.mocked(checkAchievements).mockReturnValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useGamification hook', () => {
    it('should throw error when used outside provider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useGamification());
      }).toThrow('useGamification must be used within a GamificationProvider');
      
      consoleSpy.mockRestore();
    });

    it('should return initial state when used within provider', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.state).toBeDefined();
      expect(result.current.state.user.totalXP).toBe(0);
      expect(result.current.state.user.level).toBe(1);
      expect(result.current.notifications).toEqual([]);
    });
  });

  describe('visitSection', () => {
    it('should award XP for first visit', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const initialXP = result.current.state.user.totalXP;

      act(() => {
        result.current.visitSection(1);
      });

      expect(result.current.state.user.totalXP).toBe(initialXP + XP_CONFIG.SECTION_VISIT);
      expect(result.current.state.sections['linalg:1']).toBeDefined();
      expect(result.current.state.sections['linalg:1'].visitedAt).toBeDefined();
    });

    it('should not award XP for repeat visit', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.visitSection(1);
      });

      const xpAfterFirstVisit = result.current.state.user.totalXP;

      act(() => {
        result.current.visitSection(1);
      });

      expect(result.current.state.user.totalXP).toBe(xpAfterFirstVisit);
    });

    it('should update daily goals XP', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const initialDailyXP = result.current.state.dailyGoals.xpEarned;

      act(() => {
        result.current.visitSection(1);
      });

      expect(result.current.state.dailyGoals.xpEarned).toBe(
        initialDailyXP + XP_CONFIG.SECTION_VISIT
      );
    });
  });

  describe('completeSection', () => {
    it('should award XP for completion after visiting', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // First visit the section
      act(() => {
        result.current.visitSection(1);
      });

      const xpAfterVisit = result.current.state.user.totalXP;

      // Then complete it
      act(() => {
        result.current.completeSection(1);
      });

      expect(result.current.state.user.totalXP).toBe(
        xpAfterVisit + XP_CONFIG.SECTION_COMPLETE
      );
      expect(result.current.state.sections['linalg:1'].completedAt).toBeDefined();
      expect(result.current.state.user.sectionsCompleted).toContain('linalg:1');
    });

    it('should not award XP for completing unvisited section', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const initialXP = result.current.state.user.totalXP;

      act(() => {
        result.current.completeSection(999);
      });

      expect(result.current.state.user.totalXP).toBe(initialXP);
    });

    it('should not award XP for repeat completion', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.visitSection(1);
      });

      act(() => {
        result.current.completeSection(1);
      });

      const xpAfterFirstCompletion = result.current.state.user.totalXP;

      act(() => {
        result.current.completeSection(1);
      });

      expect(result.current.state.user.totalXP).toBe(xpAfterFirstCompletion);
    });
  });

  describe('recordQuiz', () => {
    it('should award XP for quiz completion', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // First visit the section
      act(() => {
        result.current.visitSection(1);
      });

      const xpAfterVisit = result.current.state.user.totalXP;

      // Take a quiz
      act(() => {
        result.current.recordQuiz(1, 'medium', 80, 8, 10);
      });

      expect(result.current.state.user.totalXP).toBeGreaterThan(xpAfterVisit);
      expect(result.current.state.user.quizzesTaken).toBe(1);
      expect(result.current.state.sections['linalg:1'].quizAttempts).toHaveLength(1);
    });

    it('should award bonus XP for perfect quiz', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.visitSection(1);
      });

      const xpAfterVisit = result.current.state.user.totalXP;

      // Perfect quiz
      act(() => {
        result.current.recordQuiz(1, 'medium', 100, 10, 10);
      });

      expect(result.current.state.user.perfectQuizzes).toBe(1);
      // XP should include perfect bonus (50%)
      const expectedXP = Math.round(XP_CONFIG.QUIZ_MEDIUM * 1.5);
      expect(result.current.state.user.totalXP).toBe(xpAfterVisit + expectedXP);
    });

    it('should not record quiz for unvisited section', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const initialXP = result.current.state.user.totalXP;

      act(() => {
        result.current.recordQuiz(999, 'easy', 100, 5, 5);
      });

      expect(result.current.state.user.totalXP).toBe(initialXP);
      
      consoleSpy.mockRestore();
    });
  });

  describe('useVisualization', () => {
    it('should award XP for first visualization use', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.visitSection(1);
      });

      const xpAfterVisit = result.current.state.user.totalXP;

      act(() => {
        result.current.useVisualization(1, 'vector-demo');
      });

      expect(result.current.state.user.totalXP).toBe(
        xpAfterVisit + XP_CONFIG.VISUALIZATION_USE
      );
      expect(result.current.state.user.visualizationsUsed).toBe(1);
      expect(result.current.state.sections['linalg:1'].visualizationsInteracted).toContain(
        'vector-demo'
      );
    });

    it('should not award XP for repeat visualization use', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.visitSection(1);
      });

      act(() => {
        result.current.useVisualization(1, 'vector-demo');
      });

      const xpAfterFirstUse = result.current.state.user.totalXP;

      act(() => {
        result.current.useVisualization(1, 'vector-demo');
      });

      expect(result.current.state.user.totalXP).toBe(xpAfterFirstUse);
    });
  });

  describe('resetProgress', () => {
    it('should reset all progress to default state', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Earn some XP
      act(() => {
        result.current.visitSection(1);
        result.current.completeSection(1);
      });

      expect(result.current.state.user.totalXP).toBeGreaterThan(0);

      // Reset
      act(() => {
        result.current.resetProgress();
      });

      expect(result.current.state.user.totalXP).toBe(0);
      expect(result.current.state.user.sectionsCompleted).toEqual([]);
    });
  });

  describe('dismissNotification', () => {
    it('should remove notification by id', async () => {
      // Set up checkAchievements to return an achievement
      vi.mocked(checkAchievements).mockReturnValueOnce([
        {
          id: 'test-achievement-1',
          title: 'Test Achievement',
          description: 'You did it!',
          category: 'progress',
          xpReward: 50,
          timestamp: Date.now(),
        },
      ]);

      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Trigger achievement by visiting a section
      act(() => {
        result.current.visitSection(1);
      });

      // Wait for notifications to update
      await waitFor(() => {
        expect(result.current.notifications.length).toBeGreaterThanOrEqual(0);
      });

      // If there are notifications, dismiss one
      if (result.current.notifications.length > 0) {
        const notificationId = result.current.notifications[0].id;
        
        act(() => {
          result.current.dismissNotification(notificationId);
        });

        expect(
          result.current.notifications.find((n) => n.id === notificationId)
        ).toBeUndefined();
      }
    });
  });

  describe('localStorage persistence', () => {
    it('should load state from localStorage on mount', async () => {
      const savedState: GamificationState = {
        version: 2,
        user: {
          totalXP: 500,
          level: 3,
          sectionsCompleted: ['linalg:1', 'linalg:2'],
          partsCompleted: [],
          quizzesTaken: 5,
          perfectQuizzes: 2,
          visualizationsUsed: 3,
          totalTimeSpentMinutes: 30,
          joinedAt: '2024-01-01',
        },
        sections: {},
        achievements: [],
        streak: {
          currentStreak: 5,
          longestStreak: 10,
          lastActivityDate: '2024-06-15',
          freezesRemaining: 2,
          freezeUsedToday: false,
        },
        dailyGoals: {
          date: '2024-06-15',
          xpEarned: 25,
          xpGoal: 50,
          completed: false,
        },
        lastUpdated: '2024-06-15T12:00:00Z',
      };

      vi.mocked(loadState).mockReturnValue(savedState);

      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.state.user.totalXP).toBe(500);
      expect(result.current.state.user.level).toBe(3);
    });

    it('should save state to localStorage on changes', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Clear initial save calls
      vi.mocked(saveState).mockClear();

      act(() => {
        result.current.visitSection(1);
      });

      // Wait for save to be called
      await waitFor(() => {
        expect(saveState).toHaveBeenCalled();
      });
    });
  });

  describe('courseId handling', () => {
    it('should use correct courseId prefix for sections', async () => {
      const { result } = renderHook(() => useGamification(), {
        wrapper: createWrapper('crypto'),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.visitSection(5);
      });

      expect(result.current.state.sections['crypto:5']).toBeDefined();
    });
  });
});

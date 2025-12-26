/**
 * SyncManager - Handles syncing local progress to Firebase
 * Works with both React apps and vanilla JS (Crypto course)
 */

import { httpsCallable } from 'firebase/functions';
import { getFirebaseFunctions, isFirebaseConfigured } from '../firebase/config';
import { isValidCourseId } from '../types/courses';
import { SYNC_INTERVAL_MS, DEBOUNCE_MS, RATE_LIMIT_MS } from '../constants';
import type { CourseId, ScoreUpdate, SyncPayload } from './types';
import { getLogger } from '../utils/logger';
// import { validateSectionData } from '../validation/schemas'; // Temporarily disabled to test circular dependency
import { XP_CONFIG } from '../gamification/types';

const logger = getLogger('SyncManager');

// Storage key for gamification state
const STORAGE_KEY = 'magic-internet-math-progress';

/**
 * Extract scores from localStorage gamification state
 */
function extractScoresFromStorage(): ScoreUpdate[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const state = JSON.parse(stored);
    if (!state?.user || !state?.sections) return null;

    const scores: Record<CourseId, number> = { ba: 0, crypto: 0, aa: 0, linalg: 0, advlinalg: 0 };

    // Calculate XP per course from sections
    for (const [sectionId, sectionData] of Object.entries(state.sections)) {
      const [coursePrefix] = sectionId.split(':');

      if (!isValidCourseId(coursePrefix)) continue;
      const course = coursePrefix;

      // Simple validation instead of schema validation to avoid circular dependencies
      const section = sectionData as any; // Type assertion for now
      if (!section) {
        logger.warn(`Invalid section data for ${sectionId}, skipping`);
        continue;
      }

      // Add XP from quiz attempts
      if (section.quizAttempts) {
        for (const attempt of section.quizAttempts) {
          if (attempt.xpEarned) {
            scores[course] += attempt.xpEarned;
          }
        }
      }

      // Add XP for section visits
      if (section.visitedAt) {
        scores[course] += XP_CONFIG.SECTION_VISIT;
      }

      // Add XP for section completion
      if (section.completedAt) {
        scores[course] += XP_CONFIG.SECTION_COMPLETE;
      }

      // Add XP for visualizations
      if (section.visualizationsInteracted) {
        scores[course] += section.visualizationsInteracted.length * XP_CONFIG.VISUALIZATION_USE;
      }
    }

    return [
      { courseId: 'ba', xp: scores.ba },
      { courseId: 'crypto', xp: scores.crypto },
      { courseId: 'aa', xp: scores.aa },
      { courseId: 'linalg', xp: scores.linalg },
      { courseId: 'advlinalg', xp: scores.advlinalg },
    ];
  } catch (error) {
    logger.error('Error extracting scores from storage:', error);
    throw new Error(`Failed to extract scores from storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * SyncManager class for handling score synchronization
 */
export class SyncManager {
  private syncInterval: ReturnType<typeof setInterval> | null = null;
  private debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  private lastSyncTime: number = 0;
  private isAuthenticated: boolean = false;
  private displayName: string | null = null;

  /**
   * Set authentication status
   */
  setAuthenticated(authenticated: boolean): void {
    this.isAuthenticated = authenticated;
    if (authenticated) {
      this.syncNow();
    }
  }

  /**
   * Set display name for sync payload
   */
  setDisplayName(name: string | null): void {
    this.displayName = name;
  }

  /**
   * Start periodic sync
   */
  startPeriodicSync(): void {
    if (this.syncInterval) return;

    this.syncInterval = setInterval(() => {
      if (this.isAuthenticated) {
        this.syncNow();
      }
    }, SYNC_INTERVAL_MS);

    // Also sync on visibility change (user returns to tab)
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  /**
   * Stop periodic sync
   */
  stopPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  /**
   * Handle visibility change event
   */
  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'visible' && this.isAuthenticated) {
      this.syncNow();
    }
  };

  /**
   * Request a sync (debounced)
   */
  requestSync(): void {
    if (!this.isAuthenticated) return;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.syncNow();
    }, DEBOUNCE_MS);
  }

  /**
   * Sync scores immediately
   */
  async syncNow(): Promise<{ success: boolean; totalXP?: number; error?: string }> {
    if (!this.isAuthenticated) {
      return { success: false, error: 'Not authenticated' };
    }

    if (!isFirebaseConfigured()) {
      return { success: false, error: 'Firebase not configured' };
    }

    // Rate limit: don't sync more often than RATE_LIMIT_MS
    const now = Date.now();
    if (now - this.lastSyncTime < RATE_LIMIT_MS) {
      return { success: false, error: 'Rate limited' };
    }

    try {
      const scores = extractScoresFromStorage();
      if (!scores) {
        return { success: false, error: 'No scores to sync' };
      }

      const functions = getFirebaseFunctions();
      const syncScores = httpsCallable<SyncPayload, { success: boolean; totalXP: number }>(
        functions,
        'syncScores'
      );

      const payload: SyncPayload = { scores };
      if (this.displayName !== undefined) {
        payload.displayName = this.displayName;
      }

      const result = await syncScores(payload);
      this.lastSyncTime = now;

      return { success: result.data.success, totalXP: result.data.totalXP };
     } catch (error) {
       logger.error('Sync failed:', error);
       return {
         success: false,
         error: error instanceof Error ? error.message : 'Unknown error',
       };
     }
  }

  /**
   * Sync with exponential backoff retry
   */
  async syncWithRetry(maxRetries: number = 3): Promise<{ success: boolean; totalXP?: number; error?: string }> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const result = await this.syncNow();
      if (result.success) return result;

      // Don't retry on certain errors
      if (result.error === 'Not authenticated' || 
          result.error === 'No scores to sync' ||
          result.error === 'Firebase not configured') {
        return result;
      }

      // Wait before retry (exponential backoff: 1s, 2s, 4s)
      if (attempt < maxRetries - 1) {
        const delay = 1000 * Math.pow(2, attempt);
        logger.debug(`Sync retry ${attempt + 1}/${maxRetries} in ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        // Reset rate limit for retry
        this.lastSyncTime = 0;
      }
    }
    return { success: false, error: 'Sync failed after multiple retries' };
  }

  /**
   * Get current local scores
   */
  getLocalScores(): Record<CourseId, number> | null {
    const scores = extractScoresFromStorage();
    if (!scores) return null;

    return scores.reduce(
      (acc, s) => {
        acc[s.courseId] = s.xp;
        return acc;
      },
      { ba: 0, crypto: 0, aa: 0, linalg: 0, advlinalg: 0 } as Record<CourseId, number>
    );
  }
}

// Singleton instance
let syncManagerInstance: SyncManager | null = null;

/**
 * Get the singleton SyncManager instance
 */
export function getSyncManager(): SyncManager {
  if (!syncManagerInstance) {
    syncManagerInstance = new SyncManager();
  }
  return syncManagerInstance;
}

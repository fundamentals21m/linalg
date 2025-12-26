import type { GamificationState } from './types';
import { getLogger } from '../utils/logger';

const logger = getLogger('Storage');

const STORAGE_KEY = 'magic-internet-math-progress';
const CURRENT_VERSION = 2;

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Load gamification state from localStorage
 */
export function loadState(): GamificationState | null {
  if (!isLocalStorageAvailable()) {
    logger.warn('localStorage is not available');
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved) as GamificationState;

    // Version migration if needed
    if (parsed.version !== CURRENT_VERSION) {
      logger.info(`Migrating state from v${parsed.version} to v${CURRENT_VERSION}`);
      parsed.version = CURRENT_VERSION;
      // Migration: ensure all required fields exist
    }

    // Basic validation - check required fields exist
    if (!parsed.user || !parsed.sections || !parsed.streak) {
      logger.warn('Invalid gamification state structure in localStorage');
      return null;
    }

    return parsed;
  } catch (error) {
    logger.error('Failed to load gamification state:', error);
    // Clear corrupted data to prevent persistent failures
    try {
      localStorage.removeItem(STORAGE_KEY);
      logger.info('Cleared corrupted gamification state from localStorage');
    } catch {
      // Ignore - if we can't remove it, we've already logged the original error
    }
    return null;
  }
}

/**
 * Save gamification state to localStorage
 */
export function saveState(state: GamificationState): void {
  if (!isLocalStorageAvailable()) {
    logger.warn('localStorage is not available, state not saved');
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    logger.error('Failed to save gamification state:', error);
  }
}

/**
 * Clear gamification state from localStorage
 */
export function clearState(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    logger.error('Failed to clear gamification state:', error);
  }
}

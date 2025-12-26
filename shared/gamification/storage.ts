import type { GamificationState } from './types';

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
    console.warn('localStorage is not available');
    return null;
  }

    try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved) as GamificationState;

    // Version migration if needed
    if (parsed.version !== CURRENT_VERSION) {
      console.log(`Migrating state from v${parsed.version} to v${CURRENT_VERSION}`);
      parsed.version = CURRENT_VERSION;
      // Migration: ensure all required fields exist
    }

    // Basic validation - check required fields exist
    if (!parsed.user || !parsed.sections || !parsed.streak) {
      console.warn('Invalid gamification state structure in localStorage');
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load gamification state:', error);
    return null;
  }
}

/**
 * Save gamification state to localStorage
 */
export function saveState(state: GamificationState): void {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available, state not saved');
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save gamification state:', error);
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
    console.error('Failed to clear gamification state:', error);
  }
}

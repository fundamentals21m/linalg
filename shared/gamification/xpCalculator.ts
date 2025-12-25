import { LEVEL_THRESHOLDS, XP_CONFIG, type Difficulty } from './types';

/**
 * Calculate user level based on total XP
 */
export function calculateLevel(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

/**
 * Get XP required for next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  }
  return LEVEL_THRESHOLDS[currentLevel];
}

/**
 * Get progress percentage toward next level
 */
export function getLevelProgress(totalXP: number, currentLevel: number): number {
  if (currentLevel >= LEVEL_THRESHOLDS.length) return 100;

  const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1];
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel];
  const progress = ((totalXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return Math.min(100, Math.max(0, progress));
}

/**
 * Calculate XP earned for a quiz based on difficulty and score
 */
export function calculateXP(difficulty: Difficulty, score: number): number {
  const baseXP = {
    easy: XP_CONFIG.QUIZ_EASY,
    medium: XP_CONFIG.QUIZ_MEDIUM,
    hard: XP_CONFIG.QUIZ_HARD,
  }[difficulty];

  // Scale XP by score percentage
  return Math.round(baseXP * (score / 100));
}

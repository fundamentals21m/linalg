import { describe, it, expect } from 'vitest';
import { calculateLevel, getXPForNextLevel, getLevelProgress, calculateXP } from './xpCalculator';
import { LEVEL_THRESHOLDS, XP_CONFIG, type Difficulty } from './types';

describe('calculateLevel', () => {
  it('should return level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('should return level 1 for XP below first threshold', () => {
    expect(calculateLevel(LEVEL_THRESHOLDS[0] - 1)).toBe(1);
  });

  it('should return level 2 at first threshold', () => {
    expect(calculateLevel(LEVEL_THRESHOLDS[1])).toBe(2);
  });

  it('should return level 10 at 9th threshold', () => {
    expect(calculateLevel(LEVEL_THRESHOLDS[9])).toBe(10);
  });

  it('should return max level for XP above last threshold', () => {
    const maxXP = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    expect(calculateLevel(maxXP)).toBe(LEVEL_THRESHOLDS.length);
    expect(calculateLevel(maxXP + 1000)).toBe(LEVEL_THRESHOLDS.length);
  });

  it('should handle edge cases', () => {
    expect(calculateLevel(-100)).toBe(1);
    expect(calculateLevel(Number.MAX_SAFE_INTEGER)).toBe(LEVEL_THRESHOLDS.length);
  });
});

describe('getXPForNextLevel', () => {
  it('should return correct XP for next level', () => {
    expect(getXPForNextLevel(1)).toBe(LEVEL_THRESHOLDS[1]);
    expect(getXPForNextLevel(5)).toBe(LEVEL_THRESHOLDS[5]);
  });

  it('should return max threshold for max level', () => {
    const maxLevel = LEVEL_THRESHOLDS.length;
    const maxThreshold = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    expect(getXPForNextLevel(maxLevel)).toBe(maxThreshold);
    expect(getXPForNextLevel(maxLevel + 10)).toBe(maxThreshold);
  });

  it('should handle level 1', () => {
    const result = getXPForNextLevel(1);
    expect(result).toBeGreaterThan(0);
  });
});

describe('getLevelProgress', () => {
  it('should return 0 for exact level threshold', () => {
    expect(getLevelProgress(LEVEL_THRESHOLDS[0], 2)).toBe(0);
    expect(getLevelProgress(LEVEL_THRESHOLDS[2], 4)).toBe(0);
  });

  it('should return 50 for midpoint progress', () => {
    const startXP = LEVEL_THRESHOLDS[1];
    const nextXP = LEVEL_THRESHOLDS[2];
    const midXP = Math.floor((startXP + nextXP) / 2);
    const progress = getLevelProgress(midXP, 2);
    expect(progress).toBeGreaterThan(40);
    expect(progress).toBeLessThan(60);
  });

  it('should return 100 for max level', () => {
    const maxLevel = LEVEL_THRESHOLDS.length;
    expect(getLevelProgress(100000, maxLevel)).toBe(100);
  });

  it('should clamp progress between 0 and 100', () => {
    const startXP = LEVEL_THRESHOLDS[1];
    const nextXP = LEVEL_THRESHOLDS[2];
    
    // Below threshold should be clamped to 0
    const belowThreshold = getLevelProgress(startXP - 10, 2);
    expect(belowThreshold).toBe(0);
    
    // Above threshold should be clamped to 100
    const aboveThreshold = getLevelProgress(nextXP + 100, 2);
    expect(aboveThreshold).toBe(100);
  });
});

describe('calculateXP', () => {
  it('should return base XP for perfect score on easy quiz', () => {
    const xp = calculateXP('easy', 100);
    expect(xp).toBe(XP_CONFIG.QUIZ_EASY);
  });

  it('should return base XP for perfect score on medium quiz', () => {
    const xp = calculateXP('medium', 100);
    expect(xp).toBe(XP_CONFIG.QUIZ_MEDIUM);
  });

  it('should return base XP for perfect score on hard quiz', () => {
    const xp = calculateXP('hard', 100);
    expect(xp).toBe(XP_CONFIG.QUIZ_HARD);
  });

  it('should scale XP by score percentage', () => {
    const xp50 = calculateXP('medium', 50);
    const xp25 = calculateXP('medium', 25);
    const xp75 = calculateXP('medium', 75);

    expect(xp50).toBe(Math.round(XP_CONFIG.QUIZ_MEDIUM * 0.5));
    expect(xp25).toBe(Math.round(XP_CONFIG.QUIZ_MEDIUM * 0.25));
    expect(xp75).toBe(Math.round(XP_CONFIG.QUIZ_MEDIUM * 0.75));
  });

  it('should return 0 for 0 score', () => {
    expect(calculateXP('easy', 0)).toBe(0);
    expect(calculateXP('medium', 0)).toBe(0);
    expect(calculateXP('hard', 0)).toBe(0);
  });

  it('should handle decimal scores correctly', () => {
    const xp = calculateXP('medium', 66.7);
    expect(xp).toBe(Math.round(XP_CONFIG.QUIZ_MEDIUM * 0.667));
  });

  it('should handle all difficulty types', () => {
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
    
    difficulties.forEach((difficulty) => {
      const xp = calculateXP(difficulty, 100);
      expect(xp).toBeGreaterThan(0);
      expect(Number.isInteger(xp)).toBe(true);
    });
  });
});

import type { GamificationState, AchievementNotification, AchievementCategory } from './types';

interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  xpReward: number;
  check: (state: GamificationState) => number; // Returns progress value
  target: number;
}

/**
 * All achievement definitions
 */
export const ACHIEVEMENTS: AchievementDefinition[] = [
  // Progress achievements
  {
    id: 'first-section',
    title: 'First Steps',
    description: 'Complete your first section',
    category: 'progress',
    xpReward: 25,
    check: (state) => state.user.sectionsCompleted.length,
    target: 1,
  },
  {
    id: 'ten-sections',
    title: 'Getting Started',
    description: 'Complete 10 sections',
    category: 'progress',
    xpReward: 50,
    check: (state) => state.user.sectionsCompleted.length,
    target: 10,
  },
  {
    id: 'half-course',
    title: 'Halfway There',
    description: 'Complete 50% of the course',
    category: 'progress',
    xpReward: 100,
    check: (state) => Math.round((state.user.sectionsCompleted.length / 50) * 100),
    target: 50,
  },

  // Mastery achievements
  {
    id: 'first-mastery',
    title: 'Master of One',
    description: 'Master your first section',
    category: 'mastery',
    xpReward: 30,
    check: (state) =>
      Object.values(state.sections).filter((s) => s.masteryLevel === 'mastered').length,
    target: 1,
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Complete 10 quizzes',
    category: 'mastery',
    xpReward: 50,
    check: (state) => state.user.quizzesTaken,
    target: 10,
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Get 5 perfect quiz scores',
    category: 'mastery',
    xpReward: 75,
    check: (state) => state.user.perfectQuizzes,
    target: 5,
  },

  // Dedication achievements
  {
    id: 'week-streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    category: 'dedication',
    xpReward: 50,
    check: (state) => state.streak.longestStreak,
    target: 7,
  },
  {
    id: 'month-streak',
    title: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    category: 'dedication',
    xpReward: 150,
    check: (state) => state.streak.longestStreak,
    target: 30,
  },
  {
    id: 'level-5',
    title: 'Level Up',
    description: 'Reach level 5',
    category: 'dedication',
    xpReward: 50,
    check: (state) => state.user.level,
    target: 5,
  },
  {
    id: 'level-10',
    title: 'Expert',
    description: 'Reach level 10',
    category: 'dedication',
    xpReward: 100,
    check: (state) => state.user.level,
    target: 10,
  },

  // Exploration achievements
  {
    id: 'first-visualization',
    title: 'Visual Learner',
    description: 'Use your first interactive visualization',
    category: 'exploration',
    xpReward: 15,
    check: (state) => state.user.visualizationsUsed,
    target: 1,
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Use 10 different visualizations',
    category: 'exploration',
    xpReward: 50,
    check: (state) => state.user.visualizationsUsed,
    target: 10,
  },
];

/**
 * Check for newly unlocked achievements
 */
export function checkAchievements(state: GamificationState): AchievementNotification[] {
  const notifications: AchievementNotification[] = [];

  for (const achievement of ACHIEVEMENTS) {
    const savedProgress = state.achievements.find((a) => a.id === achievement.id);
    if (savedProgress?.unlockedAt) continue; // Already unlocked

    const currentProgress = achievement.check(state);
    if (currentProgress >= achievement.target) {
      notifications.push({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        category: achievement.category,
        xpReward: achievement.xpReward,
        timestamp: Date.now(),
      });
    }
  }

  return notifications;
}

/**
 * Get achievement by ID
 */
export function getAchievement(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

/**
 * Get all achievements with progress
 */
export function getAchievementsWithProgress(
  state: GamificationState
): (AchievementDefinition & { progress: number; unlocked: boolean })[] {
  return ACHIEVEMENTS.map((achievement) => {
    const saved = state.achievements.find((a) => a.id === achievement.id);
    return {
      ...achievement,
      progress: achievement.check(state),
      unlocked: !!saved?.unlockedAt,
    };
  });
}

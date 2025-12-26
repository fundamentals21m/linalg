import type { SectionProgress, MasteryLevel } from './types';

/**
 * Calculate mastery level based on section progress
 */
export function calculateMastery(section: SectionProgress): MasteryLevel {
  const { quizAttempts } = section;

  // No quiz attempts = still learning
  if (quizAttempts.length === 0) {
    return 'learning';
  }

  // Get best quiz score
  const bestScore = Math.max(...quizAttempts.map((a) => a.score));

  // Calculate average score
  const avgScore = quizAttempts.reduce((sum, a) => sum + a.score, 0) / quizAttempts.length;

  // Count perfect scores
  const perfectCount = quizAttempts.filter((a) => a.score === 100).length;

  // Mastery criteria:
  // - Mastered: 2+ perfect scores, or avg >= 90 with 3+ attempts
  // - Familiar: best score >= 80, or avg >= 70 with 2+ attempts
  // - Learning: any other case

  if (perfectCount >= 2 || (avgScore >= 90 && quizAttempts.length >= 3)) {
    return 'mastered';
  }

  if (bestScore >= 80 || (avgScore >= 70 && quizAttempts.length >= 2)) {
    return 'familiar';
  }

  return 'learning';
}

/**
 * Get mastery display info
 */
export function getMasteryInfo(level: MasteryLevel): {
  label: string;
  color: string;
  symbol: string;
} {
  switch (level) {
    case 'mastered':
      return { label: 'Mastered', color: 'text-emerald-400', symbol: '●' };
    case 'familiar':
      return { label: 'Familiar', color: 'text-yellow-400', symbol: '◑' };
    case 'learning':
      return { label: 'Learning', color: 'text-blue-400', symbol: '◐' };
    case 'none':
    default:
      return { label: 'Not Started', color: 'text-dark-500', symbol: '○' };
  }
}

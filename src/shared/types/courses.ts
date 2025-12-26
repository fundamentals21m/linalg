/**
 * Course type definitions - Single source of truth for CourseId
 */

/**
 * Valid course identifiers for production use
 */
export type CourseId = 'ba' | 'aa' | 'crypto' | 'linalg' | 'advlinalg';

/**
 * Array of valid course IDs for runtime validation
 */
export const VALID_COURSE_IDS: readonly CourseId[] = ['ba', 'aa', 'crypto', 'linalg', 'advlinalg'] as const;

/**
 * Type guard to check if a string is a valid CourseId
 */
export function isValidCourseId(value: string): value is CourseId {
  return VALID_COURSE_IDS.includes(value as CourseId);
}

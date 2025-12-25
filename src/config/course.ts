// =============================================================================
// COURSE CONFIGURATION
// =============================================================================
// This is the central configuration file for your course.
// Update these values when creating a new course.
// =============================================================================

import type { CourseId } from '@magic-internet-math/shared';

/**
 * Course identifier - used for XP tracking, URLs, and storage keys
 * Examples: 'ba' (Basic Algebra), 'aa' (Abstract Algebra), 'crypto' (Cryptography)
 */
export const COURSE_ID: CourseId = 'linalg';

/**
 * Human-readable course name
 */
export const COURSE_NAME = 'Introduction to Linear Algebra';

/**
 * Short description for meta tags and headers
 */
export const COURSE_DESCRIPTION = "An interactive course based on Gilbert Strang's Introduction to Linear Algebra (5th Edition)";

/**
 * Course accent color (used in headers, buttons, etc.)
 * Options: 'indigo', 'emerald', 'amber', 'rose', 'cyan'
 */
export const COURSE_ACCENT = 'indigo';

/**
 * Course icon/emoji for visual identification
 */
export const COURSE_ICON = '📐';

/**
 * Base path for routing (must match vite.config.ts)
 * Use '/' for standalone Vercel deployment
 */
export const BASE_PATH = '/';

/**
 * Hub URL - main Magic Internet Math landing page
 */
export const HUB_URL = 'https://mathacademy-cyan.vercel.app';

/**
 * External links
 */
export const LINKS = {
  hub: HUB_URL,
  home: '/',
  leaderboard: `${BASE_PATH}#/leaderboard`,
  theorems: `${BASE_PATH}#/theorems`,
  interactive: `${BASE_PATH}#/interactive`,
} as const;

/**
 * Feature flags - enable/disable features per course
 */
export const FEATURES = {
  gamification: true,
  leaderboard: true,
  nostrAuth: true,
  quizzes: true,
  interactiveModules: true,
  theoremIndex: true,
} as const;

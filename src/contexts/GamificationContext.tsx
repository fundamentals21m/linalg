/**
 * GamificationContext - Re-exports from shared gamification module
 * 
 * This file re-exports the shared GamificationProvider and useGamification hook,
 * wrapping the provider to automatically inject the course ID.
 */

import { type ReactNode } from 'react';
import { COURSE_ID } from '@/config';
import {
  GamificationProvider as SharedGamificationProvider,
  useGamification,
} from '@magic-internet-math/shared';

// Re-export the hook directly
export { useGamification };

// Wrapper component that injects the course ID
export function GamificationProvider({ children }: { children: ReactNode }) {
  return (
    <SharedGamificationProvider courseId={COURSE_ID}>
      {children}
    </SharedGamificationProvider>
  );
}

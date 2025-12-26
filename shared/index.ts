// Firebase
export * from './firebase';

// Nostr (excluding CourseId which is also in leaderboard)
export * from './nostr/types';
export * from './nostr/utils';

// Leaderboard (primary source for CourseId)
export * from './leaderboard';

// Contexts
export * from './contexts';
export { ErrorProvider, useErrorContext } from './contexts/ErrorContext';

// Components
export { ErrorBoundary } from './components/ErrorBoundary';
export { ErrorDisplay } from './components/ErrorDisplay';

// Gamification
export * from './gamification';

// Validation (NEW)
export * from './validation/schemas';

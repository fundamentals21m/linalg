# @magic-internet-math/shared

Shared utilities, components, and contexts for Magic Internet Math courses.

## Installation

This package is used internally by the course applications. It's included via path alias in each course's `vite.config.ts`:

```typescript
'@magic-internet-math/shared': path.resolve(__dirname, './shared'),
```

## Module Structure

```
shared/
├── components/         # Reusable React components
│   ├── common/        # Generic UI components (LoadingSpinner)
│   ├── leaderboard/   # Leaderboard UI (LeaderboardPage, AdminPanel)
│   ├── ErrorBoundary.tsx
│   └── ErrorDisplay.tsx
├── contexts/          # React contexts
│   ├── NostrAuthContext.tsx  # Nostr NIP-07 authentication
│   └── ErrorContext.tsx      # Global error handling
├── firebase/          # Firebase configuration
├── gamification/      # XP, levels, streaks, achievements
│   ├── GamificationContext.tsx
│   ├── xpCalculator.ts
│   ├── streakManager.ts
│   └── types.ts
├── leaderboard/       # Score syncing and types
│   ├── syncManager.ts
│   └── types.ts
├── nostr/             # Nostr protocol utilities
│   ├── types.ts       # NIP-07 types
│   └── utils.ts       # npub/hex conversion, profile fetching
├── utils/             # Shared utilities
│   └── logger.ts      # Centralized logging
├── validation/        # Input validation
│   └── schemas.ts     # Zod validation schemas
├── types/             # Shared type definitions
│   └── courses.ts     # CourseId type (single source of truth)
├── constants.ts       # Shared constants (timeouts, relays)
└── index.ts           # Main exports
```

## Usage

### Contexts

#### NostrAuthContext
Manages Nostr NIP-07 authentication with Firebase backend:

```tsx
import { NostrAuthProvider, useNostrAuth } from '@magic-internet-math/shared';

// Wrap your app
<NostrAuthProvider>
  <App />
</NostrAuthProvider>

// Use in components
function Profile() {
  const { isAuthenticated, npub, displayName, connect, disconnect } = useNostrAuth();
  // ...
}
```

#### ErrorContext
Global error handling with user-friendly display:

```tsx
import { ErrorProvider, ErrorDisplay, useErrorContext } from '@magic-internet-math/shared';

// Wrap your app
<ErrorProvider>
  <App />
  <ErrorDisplay />
</ErrorProvider>

// Use in components
function MyComponent() {
  const { addError, dismissError } = useErrorContext();
  
  try {
    // risky operation
  } catch (err) {
    addError({ message: 'Something went wrong', recoverable: true });
  }
}
```

### Components

#### ErrorBoundary
React error boundary for catching render errors:

```tsx
import { ErrorBoundary } from '@magic-internet-math/shared';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

#### LoadingSpinner
Loading indicator for Suspense fallbacks:

```tsx
import { LoadingSpinner } from '@magic-internet-math/shared';

<Suspense fallback={<LoadingSpinner message="Loading..." />}>
  <LazyComponent />
</Suspense>
```

### Gamification

#### GamificationContext
Tracks XP, levels, streaks, and achievements:

```tsx
import { GamificationProvider } from '@/contexts/GamificationContext';

// Note: Import from local contexts as it needs courseId
<GamificationProvider courseId="linalg">
  <App />
</GamificationProvider>
```

#### XP Calculator
```typescript
import { calculateLevel, calculateXP, getLevelProgress } from '@magic-internet-math/shared';

const level = calculateLevel(totalXP);
const xpEarned = calculateXP('medium', 85); // difficulty, score
const progress = getLevelProgress(totalXP, level);
```

### Utilities

#### Logger
Centralized logging with module prefixes:

```typescript
import { getLogger } from '@magic-internet-math/shared';

const logger = getLogger('MyModule');
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', error);
```

#### Validation Schemas
Zod-based input validation:

```typescript
import { validateLocalStorageData, sanitizeNumber } from '@magic-internet-math/shared';

const result = validateLocalStorageData(data);
if (!result.valid) {
  console.error(result.error);
}

const safeNumber = sanitizeNumber(input, 0, 100, 50); // value, min, max, default
```

### Types

#### CourseId
Single source of truth for course identifiers:

```typescript
import { type CourseId, VALID_COURSE_IDS, isValidCourseId } from '@magic-internet-math/shared';

const courseId: CourseId = 'linalg'; // 'ba' | 'aa' | 'crypto' | 'linalg' | 'advlinalg'

if (isValidCourseId(input)) {
  // input is typed as CourseId
}
```

### Constants

```typescript
import { 
  DEFAULT_RELAYS,      // Nostr relay URLs
  SYNC_INTERVAL_MS,    // Leaderboard sync interval
  EXTENSION_WAIT_MS,   // NIP-07 extension detection timeout
} from '@magic-internet-math/shared';
```

## Testing

```bash
cd shared
npm run test:run      # Run tests once
npm run test          # Watch mode
npm run test:coverage # With coverage report
```

## Key Design Decisions

1. **CourseId Single Source**: All course ID types come from `types/courses.ts` to prevent divergence
2. **Centralized Logging**: All console output goes through `getLogger()` for consistent formatting
3. **Zod Validation**: All external data (localStorage, API responses) is validated with Zod schemas
4. **Error Boundaries**: React errors are caught and displayed gracefully
5. **Lazy Loading Support**: `LoadingSpinner` component for Suspense fallbacks

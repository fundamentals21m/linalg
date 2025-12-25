# Math Academy Course Template

A standardized template for creating interactive mathematics courses with gamification, quizzes, and Nostr-based leaderboards.

## Quick Start

1. **Copy this template** to create a new course:
   ```bash
   cp -r course-template my-new-course
   cd my-new-course
   ```

2. **Configure your course** in these files:
   - `src/config/course.ts` - Course ID, name, description, features
   - `vite.config.ts` - Update `COURSE_ID` and `BASE_PATH`
   - `index.html` - Update title and meta tags
   - `package.json` - Update name

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development**:
   ```bash
   npm run dev
   ```

## Configuration

### Course Configuration (`src/config/course.ts`)

```typescript
export const COURSE_ID: CourseId = 'mycourse';  // Short ID for XP tracking
export const COURSE_NAME = 'My Course';          // Display name
export const COURSE_DESCRIPTION = 'Learn...';    // Meta description
export const COURSE_ICON = '📚';                 // Header icon

export const FEATURES = {
  gamification: true,     // XP, levels, achievements
  leaderboard: true,      // Global rankings
  nostrAuth: true,        // Nostr wallet login
  quizzes: true,          // Section quizzes
  interactiveModules: true,
  theoremIndex: true,
};
```

### Curriculum Structure (`src/data/curriculum.ts`)

Courses are organized into **Parts** containing **Sections**:

```typescript
export const curriculum: Part[] = [
  {
    id: 1,
    title: 'Introduction',
    slug: 'introduction',
    sections: [
      { id: 0, title: 'Welcome', slug: 'welcome', description: '...' },
      { id: 1, title: 'Prerequisites', slug: 'prerequisites', description: '...' },
    ],
  },
  // Add more parts...
];
```

## Directory Structure

```
src/
├── config/
│   └── course.ts           # Course configuration
├── components/
│   ├── layout/             # Header, Sidebar, LessonLayout
│   ├── common/             # Definition, Theorem, Example, MathBlock
│   ├── gamification/       # XPDisplay, StreakBadge, MasteryIndicator
│   ├── quiz/               # SectionQuiz
│   └── visualizations/     # Interactive demos (add your own)
├── contexts/
│   └── GamificationContext.tsx
├── data/
│   ├── curriculum.ts       # Course structure
│   └── quizzes/            # Quiz question files
├── lib/
│   └── gamification/       # XP, streaks, achievements logic
├── pages/
│   ├── Home.tsx
│   ├── Theorems.tsx
│   ├── InteractiveModules.tsx
│   ├── Leaderboard.tsx
│   └── sections/           # Section page components
├── shared/
│   ├── firebase/           # Firebase config
│   └── contexts/           # NostrAuthContext
└── types/
    └── gamification.ts     # Type definitions
```

## Creating Sections

1. Create a new section component in `src/pages/sections/`:

```tsx
// src/pages/sections/Section00.tsx
import { LessonLayout } from '@/components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '@/components/common';
import { SectionQuiz } from '@/components/quiz';
import { section00Questions } from '@/data/quizzes/section00';

export default function Section00() {
  return (
    <LessonLayout sectionId={0}>
      <p>Introduction paragraph...</p>

      <Definition title="Key Term">
        <p>The definition of the term.</p>
      </Definition>

      <Theorem title="Important Theorem" proof={<p>Proof goes here...</p>}>
        <p>Statement of the theorem.</p>
      </Theorem>

      <Example title="Worked Example">
        <p>Calculate <Math>x^2 + 1</Math> when <Math>x = 3</Math>:</p>
        <MathBlock>3^2 + 1 = 9 + 1 = 10</MathBlock>
      </Example>

      {/* Add your interactive visualization here */}

      <SectionQuiz sectionId={0} questions={section00Questions} />
    </LessonLayout>
  );
}
```

2. Add the section to curriculum in `src/data/curriculum.ts`

3. Import and add route in `src/App.tsx`:
```tsx
import Section00 from '@/pages/sections/Section00';

const sectionComponents: Record<number, React.ComponentType> = {
  0: Section00,
};
```

## Content Components

### Math Rendering

```tsx
// Inline math
<Math>x^2 + y^2 = z^2</Math>

// Block (centered) math
<MathBlock>
  {\`\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\`}
</MathBlock>
```

### Content Blocks

```tsx
<Definition title="Set">
  A collection of distinct objects.
</Definition>

<Theorem title="Pythagorean Theorem" proof={<p>...</p>}>
  For a right triangle: a² + b² = c²
</Theorem>

<Example title="Application">
  Real-world example of the concept.
</Example>

<Axiom title="Axiom of Choice">
  Fundamental assumption.
</Axiom>

<Callout type="info">Important note</Callout>
<Callout type="warning">Be careful!</Callout>
<Callout type="danger">Common mistake</Callout>
```

## Quizzes

Create quiz files in `src/data/quizzes/`:

```typescript
// src/data/quizzes/section00.ts
export const section00Questions = [
  {
    id: '00-1',
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,  // Index of correct option
    difficulty: 'easy' as const,
    explanation: 'Basic arithmetic: 2 + 2 = 4',
  },
  // More questions...
];
```

## Interactive Visualizations

Create visualization components in `src/components/visualizations/`:

```tsx
// src/components/visualizations/MyDemo.tsx
import { useState } from 'react';
import { useGamification } from '@/contexts/GamificationContext';

interface MyDemoProps {
  sectionId: number;
}

export function MyDemo({ sectionId }: MyDemoProps) {
  const { useVisualization } = useGamification();
  const [value, setValue] = useState(0);

  const handleInteraction = () => {
    useVisualization(sectionId, 'MyDemo');
    // Your logic here
  };

  return (
    <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50">
      {/* Your visualization */}
    </div>
  );
}
```

## Gamification

### XP Rewards

| Action | XP |
|--------|-----|
| Visit section | 10 |
| Complete section | 25 |
| Easy quiz | 15 |
| Medium quiz | 25 |
| Hard quiz | 40 |
| Perfect quiz | +50% bonus |
| Use visualization | 5 |
| Complete part | 50 |

### Mastery Levels

- **None** (○) - Not started
- **Learning** (◐) - Started but not mastered
- **Familiar** (◑) - Good quiz performance
- **Mastered** (●) - Excellent performance

## Deployment

### GitHub Pages

1. Push to GitHub
2. Enable Pages in repo settings (Actions deployment)
3. The workflow auto-deploys on push to `main`

### Manual Build

```bash
npm run build
# Output in dist/
```

## Firebase Setup (Optional)

For leaderboards, update `src/shared/firebase/config.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT',
  // ...
};
```

## Tech Stack

- **React 19** + TypeScript
- **Vite** for build/dev
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **KaTeX** for math rendering
- **D3** for visualizations
- **Firebase** for auth/database
- **Nostr** (NIP-07) for wallet auth

## License

MIT

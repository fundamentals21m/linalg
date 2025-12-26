import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, useParams } from 'react-router-dom';
import { GamificationProvider } from '@/contexts/GamificationContext';
import { NostrAuthProvider, ErrorBoundary, ErrorProvider, ErrorDisplay, LoadingSpinner } from '@magic-internet-math/shared';
import { AchievementToastContainer } from '@/components/gamification';
import { FEATURES } from '@/config';

// Eagerly load Home since it's the landing page
import Home from '@/pages/Home';

// Lazy load other pages - they're only needed when navigating to them
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const Theorems = lazy(() => import('@/pages/Theorems'));
const InteractiveModules = lazy(() => import('@/pages/InteractiveModules'));
const ChapterQuiz = lazy(() => import('@/pages/ChapterQuiz'));

// Lazy load all section pages - this is the biggest win for bundle size
// Each section is only loaded when the user navigates to it
const sectionLoaders: Record<number, () => Promise<{ default: React.ComponentType }>> = {
  1: () => import('@/pages/sections/Section01'),
  2: () => import('@/pages/sections/Section02'),
  3: () => import('@/pages/sections/Section03'),
  4: () => import('@/pages/sections/Section04'),
  5: () => import('@/pages/sections/Section05'),
  6: () => import('@/pages/sections/Section06'),
  7: () => import('@/pages/sections/Section07'),
  8: () => import('@/pages/sections/Section08'),
  9: () => import('@/pages/sections/Section09'),
  10: () => import('@/pages/sections/Section10'),
  11: () => import('@/pages/sections/Section11'),
  12: () => import('@/pages/sections/Section12'),
  13: () => import('@/pages/sections/Section13'),
  14: () => import('@/pages/sections/Section14'),
  15: () => import('@/pages/sections/Section15'),
  16: () => import('@/pages/sections/Section16'),
  17: () => import('@/pages/sections/Section17'),
  18: () => import('@/pages/sections/Section18'),
  19: () => import('@/pages/sections/Section19'),
  20: () => import('@/pages/sections/Section20'),
  21: () => import('@/pages/sections/Section21'),
  22: () => import('@/pages/sections/Section22'),
  23: () => import('@/pages/sections/Section23'),
  24: () => import('@/pages/sections/Section24'),
  25: () => import('@/pages/sections/Section25'),
  26: () => import('@/pages/sections/Section26'),
  27: () => import('@/pages/sections/Section27'),
  28: () => import('@/pages/sections/Section28'),
  29: () => import('@/pages/sections/Section29'),
  30: () => import('@/pages/sections/Section30'),
  31: () => import('@/pages/sections/Section31'),
  32: () => import('@/pages/sections/Section32'),
  33: () => import('@/pages/sections/Section33'),
  34: () => import('@/pages/sections/Section34'),
  35: () => import('@/pages/sections/Section35'),
  36: () => import('@/pages/sections/Section36'),
  37: () => import('@/pages/sections/Section37'),
  38: () => import('@/pages/sections/Section38'),
  39: () => import('@/pages/sections/Section39'),
  40: () => import('@/pages/sections/Section40'),
  41: () => import('@/pages/sections/Section41'),
  42: () => import('@/pages/sections/Section42'),
  43: () => import('@/pages/sections/Section43'),
  44: () => import('@/pages/sections/Section44'),
  45: () => import('@/pages/sections/Section45'),
  46: () => import('@/pages/sections/Section46'),
  47: () => import('@/pages/sections/Section47'),
  48: () => import('@/pages/sections/Section48'),
  49: () => import('@/pages/sections/Section49'),
  50: () => import('@/pages/sections/Section50'),
};

// Create lazy components from loaders
const sectionComponents: Record<number, React.LazyExoticComponent<React.ComponentType>> = {};
for (const [id, loader] of Object.entries(sectionLoaders)) {
  sectionComponents[Number(id)] = lazy(loader);
}

function SectionRouter() {
  const { id } = useParams<{ id: string }>();
  const sectionId = parseInt(id || '0', 10);

  const SectionComponent = sectionComponents[sectionId];

  if (SectionComponent) {
    return (
      <Suspense fallback={<LoadingSpinner message="Loading section..." />}>
        <SectionComponent />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-dark-100 mb-4">Section Not Found</h1>
        <p className="text-dark-400">This section is not yet implemented.</p>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <Routes>
        {/* Core routes */}
        <Route path="/" element={<Home />} />

        {/* Feature-gated routes - lazy loaded */}
        {FEATURES.leaderboard && (
          <Route
            path="/leaderboard"
            element={
              <Suspense fallback={<LoadingSpinner message="Loading leaderboard..." />}>
                <Leaderboard />
              </Suspense>
            }
          />
        )}
        {FEATURES.theoremIndex && (
          <Route
            path="/theorems"
            element={
              <Suspense fallback={<LoadingSpinner message="Loading theorems..." />}>
                <Theorems />
              </Suspense>
            }
          />
        )}
        {FEATURES.interactiveModules && (
          <Route
            path="/interactive"
            element={
              <Suspense fallback={<LoadingSpinner message="Loading modules..." />}>
                <InteractiveModules />
              </Suspense>
            }
          />
        )}

        {/* Dynamic section routes - lazy loaded via SectionRouter */}
        <Route path="/section/:id" element={<SectionRouter />} />

        {/* Chapter quiz routes - lazy loaded */}
        <Route
          path="/chapter/:id/quiz"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading quiz..." />}>
              <ChapterQuiz />
            </Suspense>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Global achievement notifications */}
      {FEATURES.gamification && <AchievementToastContainer />}
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <HashRouter>
          {FEATURES.nostrAuth ? (
            <NostrAuthProvider>
              {FEATURES.gamification ? (
                <GamificationProvider>
                  <AppContent />
                </GamificationProvider>
              ) : (
                <AppContent />
              )}
            </NostrAuthProvider>
          ) : FEATURES.gamification ? (
            <GamificationProvider>
              <AppContent />
            </GamificationProvider>
          ) : (
            <AppContent />
          )}
        </HashRouter>
        <ErrorDisplay />
      </ErrorProvider>
    </ErrorBoundary>
  );
}

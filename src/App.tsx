import { HashRouter, Routes, Route, useParams } from 'react-router-dom';
import { GamificationProvider } from '@/contexts/GamificationContext';
import { NostrAuthProvider } from '@shared/contexts/NostrAuthContext';
import { AchievementToastContainer } from '@/components/gamification';
import { FEATURES } from '@/config';

// Pages
import Home from '@/pages/Home';
import Leaderboard from '@/pages/Leaderboard';
import Theorems from '@/pages/Theorems';
import InteractiveModules from '@/pages/InteractiveModules';
import ChapterQuiz from '@/pages/ChapterQuiz';

// Section pages - import all sections here
import Section01 from '@/pages/sections/Section01';
import Section02 from '@/pages/sections/Section02';
import Section03 from '@/pages/sections/Section03';
import Section04 from '@/pages/sections/Section04';
import Section05 from '@/pages/sections/Section05';
import Section06 from '@/pages/sections/Section06';
import Section07 from '@/pages/sections/Section07';
import Section08 from '@/pages/sections/Section08';
import Section09 from '@/pages/sections/Section09';
import Section10 from '@/pages/sections/Section10';
import Section11 from '@/pages/sections/Section11';
import Section12 from '@/pages/sections/Section12';
import Section13 from '@/pages/sections/Section13';
import Section14 from '@/pages/sections/Section14';
import Section15 from '@/pages/sections/Section15';
import Section16 from '@/pages/sections/Section16';
import Section17 from '@/pages/sections/Section17';
import Section18 from '@/pages/sections/Section18';
import Section19 from '@/pages/sections/Section19';
import Section20 from '@/pages/sections/Section20';
import Section21 from '@/pages/sections/Section21';
import Section22 from '@/pages/sections/Section22';
import Section23 from '@/pages/sections/Section23';
import Section24 from '@/pages/sections/Section24';
import Section25 from '@/pages/sections/Section25';
import Section26 from '@/pages/sections/Section26';
import Section27 from '@/pages/sections/Section27';
import Section28 from '@/pages/sections/Section28';
import Section29 from '@/pages/sections/Section29';
import Section30 from '@/pages/sections/Section30';
import Section31 from '@/pages/sections/Section31';
import Section32 from '@/pages/sections/Section32';
import Section33 from '@/pages/sections/Section33';
import Section34 from '@/pages/sections/Section34';
import Section35 from '@/pages/sections/Section35';
import Section36 from '@/pages/sections/Section36';
import Section37 from '@/pages/sections/Section37';
import Section38 from '@/pages/sections/Section38';
import Section39 from '@/pages/sections/Section39';
import Section40 from '@/pages/sections/Section40';
import Section41 from '@/pages/sections/Section41';
import Section42 from '@/pages/sections/Section42';
import Section43 from '@/pages/sections/Section43';
import Section44 from '@/pages/sections/Section44';
import Section45 from '@/pages/sections/Section45';
import Section46 from '@/pages/sections/Section46';
import Section47 from '@/pages/sections/Section47';
import Section48 from '@/pages/sections/Section48';
import Section49 from '@/pages/sections/Section49';
import Section50 from '@/pages/sections/Section50';

// Dynamic section loader for sections that exist
const sectionComponents: Record<number, React.ComponentType> = {
  1: Section01,
  2: Section02,
  3: Section03,
  4: Section04,
  5: Section05,
  6: Section06,
  7: Section07,
  8: Section08,
  9: Section09,
  10: Section10,
  11: Section11,
  12: Section12,
  13: Section13,
  14: Section14,
  15: Section15,
  16: Section16,
  17: Section17,
  18: Section18,
  19: Section19,
  20: Section20,
  21: Section21,
  22: Section22,
  23: Section23,
  24: Section24,
  25: Section25,
  26: Section26,
  27: Section27,
  28: Section28,
  29: Section29,
  30: Section30,
  31: Section31,
  32: Section32,
  33: Section33,
  34: Section34,
  35: Section35,
  36: Section36,
  37: Section37,
  38: Section38,
  39: Section39,
  40: Section40,
  41: Section41,
  42: Section42,
  43: Section43,
  44: Section44,
  45: Section45,
  46: Section46,
  47: Section47,
  48: Section48,
  49: Section49,
  50: Section50,
};

function SectionRouter() {
  const { id } = useParams<{ id: string }>();
  const sectionId = parseInt(id || '0', 10);

  const SectionComponent = sectionComponents[sectionId];

  if (SectionComponent) {
    return <SectionComponent />;
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

        {/* Feature-gated routes */}
        {FEATURES.leaderboard && (
          <Route path="/leaderboard" element={<Leaderboard />} />
        )}
        {FEATURES.theoremIndex && (
          <Route path="/theorems" element={<Theorems />} />
        )}
        {FEATURES.interactiveModules && (
          <Route path="/interactive" element={<InteractiveModules />} />
        )}

        {/* Dynamic section routes */}
        <Route path="/section/:id" element={<SectionRouter />} />

        {/* Chapter quiz routes */}
        <Route path="/chapter/:id/quiz" element={<ChapterQuiz />} />

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
  );
}

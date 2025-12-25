import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Sidebar } from '@/components/layout';
import { curriculum, getTotalSections } from '@/data/curriculum';
import { COURSE_NAME, COURSE_DESCRIPTION, COURSE_ICON, FEATURES, COURSE_ID } from '@/config';
import { useGamification } from '@/contexts/GamificationContext';
import { XPDisplay, StreakBadge } from '@/components/gamification';
import type { SectionId } from '@magic-internet-math/shared';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Always call the hook unconditionally, then conditionally use the result
  const gamificationContext = useGamification();
  const gamification = FEATURES.gamification ? gamificationContext : null;

  const totalSections = getTotalSections();
  const completedSections = gamification
    ? gamification.state.user.sectionsCompleted.filter((id) => id.startsWith(COURSE_ID)).length
    : 0;
  const progressPercent = Math.round((completedSections / totalSections) * 100);

  return (
    <div className="min-h-screen bg-dark-950">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-20 pb-12 px-4 lg:pl-80 lg:pr-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <span className="text-6xl mb-4 block">{COURSE_ICON}</span>
            <h1 className="text-4xl font-bold text-dark-100 mb-4">{COURSE_NAME}</h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">{COURSE_DESCRIPTION}</p>
          </div>

          {/* Progress Card */}
          {FEATURES.gamification && gamification && (
            <div className="mb-12 p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-dark-100">Your Progress</h2>
                <StreakBadge streak={gamification.state.streak.currentStreak} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <XPDisplay
                    xp={gamification.state.user.totalXP}
                    level={gamification.state.user.level}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-dark-400">Course Progress</span>
                    <span className="text-primary-400 font-medium">{progressPercent}%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="text-xs text-dark-500 mt-1">
                    {completedSections} of {totalSections} sections
                  </div>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="text-2xl font-bold text-dark-100">
                    {gamification.state.user.quizzesTaken}
                  </div>
                  <div className="text-sm text-dark-400">Quizzes Completed</div>
                </div>
              </div>
            </div>
          )}

          {/* Course Content */}
          <h2 className="text-2xl font-bold text-dark-100 mb-6">Course Content</h2>
          <div className="space-y-4">
            {curriculum.map((part) => (
              <div
                key={part.id}
                className="p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50 hover:border-dark-600/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-400">{part.id}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-100">{part.title}</h3>
                    <p className="text-sm text-dark-400">{part.sections.length} sections</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {part.sections.map((section) => {
                    const sectionId = `${COURSE_ID}:${section.id}` as SectionId;
                    const isCompleted = gamification?.state.user.sectionsCompleted.includes(sectionId);

                    return (
                      <Link
                        key={section.id}
                        to={`/section/${section.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-700/50 transition-colors group"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-dark-700 text-dark-400'
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-xs">{section.id}</span>
                          )}
                        </div>
                        <span className="text-sm text-dark-300 group-hover:text-dark-100 transition-colors">
                          {section.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

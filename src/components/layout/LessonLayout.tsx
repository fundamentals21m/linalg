import { useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSectionById, getPartBySectionId, getAdjacentSections, getTotalSections, getSectionIndex } from '@/data/curriculum';
import { FEATURES } from '@/config';
import { useGamification } from '@/contexts/gamificationContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SectionQuiz } from '@/components/quiz/SectionQuiz';
import { getSectionQuiz } from '@/data/quizzes';

interface LessonLayoutProps {
  sectionId: number;
  children: ReactNode;
}

export function LessonLayout({ sectionId, children }: LessonLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const section = getSectionById(sectionId);
  const part = getPartBySectionId(sectionId);
  const { prev, next } = getAdjacentSections(sectionId);
  const totalSections = getTotalSections();
  const sectionIndex = getSectionIndex(sectionId);

  // Always call the hook unconditionally, then conditionally use the result
  const gamificationContext = useGamification();
  const gamification = FEATURES.gamification ? gamificationContext : null;
  const quizQuestions = getSectionQuiz(sectionId);

  // Track section visit
  useEffect(() => {
    if (gamification) {
      gamification.visitSection(sectionId);
    }
  }, [sectionId, gamification]);

  if (!section || !part) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark-100 mb-4">Section Not Found</h1>
          <Link to="/" className="text-primary-400 hover:text-primary-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = ((sectionIndex + 1) / totalSections) * 100;

  return (
    <div className="min-h-screen bg-dark-950">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-30 h-1 bg-dark-800 lg:left-72">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main content */}
      <main className="pt-20 pb-24 px-4 lg:pl-80 lg:pr-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-dark-400">
            <Link to="/" className="hover:text-dark-200 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-dark-500">{part.title}</span>
            <span>/</span>
            <span className="text-dark-200">{section.title}</span>
          </nav>

          {/* Section header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-primary-400">
                Section {sectionId}
              </span>
              <span className="text-dark-600">•</span>
              <span className="text-sm text-dark-500">{part.title}</span>
            </div>
            <h1 className="text-3xl font-bold text-dark-100 mb-3">
              {section.title}
            </h1>
            <p className="text-dark-400 text-lg">{section.description}</p>
          </header>

          {/* Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            {children}
          </article>

          {/* Section Quiz */}
          {quizQuestions && quizQuestions.length > 0 && (
            <SectionQuiz
              sectionId={sectionId}
              questions={quizQuestions}
              title="Test Your Understanding"
            />
          )}

          {/* Navigation */}
          <nav className="mt-16 flex items-center justify-between gap-4 pt-8 border-t border-dark-800">
            {prev ? (
              <Link
                to={`/section/${prev.id}`}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-dark-400 group-hover:text-dark-200 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-dark-500">Previous</div>
                  <div className="text-sm text-dark-200 group-hover:text-dark-100">
                    {prev.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                to={`/section/${next.id}`}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors group"
              >
                <div className="text-right">
                  <div className="text-xs text-dark-500">Next</div>
                  <div className="text-sm text-dark-200 group-hover:text-dark-100">
                    {next.title}
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-dark-400 group-hover:text-dark-200 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 transition-colors text-primary-400"
              >
                <span>Complete Course</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </Link>
            )}
          </nav>
        </div>
      </main>
    </div>
  );
}

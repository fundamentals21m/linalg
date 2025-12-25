import { Link } from 'react-router-dom';
import { COURSE_NAME, COURSE_ICON, FEATURES, HUB_URL } from '@/config';
import { useGamification } from '@/contexts/GamificationContext';
import { XPDisplay, StreakBadge } from '@/components/gamification';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  // Always call the hook unconditionally, then conditionally use the result
  const gamificationContext = useGamification();
  const gamification = FEATURES.gamification ? gamificationContext : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left: Menu toggle and logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <svg
              className="w-6 h-6 text-dark-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl">{COURSE_ICON}</span>
            <h1 className="text-lg font-semibold text-dark-100 hidden sm:block">
              {COURSE_NAME}
            </h1>
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href={HUB_URL}
            className="text-dark-400 hover:text-dark-100 transition-colors text-sm font-medium"
          >
            Hub
          </a>
          <Link
            to="/"
            className="text-dark-400 hover:text-dark-100 transition-colors text-sm font-medium"
          >
            Home
          </Link>
          {FEATURES.theoremIndex && (
            <Link
              to="/theorems"
              className="text-dark-400 hover:text-dark-100 transition-colors text-sm font-medium"
            >
              Theorems
            </Link>
          )}
          {FEATURES.interactiveModules && (
            <Link
              to="/interactive"
              className="text-dark-400 hover:text-dark-100 transition-colors text-sm font-medium"
            >
              Interactive
            </Link>
          )}
          {FEATURES.leaderboard && (
            <Link
              to="/leaderboard"
              className="text-dark-400 hover:text-dark-100 transition-colors text-sm font-medium"
            >
              Leaderboard
            </Link>
          )}
        </nav>

        {/* Right: Gamification stats */}
        {FEATURES.gamification && gamification && (
          <div className="flex items-center gap-4">
            <StreakBadge streak={gamification.state.streak.currentStreak} />
            <XPDisplay
              xp={gamification.state.user.totalXP}
              level={gamification.state.user.level}
            />
          </div>
        )}
      </div>
    </header>
  );
}

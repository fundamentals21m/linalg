import { useState } from 'react';
import { Header, Sidebar } from '@/components/layout';
import { COURSE_NAME, FEATURES } from '@/config';

// This is a placeholder - the full leaderboard requires Firebase/Nostr integration
// See src/shared/ for the full implementation

export default function Leaderboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-20 pb-12 px-4 lg:pl-80 lg:pr-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-dark-100 mb-2">Leaderboard</h1>
          <p className="text-dark-400 mb-8">
            See how you rank against other learners in {COURSE_NAME}
          </p>

          {FEATURES.nostrAuth ? (
            <div className="p-8 rounded-2xl bg-dark-800/50 border border-dark-700/50 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h2 className="text-xl font-semibold text-dark-100 mb-2">
                Connect with Nostr
              </h2>
              <p className="text-dark-400 mb-6 max-w-md mx-auto">
                Connect your Nostr wallet (Alby, nos2x, etc.) to join the global leaderboard
                and compete with other learners.
              </p>
              <button className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors">
                Connect Wallet
              </button>
              <p className="text-sm text-dark-500 mt-4">
                Don't have a Nostr wallet?{' '}
                <a
                  href="https://getalby.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300"
                >
                  Get Alby
                </a>
              </p>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-dark-800/50 border border-dark-700/50 text-center">
              <p className="text-dark-400">
                Leaderboard is not enabled for this course.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

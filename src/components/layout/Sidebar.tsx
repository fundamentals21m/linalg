import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { curriculum } from '@/data/curriculum';
import { FEATURES } from '@/config';
import { useGamification } from '@/contexts/GamificationContext';
import { MasteryIndicator } from '@/components/gamification';
import { COURSE_ID } from '@/config';
import type { SectionId } from '@magic-internet-math/shared';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedParts, setExpandedParts] = useState<Set<number>>(new Set([1]));
  // Always call the hook unconditionally, then conditionally use the result
  const gamificationContext = useGamification();
  const gamification = FEATURES.gamification ? gamificationContext : null;

  const togglePart = (partId: number) => {
    setExpandedParts((prev) => {
      const next = new Set(prev);
      if (next.has(partId)) {
        next.delete(partId);
      } else {
        next.add(partId);
      }
      return next;
    });
  };

  const getMasteryLevel = (sectionId: number) => {
    if (!gamification) return 'none';
    const id = `${COURSE_ID}:${sectionId}` as SectionId;
    return gamification.state.sections[id]?.masteryLevel ?? 'none';
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 z-40
          w-72 bg-dark-900 border-r border-dark-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          overflow-y-auto
        `}
      >
        <nav className="p-4">
          {/* Reference Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 px-3 py-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
                <span className="text-xs font-bold text-amber-400">★</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-dark-500">
                Reference
              </span>
            </div>
            <ul className="space-y-0.5">
              {FEATURES.theoremIndex && (
                <li>
                  <NavLink
                    to="/theorems"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-primary-500/10 text-primary-400'
                          : 'text-dark-300 hover:bg-dark-800 hover:text-dark-100'
                      }`
                    }
                  >
                    <span className="text-lg">📜</span>
                    Theorems
                  </NavLink>
                </li>
              )}
              {FEATURES.interactiveModules && (
                <li>
                  <NavLink
                    to="/interactive"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-primary-500/10 text-primary-400'
                          : 'text-dark-300 hover:bg-dark-800 hover:text-dark-100'
                      }`
                    }
                  >
                    <span className="text-lg">🎮</span>
                    Interactive Modules
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Curriculum Parts */}
          <div className="space-y-2">
            {curriculum.map((part) => (
              <div key={part.id}>
                {/* Part Header */}
                <button
                  onClick={() => togglePart(part.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-400">
                        {part.id}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-dark-200">
                      {part.title}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-dark-500 transition-transform ${
                      expandedParts.has(part.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Section List */}
                <AnimatePresence>
                  {expandedParts.has(part.id) && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 mt-1 space-y-0.5 overflow-hidden"
                    >
                      {part.sections.map((section) => (
                        <li key={section.id}>
                          <NavLink
                            to={`/section/${section.id}`}
                            onClick={() => {
                              if (window.innerWidth < 1024) onClose();
                            }}
                            className={({ isActive }) =>
                              `flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? 'bg-primary-500/10 text-primary-400'
                                  : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'
                              }`
                            }
                          >
                            <span className="truncate">{section.title}</span>
                            {FEATURES.gamification && (
                              <MasteryIndicator level={getMasteryLevel(section.id)} />
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}

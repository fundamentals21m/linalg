import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentBlockProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Definition block - blue gradient, used for mathematical definitions
 */
export function Definition({ title, children, className = '' }: ContentBlockProps) {
  return (
    <div
      className={`my-6 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 ${className}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Definition
          </span>
          <h3 className="text-lg font-semibold text-dark-100">{title}</h3>
        </div>
      </div>
      <div className="text-dark-300 pl-11">{children}</div>
    </div>
  );
}

interface TheoremProps extends ContentBlockProps {
  proof?: ReactNode;
}

/**
 * Theorem block - amber gradient, with optional collapsible proof
 */
export function Theorem({ title, children, proof, className = '' }: TheoremProps) {
  const [showProof, setShowProof] = useState(false);

  return (
    <div
      className={`my-6 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 ${className}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Theorem
          </span>
          <h3 className="text-lg font-semibold text-dark-100">{title}</h3>
        </div>
      </div>
      <div className="text-dark-300 pl-11">{children}</div>

      {proof && (
        <div className="mt-4 pl-11">
          <button
            onClick={() => setShowProof(!showProof)}
            className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showProof ? 'rotate-90' : ''}`}
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
            {showProof ? 'Hide Proof' : 'Show Proof'}
          </button>
          <AnimatePresence>
            {showProof && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 rounded-xl bg-dark-800/50 border border-dark-700/50 text-dark-300">
                  <div className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2">
                    Proof
                  </div>
                  {proof}
                  <div className="text-right mt-4 text-dark-500">∎</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/**
 * Example block - emerald gradient, used for worked examples
 */
export function Example({ title, children, className = '' }: ContentBlockProps) {
  return (
    <div
      className={`my-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 ${className}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Example
          </span>
          <h3 className="text-lg font-semibold text-dark-100">{title}</h3>
        </div>
      </div>
      <div className="text-dark-300 pl-11">{children}</div>
    </div>
  );
}

/**
 * Axiom block - purple gradient, used for fundamental axioms
 */
export function Axiom({ title, children, className = '' }: ContentBlockProps) {
  return (
    <div
      className={`my-6 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 ${className}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Axiom
          </span>
          <h3 className="text-lg font-semibold text-dark-100">{title}</h3>
        </div>
      </div>
      <div className="text-dark-300 pl-11">{children}</div>
    </div>
  );
}

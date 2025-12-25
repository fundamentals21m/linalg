import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AchievementNotification } from '@magic-internet-math/shared';
import { useGamification } from '@/contexts/GamificationContext';

const categoryIcons: Record<string, string> = {
  progress: '🎯',
  mastery: '🏆',
  dedication: '💪',
  exploration: '🔍',
};

interface AchievementToastProps {
  notification: AchievementNotification;
  onDismiss: () => void;
}

export function AchievementToast({ notification, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="pointer-events-auto"
    >
      <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-dark-800 border border-primary-500/30 shadow-xl shadow-primary-500/10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center text-2xl">
          {categoryIcons[notification.category] || '🎉'}
        </div>
        <div className="flex-1">
          <div className="text-xs text-primary-400 font-medium uppercase tracking-wider mb-0.5">
            Achievement Unlocked!
          </div>
          <div className="text-dark-100 font-semibold">{notification.title}</div>
          <div className="text-sm text-dark-400">{notification.description}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary-400">+{notification.xpReward}</div>
          <div className="text-xs text-dark-500">XP</div>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 text-dark-500 hover:text-dark-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export function AchievementToastContainer() {
  const { notifications, dismissNotification } = useGamification();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <AchievementToast
            key={notification.id}
            notification={notification}
            onDismiss={() => dismissNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

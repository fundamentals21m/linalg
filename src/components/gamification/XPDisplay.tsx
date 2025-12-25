import { motion } from 'framer-motion';
import { getLevelProgress } from '@magic-internet-math/shared';

interface XPDisplayProps {
  xp: number;
  level: number;
  compact?: boolean;
}

export function XPDisplay({ xp, level, compact = false }: XPDisplayProps) {
  const progress = getLevelProgress(xp, level);

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-primary-400 font-medium">Lv.{level}</span>
        <span className="text-dark-400">{xp} XP</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Level badge */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
        <span className="text-sm font-bold text-white">{level}</span>
      </div>

      {/* XP info */}
      <div className="flex-1 min-w-[80px]">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-dark-400">Level {level}</span>
          <span className="text-primary-400 font-medium">{xp} XP</span>
        </div>
        <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
      <span className="text-orange-400">🔥</span>
      <span className="text-sm font-medium text-orange-400">{streak}</span>
    </div>
  );
}

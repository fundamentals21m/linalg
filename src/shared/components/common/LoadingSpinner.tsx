/**
 * LoadingSpinner - Used for Suspense fallback during lazy loading
 */

interface LoadingSpinnerProps {
  /** Optional message to display below the spinner */
  message?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full screen mode (centered in viewport) */
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-6 w-6 border-2',
  md: 'h-10 w-10 border-3',
  lg: 'h-14 w-14 border-4',
};

export function LoadingSpinner({
  message = 'Loading...',
  size = 'lg',
  fullScreen = true,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`animate-spin rounded-full border-t-primary-500 border-r-transparent border-b-primary-500/30 border-l-transparent ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="text-dark-400 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;

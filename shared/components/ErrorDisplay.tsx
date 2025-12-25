import { useErrorContext } from './ErrorContext';

interface ErrorDisplayProps {
  className?: string;
}

export function ErrorDisplay({ className = '' }: ErrorDisplayProps) {
  const { errors, dismissError, dismissAll } = useErrorContext();

  if (errors.length === 0) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 max-w-md w-full ${className}`}>
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-red-900">
            {errors.length === 1 ? 'Error' : 'Errors'} ({errors.length})
          </h3>
          {errors.length > 1 && (
            <button
              onClick={dismissAll}
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Dismiss all
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {errors.map((error) => (
            <div key={error.id} className="bg-white p-3 rounded border border-red-100">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="text-red-900 font-medium">
                    {error.message}
                  </p>
                  {error.details && (
                    <p className="text-sm text-red-700 mt-1">
                      {error.details}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => dismissError(error.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {errors.some((e) => !e.recoverable) && (
          <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-700">
            <strong>Note:</strong> Some errors cannot be recovered. Please try refreshing the page or contact support.
          </div>
        )}
      </div>
    </div>
  );
}

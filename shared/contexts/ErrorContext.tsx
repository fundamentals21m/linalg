import { createContext, useContext, useCallback, ReactNode, useState } from 'react';
import { getLogger } from '../utils/logger';

const logger = getLogger('ErrorContext');

export interface AppError {
  id: string;
  message: string;
  details?: string;
  recoverable?: boolean;
  timestamp: Date;
}

interface ErrorContextValue {
  errors: AppError[];
  addError: (error: Omit<AppError, 'id' | 'timestamp'>) => void;
  dismissError: (id: string) => void;
  dismissAll: () => void;
}

const ErrorContext = createContext<ErrorContextValue | null>(null);

interface ErrorProviderProps {
  children: ReactNode;
  onError?: (error: AppError) => void;
}

export function ErrorProvider({ children, onError }: ErrorProviderProps) {
  const [errors, setErrors] = useState<AppError[]>([]);

  const addError = useCallback(
    (error: Omit<AppError, 'id' | 'timestamp'>) => {
      const newError: AppError = {
        id: Math.random().toString(36).substr(2, 9),
        ...error,
        timestamp: new Date(),
        recoverable: error.recoverable ?? true,
      };

      setErrors((prev) => {
        const updated = [...prev, newError];
        if (onError) {
          onError(newError);
        }
        return updated;
      });

      logger.error('App error added:', newError);
    },
    [onError]
  );

  const dismissError = useCallback((id: string) => {
    setErrors((prev) => prev.filter((err) => err.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setErrors([]);
  }, []);

  return (
    <ErrorContext.Provider value={{ errors, addError, dismissError, dismissAll }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useErrorContext() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useErrorContext must be used within ErrorProvider');
  }

  return context;
}

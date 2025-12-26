/**
 * Simple logger utility for development and production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerInterface {
  debug: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
}

class LoggerImpl implements LoggerInterface {
  private prefix: string;
  private enabled: boolean;

  constructor(prefix: string = '', enabled: boolean = true) {
    this.prefix = prefix ? `[${prefix}]` : '';
    this.enabled = enabled;
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (!this.enabled) return;

    const fullMessage = this.prefix ? `${this.prefix} ${message}` : message;

    // In production, only log warnings and errors
    const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
    
    if (level === 'debug' && !isDev) return;
    if (level === 'info' && !isDev) return;

    const logFn = console[level] || console.log;
    
    if (data !== undefined) {
      logFn(fullMessage, data);
    } else {
      logFn(fullMessage);
    }
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

// Cache for named loggers
const loggers: Record<string, LoggerImpl> = {};

/**
 * Get a logger instance, optionally with a prefix
 */
export function getLogger(name?: string): LoggerInterface {
  const key = name || '__default__';
  
  if (!loggers[key]) {
    loggers[key] = new LoggerImpl(name);
  }
  
  return loggers[key];
}

export default getLogger;

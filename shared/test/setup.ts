import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Minimal setup for localStorage tests
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: (key: string) => null,
    setItem: (key: string, value: string) => {},
    removeItem: (key: string) => {},
    clear: () => {},
    get length: () => 0,
    key: (index: number) => null,
  },
  writable: true,
});

// Minimal setup for document for React tests
Object.defineProperty(global, 'document', {
  value: {
    defaultView: {
      getComputedStyle: vi.fn(() => ({
        getPropertyValue: vi.fn(),
        cssText: '',
        display: 'block',
        width: '0px',
        height: '0px',
        getPropertyValue: vi.fn(() => ''),
      })),
    },
    body: {
      style: {},
    },
    createElement: vi.fn(),
    querySelector: vi.fn(() => null),
    querySelectorAll: vi.fn(() => []),
  },
  writable: true,
});

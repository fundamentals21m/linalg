import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Only set up localStorage mock if not already provided by the environment
if (typeof globalThis.localStorage === 'undefined') {
  const localStorageMock = {
    store: {} as Record<string, string>,
    getItem(key: string) {
      return this.store[key] ?? null;
    },
    setItem(key: string, value: string) {
      this.store[key] = value;
    },
    removeItem(key: string) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    },
    get length() {
      return Object.keys(this.store).length;
    },
    key(index: number) {
      return Object.keys(this.store)[index] ?? null;
    },
  };

  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
}

// Only set up document mock if not already provided by the environment (node environment)
if (typeof globalThis.document === 'undefined') {
  Object.defineProperty(globalThis, 'document', {
    value: {
      defaultView: {
        getComputedStyle: vi.fn(() => ({
          getPropertyValue: vi.fn(() => ''),
          cssText: '',
          display: 'block',
          width: '0px',
          height: '0px',
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
}

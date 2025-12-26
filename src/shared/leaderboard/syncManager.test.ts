import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SyncManager, getSyncManager } from './syncManager';

// Mock localStorage
const createLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      return Object.keys(store)[index] || null;
    },
  };
};

// Mock Firebase
vi.mock('firebase/functions', () => ({
  httpsCallable: vi.fn(() => vi.fn(() => Promise.resolve({ data: { success: true, totalXP: 100 } }))),
}));

vi.mock('../firebase/config', () => ({
  getFirebaseFunctions: vi.fn(),
  isFirebaseConfigured: vi.fn(() => true),
}));

const STORAGE_KEY = 'magic-internet-math-progress';

describe('SyncManager', () => {
  let localStorageMock: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    localStorageMock = createLocalStorageMock();
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  describe('getLocalScores', () => {
    it('should return null when no data in storage', () => {
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();
      expect(result).toBeNull();
    });

    it('should return null when storage has invalid data', () => {
      localStorageMock.setItem(STORAGE_KEY, 'invalid json');
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();
      expect(result).toBeNull();
    });

    it('should return null when user object is missing', () => {
      const state = { sections: {} };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(state));
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();
      expect(result).toBeNull();
    });

    it('should return null when sections object is missing', () => {
      const state = { user: { totalXP: 50 } };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(state));
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();
      expect(result).toBeNull();
    });

    it('should calculate XP from visited sections', () => {
      const state = {
        user: { totalXP: 50 },
        sections: {
          'ba:1': { visitedAt: '2024-01-01' },
          'crypto:1': { visitedAt: '2024-01-01' },
        },
      };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(state));
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();

      expect(result).not.toBeNull();
      expect(result?.ba).toBe(10); // 10 XP for visit
      expect(result?.crypto).toBe(10); // 10 XP for visit
    });

    it('should calculate XP from completed sections', () => {
      const state = {
        user: { totalXP: 75 },
        sections: {
          'ba:1': { visitedAt: '2024-01-01', completedAt: '2024-01-02' },
        },
      };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(state));
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();

      expect(result).not.toBeNull();
      expect(result?.ba).toBe(35); // 10 XP for visit + 25 XP for completion
    });

    it('should calculate XP from quiz attempts', () => {
      const state = {
        user: { totalXP: 100 },
        sections: {
          'linalg:1': {
            visitedAt: '2024-01-01',
            quizAttempts: [
              { xpEarned: 20 },
              { xpEarned: 15 },
            ],
          },
        },
      };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(state));
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();

      expect(result).not.toBeNull();
      expect(result?.linalg).toBe(45); // 10 for visit + 20 + 15 from quizzes
    });

    it('should calculate XP from visualizations', () => {
      const state = {
        user: { totalXP: 25 },
        sections: {
          'aa:1': {
            visitedAt: '2024-01-01',
            visualizationsInteracted: ['graph1', 'graph2'],
          },
        },
      };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(state));
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();

      expect(result).not.toBeNull();
      expect(result?.aa).toBe(20); // 10 for visit + 5*2 for visualizations
    });

    it('should ignore unknown course prefixes', () => {
      const state = {
        user: { totalXP: 10 },
        sections: {
          'unknown:1': { visitedAt: '2024-01-01' },
        },
      };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(state));
      const syncManager = new SyncManager();
      const result = syncManager.getLocalScores();

      expect(result).not.toBeNull();
      expect(result?.ba).toBe(0);
      expect(result?.crypto).toBe(0);
      expect(result?.aa).toBe(0);
      expect(result?.linalg).toBe(0);
    });
  });

  describe('setDisplayName', () => {
    it('should set display name', () => {
      const syncManager = new SyncManager();
      syncManager.setDisplayName('Test User');
      // Verify via internal state - method exists and doesn't throw
      expect(() => syncManager.setDisplayName(null)).not.toThrow();
    });
  });

  describe('setAuthenticated', () => {
    it('should set authentication status', () => {
      const syncManager = new SyncManager();
      // Should not throw
      expect(() => syncManager.setAuthenticated(true)).not.toThrow();
      expect(() => syncManager.setAuthenticated(false)).not.toThrow();
    });
  });

  describe('syncNow', () => {
    it('should return error when not authenticated', async () => {
      const syncManager = new SyncManager();
      const result = await syncManager.syncNow();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Not authenticated');
    });

    it('should return error when no scores to sync', async () => {
      const syncManager = new SyncManager();
      syncManager.setAuthenticated(true);
      // Wait for initial sync attempt
      await new Promise(resolve => setTimeout(resolve, 100));
      const result = await syncManager.syncNow();
      expect(result.success).toBe(false);
      expect(result.error).toBe('No scores to sync');
    });
  });

  describe('getSyncManager', () => {
    it('should return singleton instance', () => {
      const instance1 = getSyncManager();
      const instance2 = getSyncManager();
      expect(instance1).toBe(instance2);
    });
  });
});

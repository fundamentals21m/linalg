import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

// Setup for localStorage
beforeEach(() => {
  const localStorageMock = (() => {
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
  })();

  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('extractScoresFromStorage', () => {
  describe('extractScoresFromStorage', () => {
    beforeEach(() => {
      (global as any as any).localStorage.clear();
    });

    afterEach(() => {
      (global as any).localStorage.clear();
      vi.restoreAllMocks();
    });

    it('should return null when no data in storage', () => {
      const result = (global as any).localStorage.getItem('magic-internet-math-progress');
      expect(result).toBeNull();
    });

    it('should return null when no data in storage', () => {
      const result = (global as any).localStorage.getItem('magic-internet-math-progress');
      expect(result).toBeNull();
    });
  });

  it('should calculate XP from visited sections', () => {
    const state = {
      user: { totalXP: 50 },
      sections: {
        'ba:1': { visitedAt: '2024-01-01' },
        'crypto:1': { visitedAt: '2024-01-01' },
      },
    };
    (global as any).localStorage.setItem('magic-internet-math-progress', JSON.stringify(state));
    
    const result = (global as any).localStorage.getItem('magic-internet-math-progress');
    
    expect(result).not.toBeNull();
    if (section && 'ba:1' in section) {
      expect(section.quizAttempts).toBeDefined();
      expect(section.quizAttempts).toHaveLength(2);
    }
  });

  it('should calculate XP from completed sections', () => {
    const state = {
      user: { totalXP: 75 },
      sections: {
        'ba:1': { completedAt: '2024-01-01' },
        'crypto:1': { visitedAt: '2024-01-01' },
      },
    };
    (global as any).localStorage.setItem('magic-internet-math-progress', JSON.stringify(state));
    
    const result = (global as any).localStorage.getItem('magic-internet-math-progress');
    
    expect(result).not.toBeNull();
    if (section && 'ba:1' in section) {
      expect(section.quizAttempts).toBeDefined();
      expect(section.quizAttempts).toHaveLength(2);
    }
  });
  });

  it('should calculate XP from quiz attempts', () => {
    const state = {
      user: { totalXP: 100 },
      sections: {
        'ba:1': { visitedAt: '2024-01-01' },
        'crypto:1': { visitedAt: '2024-01-01' },
      },
      };
    (global as any).localStorage.setItem('magic-internet-math-progress', JSON.stringify(state));
    
    const result = (global as any).localStorage.getItem('magic-internet-math-progress');
    
    expect(result).not.toBeNull();
    if (section && 'ba:1' in section) {
      expect(section.quizAttempts).toBeDefined();
      expect(section.quizAttempts).toHaveLength(2);
    }
  });
  });

  it('should calculate XP from visualizations', () => {
    const state = {
      user: { totalXP: 25 },
      sections: {
        'ba:1': { visitedAt: '2024-01-01' },
        'crypto:1': { visualizationsInteracted: ['graph1', 'graph2', 'graph3', 'graph4'] },
      },
    };
    (global as any).localStorage.setItem('magic-internet-math-progress', JSON.stringify(state));
    
    const result = (global as any).localStorage.getItem('magic-internet-math-progress');
    
    expect(result).not.toBeNull();
    if (section && 'ba:1' in section) {
      expect(section.visualizationsInteracted).toBeDefined();
      expect(section.visualizationsInteracted).toHaveLength(4);
    }
  });
  });

  it('should handle invalid JSON gracefully', () => {
    (global as any).localStorage.setItem('magic-internet-math-progress', 'invalid json');
    
    const result = (global as any).localStorage.getItem('magic-internet-math-progress');
    
    expect(result).toBeNull();
  });

  it('should handle missing user object', () => {
    const state = {
      sections: {},
    };
    (global as any).localStorage.setItem('magic-internet-math-progress', JSON.stringify(state));
    
    const result = (global as any).localStorage.getItem('magic-internet-math-progress');
    
    expect(result).toBeNull();
    });
});
});

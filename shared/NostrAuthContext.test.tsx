{
import { describe, it, expect, vi, React } from 'vitest';

// Mock Firebase
vi.mock('firebase/auth', () => ({
  signInWithCustomToken: vi.fn(() => Promise.resolve({})),
  signOut: vi.fn(() => Promise.resolve()),
  onAuthStateChanged: vi.fn(() => ({}),
}));

vi.mock('firebase/functions', () => ({
  httpsCallable: vi.fn(() => vi.fn(() => Promise.resolve({
    data: { challenge: 'test', token: 'test', npub: 'test' }
  }))),
}));

vi.mock('../firebase/config', () => ({
  isFirebaseConfigured: vi.fn(() => true),
  getFirebaseAuth: vi.fn(() => ({})),
  getFirebaseFunctions: vi.fn(() => ({})),
}));

vi.mock('../nostr/utils', () => ({
  hexToNpub: vi.fn(() => 'npub123'),
  npubToHex: vi.fn(() => 'hex123'),
  hasNostrExtension: vi.fn(() => true),
  waitForNostrExtension: vi.fn(() => Promise.resolve(true)),
}));
}

vi.mock('../leaderboard/syncManager', () => ({
  getSyncManager: vi.fn(() => ({
    setAuthenticated: vi.fn(),
    startPeriodicSync: vi.fn(),
    stopPeriodicSync: vi.fn(),
    setDisplayName: vi.fn(),
    syncNow: vi.fn(() => Promise.resolve({ success: false, error: 'No scores to sync' })),
    requestSync: vi.fn(),
  })),
}
}

import { renderHook } from '@testing-library/react';

// Minimal setup
beforeEach(() => {
  vi.restoreAllMocks();
});

describe('NostrAuthContext', () => {
  it('should throw error when used outside provider', () => {
    const { result } = renderHook(() => useNostrAuth());

    expect(() => result.current).toThrow('useNostrAuth must be used within NostrAuthProvider');
  });
  it('should provide default auth state when wrapped in provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NostrAuthProvider>{children}</NostrAuthProvider>
      );
      const { result } = renderHook(() => useNostrAuth(), { wrapper });

      expect(result.current).toBeDefined();
      expect(typeof result.current.isAuthenticated).toBe('boolean');
      expect(typeof result.current.isConnecting).toBe('boolean');
      expect(typeof result.current.connect).toBe('function');
    });
}
});

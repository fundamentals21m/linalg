/**
 * @vitest-environment happy-dom
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { NostrAuthProvider, useNostrAuth } from './NostrAuthContext';
import type { ReactNode } from 'react';

// Mock the dependencies
vi.mock('../firebase/config', () => ({
  isFirebaseConfigured: vi.fn(() => false),
  getFirebaseAuth: vi.fn(() => ({})),
  getFirebaseFunctions: vi.fn(() => ({})),
}));

// Mock firebase/auth to prevent actual Firebase calls
vi.mock('firebase/auth', () => ({
  signInWithCustomToken: vi.fn(() => Promise.resolve()),
  signOut: vi.fn(() => Promise.resolve()),
  onAuthStateChanged: vi.fn((auth, callback) => {
    // Call with null user by default (not signed in)
    callback(null);
    return () => {}; // unsubscribe function
  }),
}));

vi.mock('../nostr/utils', () => ({
  hexToNpub: vi.fn((hex: string) => `npub1${hex.slice(0, 10)}`),
  npubToHex: vi.fn((npub: string) => npub.replace('npub1', '') + '0'.repeat(54)),
  hasNostrExtension: vi.fn(() => false),
  waitForNostrExtension: vi.fn(() => Promise.resolve(false)),
  fetchProfileFromRelay: vi.fn(() => Promise.resolve(null)),
}));

vi.mock('../leaderboard/syncManager', () => ({
  getSyncManager: vi.fn(() => ({
    setAuthenticated: vi.fn(),
    setDisplayName: vi.fn(),
    startPeriodicSync: vi.fn(),
    stopPeriodicSync: vi.fn(),
    requestSync: vi.fn(),
    syncNow: vi.fn(() => Promise.resolve({ success: true })),
  })),
}));

vi.mock('../utils/logger', () => ({
  getLogger: vi.fn(() => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  })),
}));

vi.mock('../validation/schemas', () => ({
  validateLocalStorageData: vi.fn(() => ({ valid: true })),
}));

// Import mocked modules to control behavior
import { isFirebaseConfigured, getFirebaseAuth } from '../firebase/config';
import { hasNostrExtension, waitForNostrExtension } from '../nostr/utils';

// Helper to create wrapper
function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <NostrAuthProvider>{children}</NostrAuthProvider>;
  };
}

describe('NostrAuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage mock
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useNostrAuth hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useNostrAuth());
      }).toThrow('useNostrAuth must be used within NostrAuthProvider');
      
      consoleSpy.mockRestore();
    });

    it('should return initial state when used within provider', async () => {
      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      // Wait for extension check to complete
      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isConnecting).toBe(false);
      expect(result.current.npub).toBeNull();
      expect(result.current.displayName).toBeNull();
      expect(result.current.nip05).toBeNull();
      expect(result.current.isAdmin).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should detect when Nostr extension is available', async () => {
      vi.mocked(waitForNostrExtension).mockResolvedValue(true);
      vi.mocked(hasNostrExtension).mockReturnValue(true);

      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      expect(result.current.hasExtension).toBe(true);
    });

    it('should detect when Nostr extension is not available', async () => {
      vi.mocked(waitForNostrExtension).mockResolvedValue(false);
      vi.mocked(hasNostrExtension).mockReturnValue(false);

      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      expect(result.current.hasExtension).toBe(false);
    });
  });

  describe('connect function', () => {
    it('should return early if Firebase is not configured', async () => {
      vi.mocked(isFirebaseConfigured).mockReturnValue(false);
      vi.mocked(hasNostrExtension).mockReturnValue(true);

      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      await act(async () => {
        await result.current.connect();
      });

      // Should not set isConnecting since it returns early
      expect(result.current.isConnecting).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should set error when no Nostr extension found', async () => {
      vi.mocked(isFirebaseConfigured).mockReturnValue(true);
      vi.mocked(hasNostrExtension).mockReturnValue(false);
      vi.mocked(waitForNostrExtension).mockResolvedValue(false);

      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      await act(async () => {
        await result.current.connect();
      });

      expect(result.current.error).toBe(
        'No Nostr extension found. Please install nos2x, Alby, or another NIP-07 extension.'
      );
    });
  });

  describe('disconnect function', () => {
    it('should clear auth state when Firebase is not configured', async () => {
      vi.mocked(isFirebaseConfigured).mockReturnValue(false);

      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      await act(async () => {
        await result.current.disconnect();
      });

      expect(result.current.npub).toBeNull();
      expect(result.current.displayName).toBeNull();
      expect(result.current.isAdmin).toBe(false);
    });

    it('should clear localStorage on disconnect', async () => {
      vi.mocked(isFirebaseConfigured).mockReturnValue(false);
      
      // Set up localStorage with auth state
      localStorage.setItem(
        'magic-internet-math-nostr-auth',
        JSON.stringify({ npub: 'test-npub', displayName: 'Test User' })
      );

      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      await act(async () => {
        await result.current.disconnect();
      });

      expect(localStorage.getItem('magic-internet-math-nostr-auth')).toBeNull();
    });
  });

  describe('setDisplayName function', () => {
    it('should update display name state', async () => {
      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      act(() => {
        result.current.setDisplayName('New Name');
      });

      expect(result.current.displayName).toBe('New Name');
    });

    it('should handle null display name', async () => {
      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      // First set a name
      act(() => {
        result.current.setDisplayName('Test Name');
      });

      expect(result.current.displayName).toBe('Test Name');

      // Then clear it
      act(() => {
        result.current.setDisplayName(null);
      });

      expect(result.current.displayName).toBeNull();
    });
  });

  describe('clearError function', () => {
    it('should clear error state', async () => {
      vi.mocked(isFirebaseConfigured).mockReturnValue(true);
      vi.mocked(hasNostrExtension).mockReturnValue(false);

      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      // Trigger an error
      await act(async () => {
        await result.current.connect();
      });

      expect(result.current.error).not.toBeNull();

      // Clear the error
      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('isAuthenticated computed property', () => {
    it('should be false when not connected', async () => {
      const { result } = renderHook(() => useNostrAuth(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.extensionChecked).toBe(true);
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});

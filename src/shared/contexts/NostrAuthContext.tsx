/**
 * NostrAuthContext - Manages Nostr authentication state
 * Uses NIP-07 browser extensions (nos2x, Alby, etc.)
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { signInWithCustomToken, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseAuth, getFirebaseFunctions, isFirebaseConfigured } from '../firebase/config';
import {
  hexToNpub,
  npubToHex,
  hasNostrExtension,
  waitForNostrExtension,
  fetchProfileFromRelay,
} from '../nostr/utils';
import { AUTH_EVENT_KIND, type NostrEvent, type UnsignedNostrEvent } from '../nostr/types';
import { DEFAULT_RELAYS, EXTENSION_WAIT_MS } from '../constants';
import { getSyncManager } from '../leaderboard/syncManager';
import { getLogger } from '../utils/logger';
// import { validateAuthState } from '../validation/schemas'; // Temporarily disabled to test circular dependency

const logger = getLogger('NostrAuth');

interface NostrAuthContextValue {
  // Auth state
  isAuthenticated: boolean;
  isConnecting: boolean;
  npub: string | null;
  displayName: string | null;
  nip05: string | null;
  isAdmin: boolean;
  error: string | null;

  // Extension status
  hasExtension: boolean;
  extensionChecked: boolean;

  // Actions
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  setDisplayName: (name: string | null) => void;
  clearError: () => void;
}

const NostrAuthContext = createContext<NostrAuthContextValue | null>(null);

// Storage key for persisted auth state
const AUTH_STORAGE_KEY = 'magic-internet-math-nostr-auth';

interface StoredAuthState {
  npub: string;
  displayName: string | null;
}

export function NostrAuthProvider({ children }: { children: ReactNode }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [npub, setNpub] = useState<string | null>(null);
  const [displayName, setDisplayNameState] = useState<string | null>(null);
  const [nip05, setNip05] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasExtension, setHasExtension] = useState(false);
  const [extensionChecked, setExtensionChecked] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  // Check for Nostr extension on mount
  useEffect(() => {
    const checkExtension = async () => {
      const found = await waitForNostrExtension(EXTENSION_WAIT_MS);
      setHasExtension(found);
      setExtensionChecked(true);
    };
    checkExtension();
  }, []);

  // Fetch user profile from Nostr relays to get NIP-05 and display name
  const fetchNostrProfile = useCallback(async (pubkeyHex: string) => {
    // Try each relay until we get a profile
    for (const relayUrl of DEFAULT_RELAYS) {
      try {
        const profile = await fetchProfileFromRelay(relayUrl, pubkeyHex);
        if (profile) {
          if (profile.nip05) {
            setNip05(profile.nip05);
          }
          // Use display_name or name from Nostr profile
          const profileName = profile.display_name || profile.name;
          if (profileName) {
            setDisplayNameState(profileName);
            // Sync display name to Firebase
            const syncManager = getSyncManager();
            syncManager.setDisplayName(profileName);
            syncManager.requestSync();
          }
          return;
        }
      } catch (err) {
          logger.warn(`Failed to fetch profile from ${relayUrl}:`, err);
      }
    }
  }, []);

  // Listen to Firebase auth state
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (user) {
        // User is signed in
        setNpub(user.uid);

         // Get custom claims from ID token (force refresh to get latest claims)
        try {
          const tokenResult = await user.getIdTokenResult(true);
          logger.debug('Token claims:', tokenResult.claims);
          setIsAdmin(tokenResult.claims.isAdmin === true);
        } catch (err) {
          logger.error('Error getting token:', err);
          setIsAdmin(false);
        }

         // Restore display name from storage
        try {
          const stored = localStorage.getItem(AUTH_STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            // Simple validation instead of schema validation to avoid circular dependencies
            if (!parsed || !parsed.npub) {
              logger.warn('Invalid auth state in localStorage');
              localStorage.removeItem(AUTH_STORAGE_KEY);
              return;
            }
            if (parsed.npub === user.uid) {
              setDisplayNameState(validation.data.displayName);
            }
          }
        } catch (err) {
          logger.debug('Storage read error:', err);
        }

        // Start sync manager
        const syncManager = getSyncManager();
        syncManager.setAuthenticated(true);
        syncManager.startPeriodicSync();

        // Fetch profile from Nostr relays (for NIP-05)
        try {
          const pubkeyHex = npubToHex(user.uid);
          fetchNostrProfile(pubkeyHex);
        } catch (err) {
          logger.debug('Npub conversion error:', err);
        }
      } else {
        // User is signed out
        setNpub(null);
        setNip05(null);
        setIsAdmin(false);
        setDisplayNameState(null);

        // Stop sync manager
        const syncManager = getSyncManager();
        syncManager.setAuthenticated(false);
        syncManager.stopPeriodicSync();
      }
    });

    return () => unsubscribe();
  }, [fetchNostrProfile]);

  // Connect with Nostr
  const connect = useCallback(async () => {
    logger.debug('connect() called');
    logger.debug('isFirebaseConfigured:', isFirebaseConfigured());
    logger.debug('hasNostrExtension:', hasNostrExtension());

    if (!isFirebaseConfigured()) {
      logger.info('Firebase not configured, cannot connect');
      return;
    }

    if (!hasNostrExtension()) {
      setError('No Nostr extension found. Please install nos2x, Alby, or another NIP-07 extension.');
      logger.warn('No extension found, returning');
      return;
    }

       setIsConnecting(true);
    setError(null);
    logger.info('Starting Nostr connection...');

    try {
      const nostr = window.nostr!;
      const functions = getFirebaseFunctions();

      // Step 1: Get public key from extension
      const pubkeyHex = await nostr.getPublicKey();
      const userNpub = hexToNpub(pubkeyHex);

      // Step 2: Request challenge from server
      const createChallenge = httpsCallable<
        { pubkeyHex: string },
        { challenge: string; expiresAt: number }
      >(functions, 'createChallenge');

      const challengeResult = await createChallenge({ pubkeyHex });
      const { challenge } = challengeResult.data;

      // Step 3: Sign the challenge
      const unsignedEvent: UnsignedNostrEvent = {
        kind: AUTH_EVENT_KIND,
        created_at: Math.floor(Date.now() / 1000),
        tags: [['challenge', challenge]],
        content: challenge,
      };

      const signedEvent: NostrEvent = await nostr.signEvent(unsignedEvent);

      // Step 4: Verify signature and get Firebase token
      const verifyNostrAndCreateToken = httpsCallable<
        { signedEvent: NostrEvent; challenge: string },
        { token: string; npub: string }
      >(functions, 'verifyNostrAndCreateToken');

      const verifyResult = await verifyNostrAndCreateToken({
        signedEvent,
        challenge,
      });

      // Step 5: Sign in to Firebase
      const auth = getFirebaseAuth();
      await signInWithCustomToken(auth, verifyResult.data.token);

       // Store auth state
       try {
         const authState = { npub: userNpub, displayName: null };
         localStorage.setItem(
           AUTH_STORAGE_KEY,
           JSON.stringify(authState)
         );
       } catch (err) {
        logger.warn('Failed to store auth state:', err);
      }

      // Trigger initial sync
      const syncManager = getSyncManager();
      syncManager.syncNow().catch(err => {
        logger.warn('Initial sync failed:', err);
      });
     } catch (err) {
      logger.error('Nostr connect error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to connect. Please try again.'
      );
    } finally {
      setIsConnecting(false);
    }
  }, [hasExtension]);

  // Disconnect
  const disconnect = useCallback(async () => {
    try {
      if (isFirebaseConfigured()) {
        const auth = getFirebaseAuth();
        await signOut(auth);
      }

      // Clear stored auth state
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (err) {
        logger.warn('Failed to clear auth state from storage:', err);
      }

      setNpub(null);
      setDisplayNameState(null);
      setIsAdmin(false);
    } catch (err) {
        logger.error('Disconnect error:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to disconnect'
      );
    }
  }, []);

  // Set display name
  const setDisplayName = useCallback(
    (name: string | null) => {
      setDisplayNameState(name);

      // Update storage
      if (npub) {
        try {
          localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({ npub, displayName: name })
          );
        } catch (err) {
          logger.warn('Failed to update display name in storage:', err);
        }
      }

      // Update sync manager and trigger sync
      const syncManager = getSyncManager();
      syncManager.setDisplayName(name);
      syncManager.requestSync();
    },
    [npub]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo<NostrAuthContextValue>(
    () => ({
      isAuthenticated: !!firebaseUser && !!npub,
      isConnecting,
      npub,
      displayName,
      nip05,
      isAdmin,
      error,
      hasExtension,
      extensionChecked,
      connect,
      disconnect,
      setDisplayName,
      clearError,
    }),
    [
      firebaseUser,
      npub,
      isConnecting,
      displayName,
      nip05,
      isAdmin,
      error,
      hasExtension,
      extensionChecked,
      connect,
      disconnect,
      setDisplayName,
      clearError,
    ]
  );

  return (
    <NostrAuthContext.Provider value={value}>
      {children}
    </NostrAuthContext.Provider>
  );
}

export function useNostrAuth() {
  const context = useContext(NostrAuthContext);
  if (!context) {
    throw new Error('useNostrAuth must be used within NostrAuthProvider');
  }
  return context;
}

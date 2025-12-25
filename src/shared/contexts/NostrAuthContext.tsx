import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// =============================================================================
// NOSTR AUTH CONTEXT
// =============================================================================
// Provides NIP-07 wallet authentication for Nostr-based leaderboards.
// Requires a browser extension like Alby or nos2x.
// =============================================================================

interface NostrAuthContextValue {
  isConnected: boolean;
  isLoading: boolean;
  npub: string | null;
  displayName: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
}

const NostrAuthContext = createContext<NostrAuthContextValue | null>(null);

// Check if window.nostr (NIP-07) is available
function hasNostrExtension(): boolean {
  return typeof window !== 'undefined' && 'nostr' in window;
}

export function NostrAuthProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [npub, setNpub] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for existing connection on mount
  useEffect(() => {
    const savedNpub = localStorage.getItem('nostr-npub');
    if (savedNpub && hasNostrExtension()) {
      setNpub(savedNpub);
      setIsConnected(true);
    }
    setIsLoading(false);
  }, []);

  const connect = async () => {
    if (!hasNostrExtension()) {
      setError('No Nostr extension found. Please install Alby or nos2x.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get public key from extension (NIP-07)
      const pubkey = await (window as any).nostr.getPublicKey();

      // Convert to npub format (simplified - full implementation uses nostr-tools)
      const npubValue = `npub1${pubkey.slice(0, 59)}`;

      setNpub(npubValue);
      setIsConnected(true);
      localStorage.setItem('nostr-npub', npubValue);
    } catch (err) {
      setError('Failed to connect. Please try again.');
      console.error('Nostr connection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setNpub(null);
    setDisplayName(null);
    setIsConnected(false);
    localStorage.removeItem('nostr-npub');
  };

  const value: NostrAuthContextValue = {
    isConnected,
    isLoading,
    npub,
    displayName,
    connect,
    disconnect,
    error,
  };

  return (
    <NostrAuthContext.Provider value={value}>
      {children}
    </NostrAuthContext.Provider>
  );
}

export function useNostrAuth() {
  const context = useContext(NostrAuthContext);
  if (!context) {
    throw new Error('useNostrAuth must be used within a NostrAuthProvider');
  }
  return context;
}

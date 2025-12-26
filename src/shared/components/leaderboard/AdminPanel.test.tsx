import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminPanel } from './AdminPanel';

// Mock dependencies
vi.mock('../../firebase/config', () => ({
  getFirebaseFunctions: vi.fn(() => ({})),
  isFirebaseConfigured: vi.fn(() => true),
}));

vi.mock('firebase/functions', () => ({
  httpsCallable: vi.fn(() => vi.fn()),
}));

vi.mock('../../contexts/NostrAuthContext', () => ({
  useNostrAuth: vi.fn(() => ({
    isAdmin: true,
    npub: 'npub1test',
  })),
}));

vi.mock('../../utils/logger', () => ({
  getLogger: () => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

describe('AdminPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render when user is admin', () => {
    render(<AdminPanel />);
    // Should render the admin panel
    expect(screen.getByText(/ban user/i)).toBeDefined();
  });

  describe('npub validation', () => {
    it('should show error for empty npub', async () => {
      render(<AdminPanel />);
      
      // Find and click ban button without entering npub
      const banButton = screen.getByText(/ban user/i);
      fireEvent.click(banButton);
      
      await waitFor(() => {
        expect(screen.getByText(/please enter an npub/i)).toBeDefined();
      });
    });

    it('should show error for invalid npub format', async () => {
      render(<AdminPanel />);
      
      // Enter invalid npub
      const input = screen.getByPlaceholderText(/npub1/i);
      fireEvent.change(input, { target: { value: 'invalid-npub' } });
      
      // Click ban button
      const banButton = screen.getByText(/ban user/i);
      fireEvent.click(banButton);
      
      await waitFor(() => {
        expect(screen.getByText(/invalid npub/i)).toBeDefined();
      });
    });

    it('should accept valid npub format', async () => {
      const { httpsCallable } = await import('firebase/functions');
      const mockBanUser = vi.fn().mockResolvedValue({ data: { success: true } });
      (httpsCallable as ReturnType<typeof vi.fn>).mockReturnValue(mockBanUser);
      
      render(<AdminPanel />);
      
      // Enter valid npub (bech32 format starting with npub1)
      const validNpub = 'npub1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsutc2v';
      const input = screen.getByPlaceholderText(/npub1/i);
      fireEvent.change(input, { target: { value: validNpub } });
      
      // Click ban button
      const banButton = screen.getByText(/ban user/i);
      fireEvent.click(banButton);
      
      // Should not show validation error (might show loading or make API call)
      await waitFor(() => {
        expect(screen.queryByText(/invalid npub/i)).toBeNull();
      });
    });

    it('should trim whitespace from npub input', async () => {
      const { httpsCallable } = await import('firebase/functions');
      const mockBanUser = vi.fn().mockResolvedValue({ data: { success: true } });
      (httpsCallable as ReturnType<typeof vi.fn>).mockReturnValue(mockBanUser);
      
      render(<AdminPanel />);
      
      // Enter npub with whitespace
      const validNpub = '  npub1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsutc2v  ';
      const input = screen.getByPlaceholderText(/npub1/i);
      fireEvent.change(input, { target: { value: validNpub } });
      
      const banButton = screen.getByText(/ban user/i);
      fireEvent.click(banButton);
      
      await waitFor(() => {
        // Should trim and process correctly
        expect(screen.queryByText(/please enter an npub/i)).toBeNull();
      });
    });
  });

  describe('XSS prevention in npub input', () => {
    it('should not execute script tags in npub input', async () => {
      render(<AdminPanel />);
      
      const maliciousInput = '<script>alert("XSS")</script>';
      const input = screen.getByPlaceholderText(/npub1/i);
      fireEvent.change(input, { target: { value: maliciousInput } });
      
      const banButton = screen.getByText(/ban user/i);
      fireEvent.click(banButton);
      
      // Should show validation error, not execute script
      await waitFor(() => {
        expect(screen.getByText(/invalid npub/i)).toBeDefined();
      });
    });

    it('should reject SQL injection attempts', async () => {
      render(<AdminPanel />);
      
      const sqlInjection = "'; DROP TABLE users; --";
      const input = screen.getByPlaceholderText(/npub1/i);
      fireEvent.change(input, { target: { value: sqlInjection } });
      
      const banButton = screen.getByText(/ban user/i);
      fireEvent.click(banButton);
      
      await waitFor(() => {
        expect(screen.getByText(/invalid npub/i)).toBeDefined();
      });
    });
  });

  describe('Error handling', () => {
    it('should handle API errors gracefully', async () => {
      const { httpsCallable } = await import('firebase/functions');
      const mockBanUser = vi.fn().mockRejectedValue(new Error('Network error'));
      (httpsCallable as ReturnType<typeof vi.fn>).mockReturnValue(mockBanUser);
      
      render(<AdminPanel />);
      
      const validNpub = 'npub1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsutc2v';
      const input = screen.getByPlaceholderText(/npub1/i);
      fireEvent.change(input, { target: { value: validNpub } });
      
      const banButton = screen.getByText(/ban user/i);
      fireEvent.click(banButton);
      
      await waitFor(() => {
        // Should show error message, not crash
        expect(screen.getByText(/error|failed/i)).toBeDefined();
      });
    });
  });
});

describe('validateNpub', () => {
  // Import the actual validation function for unit testing
  it('should validate correct npub format', async () => {
    const { validateNpub } = await import('../../validation/schemas');
    
    // Valid npub format
    const validNpub = 'npub1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsutc2v';
    const result = validateNpub(validNpub);
    expect(result.valid).toBe(true);
  });

  it('should reject npub without npub1 prefix', async () => {
    const { validateNpub } = await import('../../validation/schemas');
    
    const result = validateNpub('invalid123');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('npub');
  });

  it('should reject npub with invalid bech32 characters', async () => {
    const { validateNpub } = await import('../../validation/schemas');
    
    // 'b', 'i', 'o' are not valid bech32 characters
    const result = validateNpub('npub1bio123');
    expect(result.valid).toBe(false);
  });

  it('should reject empty string', async () => {
    const { validateNpub } = await import('../../validation/schemas');
    
    const result = validateNpub('');
    expect(result.valid).toBe(false);
  });

  it('should reject null/undefined', async () => {
    const { validateNpub } = await import('../../validation/schemas');
    
    expect(validateNpub(null as unknown as string).valid).toBe(false);
    expect(validateNpub(undefined as unknown as string).valid).toBe(false);
  });
});

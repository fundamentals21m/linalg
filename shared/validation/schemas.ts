import { z } from 'zod';

// =================================================================
// VALIDATION SCHEMAS
// =================================================================

export const STORAGE_KEY_SCHEMA = z.string().min(1).max(100);

export const PUBKEY_HEX_SCHEMA = z.string().regex(/^[a-fA-F0-9]{64}$/);

export const NPUB_SCHEMA = z.string().regex(/^npub1[1-9ac-hjk-np-z46-9]+$/);

export const DISPLAY_NAME_SCHEMA = z.string().min(1).max(50).regex(/^[a-zA-Z0-9\s\-\'\.]+$/);

export const NOIP05_SCHEMA = z.string().regex(/^[a-zA-Z0-9\.\-_]+(@[a-zA-Z0-9\.\-_]+\.[a-zA-Z]{2,})?$/);

export const CHALLENGE_SCHEMA = z.object({
  challenge: z.string().min(10).max(200),
  expiresAt: z.number().int().positive(),
});

export const SIGNED_EVENT_SCHEMA = z.object({
  kind: z.number().int(),
  created_at: z.number().int().nonnegative(),
  tags: z.array(z.array(z.string())),
  content: z.any(),
});

// =================================================================
// LOCAL STORAGE SCHEMAS
// =================================================================

export const AUTH_STATE_SCHEMA = z.object({
  npub: NPUB_SCHEMA,
  displayName: DISPLAY_NAME_SCHEMA.nullable(),
});

export const GAMIIFICATION_STATE_SCHEMA = z.object({
  user: z.object({
    totalXP: z.number().int().min(0),
    level: z.number().int().min(1).max(10),
    sectionsCompleted: z.array(STORAGE_KEY_SCHEMA),
  }),
  sections: z.record(STORAGE_KEY_SCHEMA, z.object({
    visitedAt: z.string().nullable(),
    completedAt: z.string().nullable(),
    quizAttempts: z.array(z.object({
      xpEarned: z.number().int().min(0),
      score: z.number().min(0).max(100),
      timestamp: z.string(),
    })),
    visualizationsInteracted: z.array(z.string().max(100)),
    masteryLevel: z.number().int().min(0).max(3).nullable(),
  })),
  dailyGoals: z.object({
    lastResetDate: z.string().nullable(),
    currentStreak: z.number().int().min(0),
    xpEarned: z.number().int().min(0),
    xpGoal: z.number().int().min(0),
  }),
  lastUpdated: z.number().int().nonnegative(),
});

// =================================================================
// FIREBASE RESPONSE SCHEMAS
// =================================================================

export const FIREBASE_RESPONSE_SCHEMA = z.object({
  success: z.boolean(),
  totalXP: z.number().int().min(0),
});

export const LEADERBOARD_USER_SCHEMA = z.object({
  npub: NPUB_SCHEMA,
  displayName: DISPLAY_NAME_SCHEMA.nullable(),
  xp: z.number().int().min(0),
  lastSync: z.string(),
});

export const ADMIN_LOG_SCHEMA = z.object({
  timestamp: z.string(),
  action: z.string(),
  targetNpub: NPUB_SCHEMA.nullable(),
  performedBy: z.string(),
  details: z.record(z.string(), z.any()).nullable(),
});

// =================================================================
// INPUT SANITIZATION
// =================================================================

export function sanitizeString(input: string, maxLength: number = 100): string {
  return input
    .replace(/[<>]/g, '')
    .substring(0, maxLength)
    .trim();
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .substring(0, 1000);
}

export function sanitizeNumber(input: any, min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
  const num = Number(input);
  if (isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
}

export function sanitizeUrl(input: string): string {
  try {
    const url = new URL(input);
    return url.toString();
  } catch {
    return input;
  }
}

// =================================================================
// VALIDATION HELPERS
// =================================================================

export function validateStorageKey(key: string): boolean {
  const result = STORAGE_KEY_SCHEMA.safeParse(key);
  return result.success;
}

export function validatePubkeyHex(pubkey: string): { valid: boolean; error?: string } {
  const result = PUBKEY_HEX_SCHEMA.safeParse(pubkey);
  if (result.success) return { valid: true };
  
  return { valid: false, error: 'Invalid public key format. Must be 64 hex characters.' };
}

export function validateNpub(npub: string): { valid: boolean; error?: string } {
  const result = NPUB_SCHEMA.safeParse(npub);
  if (result.success) return { valid: true };
  
  return { valid: false, error: 'Invalid npub format. Must start with "npub1" followed by bech32 characters.' };
}

export function validateDisplayName(name: string): { valid: boolean; error?: string } {
  const result = DISPLAY_NAME_SCHEMA.safeParse(name);
  if (result.success) return { valid: true };
  
  if (name.length < 1) return { valid: false, error: 'Display name is required' };
  if (name.length > 50) return { valid: false, error: 'Display name must be 50 characters or less' };
  
  return { valid: false, error: 'Display name contains invalid characters. Only letters, numbers, spaces, hyphens, periods, and apostrophes allowed.' };
}

export function validateNip05(nip05: string): { valid: boolean; error?: string } {
  const result = NOIP05_SCHEMA.safeParse(nip05);
  if (result.success) return { valid: true };
  
  return { valid: false, error: 'Invalid NIP-05 format. Expected format: user@domain.com' };
}

export function validateLocalStorageData(data: unknown): { valid: boolean; error?: string } {
  const result = GAMIIFICATION_STATE_SCHEMA.safeParse(data);
  if (result.success) return { valid: true };
  
  return { valid: false, error: 'Invalid local storage data format' };
}

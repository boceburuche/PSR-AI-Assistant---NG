import { createClient } from '@supabase/supabase-js';

// Only the public browser key belongs here; never use a service-role key.
const DEFAULT_URL = 'https://nzuyumjeactqssaoquxs.supabase.co';
const DEFAULT_PUBLIC_KEY = 'sb_publishable_2EluH7FwjW8zhMwrQg-kbA_9lpAoS8K';
const env = (import.meta as ImportMeta & { env: Record<string, string> }).env;
export const authClient = (env.VITE_SUPABASE_URL || DEFAULT_URL) && (env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_PUBLIC_KEY)
  ? createClient(env.VITE_SUPABASE_URL || DEFAULT_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_PUBLIC_KEY)
  : null;
export const authRedirect = new URL(env.BASE_URL, window.location.origin).href;

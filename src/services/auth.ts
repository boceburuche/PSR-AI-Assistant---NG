import { createClient } from '@supabase/supabase-js';

// Only the public browser key belongs here; never use a service-role key.
const env = (import.meta as ImportMeta & { env: Record<string, string> }).env;
export const authClient = env.VITE_SUPABASE_URL && env.VITE_SUPABASE_PUBLISHABLE_KEY
  ? createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY)
  : null;
export const authRedirect = new URL(env.BASE_URL, window.location.origin).href;

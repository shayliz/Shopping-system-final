import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Public demo fallback values so hosted previews still work if env vars are not set.
const defaultSupabaseUrl = 'https://ruzviuqdxyosqulnelhd.supabase.co';
const defaultSupabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1enZpdXFkeHlvc3F1bG5lbGhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzcyNTgsImV4cCI6MjA4NDY1MzI1OH0.ymK-_jl5jZGpUutQNUaF6nTMqbEWktqsiW5FBwrY47k';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

export const supabaseConfigError =
  !supabaseUrl || !supabaseAnonKey
    ? 'Missing Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).'
    : null;

export const supabase = supabaseConfigError
  ? null
  : createClient<Database>(supabaseUrl, supabaseAnonKey);

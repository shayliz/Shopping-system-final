import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigError =
  !supabaseUrl || !supabaseAnonKey
    ? 'Missing Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).'
    : null;

export const supabase = supabaseConfigError
  ? null
  : createClient<Database>(supabaseUrl, supabaseAnonKey);

import { createClient } from "@supabase/supabase-js";

// Supabase connection details
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://tgmkhrdnuffxophtuflf.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnbWtocmRudWZmeG9waHR1ZmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMTc2MzksImV4cCI6MjA1Njg5MzYzOX0.RRPsNs2NxcEaM1nJyUMZKtciycty5hk_s4An38gXPa4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

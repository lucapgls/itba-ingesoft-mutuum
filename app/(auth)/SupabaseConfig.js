import { createClient } from '@supabase/supabase-js';
import { SUPABASE_API_KEY, SUPABASE_WEB_URL } from '@env';

const SUPABASE_URL = SUPABASE_WEB_URL;
const SUPABASE_ANON_KEY = SUPABASE_API_KEY;

// Create the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
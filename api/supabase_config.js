import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

if (!process.env.SUPABASE_WEB_URL || !process.env.SUPABASE_API_KEY) {
    throw new Error('Missing SUPABASE_WEB_URL or SUPABASE_API_KEY');
}

const supabase = createClient(process.env.SUPABASE_WEB_URL, process.env.SUPABASE_API_KEY);

export { supabase };
import { createClient } from '@supabase/supabase-js';

// We use the Service Role Key so we can bypass RLS policies during server-side uploads
// WARNING: Never use the SERVICE_ROLE_KEY on the client side (React components)
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; 

// Check if keys exist
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase URL or Service Role Key in .env");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
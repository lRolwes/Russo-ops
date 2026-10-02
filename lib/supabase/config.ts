// Supabase connection. The Vercel Supabase integration sets these env vars automatically; the URL and
// publishable/anon key are designed to be public, and security comes from the row-level security
// policies in supabase/schema.sql.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://kvnxzppebqbaxnqybzie.supabase.co";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_xyRDHFaBStf-GONJNSTUKg_mNwrZaOY";

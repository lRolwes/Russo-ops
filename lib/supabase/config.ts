// The Supabase URL and publishable key are designed to be public; security comes from the
// row-level security policies in the database. Env vars override them if the project moves.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://kvnxzppebqbaxnqybzie.supabase.co";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_xyRDHFaBStf-GONJNSTUKg_mNwrZaOY";

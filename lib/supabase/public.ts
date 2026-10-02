import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./config";

/** Cache tag on every public database read; admin saves expire it so changes show at once. */
export const SITE_DATA_TAG = "site-data";

/** Anonymous, cookie-free client for public pages, so they can stay cached. */
export function publicClient() {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 3600, tags: [SITE_DATA_TAG] } }),
    },
  });
}

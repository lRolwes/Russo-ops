import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/lib/supabase/config";

// Called daily by a Vercel cron (vercel.json). Free Supabase projects pause after a week with no
// database activity, and the cached public pages alone may not touch the database that often.
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
  const { error } = await supabase.from("site_settings").select("id").limit(1);
  return Response.json({ ok: !error }, { status: error ? 503 : 200 });
}

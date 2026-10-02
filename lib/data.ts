import { cache } from "react";
import { EMAIL, PHONE } from "@/app/site-content";
import { publicClient } from "./supabase/public";
import { phoneHref, type ContactInfo, type Opportunity } from "./opportunities";

// Public reads. Every function falls back to a safe default so the site still renders if the
// database is unreachable (for example while a paused free-tier project wakes up).

export const getContactInfo = cache(async (): Promise<ContactInfo> => {
  try {
    const { data } = await publicClient().from("site_settings").select("phone,email").eq("id", 1).single();
    if (data?.phone && data?.email) return { phone: data.phone, phoneHref: phoneHref(data.phone), email: data.email };
  } catch {}
  return { phone: PHONE, phoneHref: phoneHref(PHONE), email: EMAIL };
});

/** Published listings that have not passed their closing date (enforced by the database). */
export const getLiveOpportunities = cache(async (): Promise<Opportunity[]> => {
  try {
    const { data } = await publicClient()
      .from("opportunities")
      .select("*")
      .order("posted_on", { ascending: false })
      .order("created_at", { ascending: false });
    return (data as Opportunity[]) ?? [];
  } catch {
    return [];
  }
});

export const getLiveOpportunity = cache(async (slug: string): Promise<Opportunity | null> => {
  try {
    const { data } = await publicClient().from("opportunities").select("*").eq("slug", slug).maybeSingle();
    return (data as Opportunity) ?? null;
  } catch {
    return null;
  }
});

import { cache } from "react";
import { EMAIL, PHONE } from "@/app/site-content";
import { OPPORTUNITY_COLUMNS, hasDatabase, query } from "./db";
import { phoneHref, type ContactInfo, type Opportunity } from "./opportunities";

// Public reads. Each falls back to a safe default so the site still renders if the database is
// unreachable. Pages are cached; saving in the site manager refreshes them (revalidatePath).

const LIVE = "status = 'published' and (closes_on is null or closes_on >= current_date)";

export const getContactInfo = cache(async (): Promise<ContactInfo> => {
  if (hasDatabase) {
    try {
      const [row] = await query<{ phone: string; email: string }>("select phone, email from site_settings where id = 1");
      if (row) return { phone: row.phone, phoneHref: phoneHref(row.phone), email: row.email };
    } catch (e) {
      console.error("getContactInfo", e);
    }
  }
  return { phone: PHONE, phoneHref: phoneHref(PHONE), email: EMAIL };
});

/** Published listings that have not passed their closing date. */
export const getLiveOpportunities = cache(async (): Promise<Opportunity[]> => {
  if (!hasDatabase) return [];
  try {
    return await query<Opportunity>(
      `select ${OPPORTUNITY_COLUMNS} from opportunities where ${LIVE} order by posted_on desc, created_at desc`,
    );
  } catch (e) {
    console.error("getLiveOpportunities", e);
    return [];
  }
});

export const getLiveOpportunity = cache(async (slug: string): Promise<Opportunity | null> => {
  if (!hasDatabase) return null;
  try {
    const [row] = await query<Opportunity>(
      `select ${OPPORTUNITY_COLUMNS} from opportunities where slug = $1 and ${LIVE}`,
      [slug],
    );
    return row ?? null;
  } catch (e) {
    console.error("getLiveOpportunity", e);
    return null;
  }
});

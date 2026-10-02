import type { MetadataRoute } from "next";
import { SITE_URL, contentPages } from "./site-content";
import { getLiveOpportunities } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await getLiveOpportunities();
  const paths = [
    "",
    "jobs",
    "talent-network",
    "contact",
    ...contentPages.map((p) => p.path),
    ...jobs.map((j) => `jobs/${j.slug}`),
  ];
  return paths.map((p) => ({ url: p ? `${SITE_URL}/${p}` : SITE_URL }));
}

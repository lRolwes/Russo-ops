import type { MetadataRoute } from "next";
import { SITE_URL, contentPages } from "./site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "jobs", "talent-network", "contact", ...contentPages.map((p) => p.path)];
  return paths.map((p) => ({ url: `${SITE_URL}/${p}`.replace(/\/$/, "") || SITE_URL }));
}

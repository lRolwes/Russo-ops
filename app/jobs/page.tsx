import type { Metadata } from "next";
import { specialMeta } from "../site-content";
import { SiteShell } from "../site-shell";
import { getLiveOpportunities } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: specialMeta.jobs.title },
  description: specialMeta.jobs.description,
  alternates: { canonical: "/jobs" },
};

export default async function JobsPage() {
  const jobs = await getLiveOpportunities();
  return <SiteShell kind="jobs" jobs={jobs} />;
}

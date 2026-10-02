import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "../../site-content";
import { SiteShell } from "../../site-shell";
import { getLiveOpportunities, getLiveOpportunity } from "@/lib/data";
import { jobPostingJsonLd } from "@/lib/opportunities";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getLiveOpportunities()).map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const job = await getLiveOpportunity((await params).slug);
  if (!job) return {};
  return {
    title: { absolute: `${job.title}${job.location ? ` | ${job.location}` : ""} | ROC Group` },
    description: job.summary || `Current opportunity with ROC Group: ${job.title}.`,
    alternates: { canonical: `/jobs/${job.slug}` },
  };
}

export default async function JobPage({ params }: { params: Promise<Params> }) {
  const job = await getLiveOpportunity((await params).slug);
  if (!job) notFound();
  const jsonLd = JSON.stringify(jobPostingJsonLd(job, SITE_URL)).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SiteShell kind="job" job={job} />
    </>
  );
}

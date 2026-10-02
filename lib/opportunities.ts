export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  location: string;
  employment_type: string;
  work_model: string;
  travel: string;
  clearance: string;
  compensation: string;
  summary: string;
  details: string;
  apply_url: string;
  status: "draft" | "published" | "closed";
  posted_on: string;
  closes_on: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPLOYMENT_TYPES = ["Direct hire", "Contract", "Contract-to-hire", "Part-time"];
export const WORK_MODELS = ["On-site", "Hybrid", "Remote"];

export type ContactInfo = { phone: string; phoneHref: string; email: string };

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.length === 10 ? "1" + digits : digits}`;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** "2026-10-02" -> "October 2, 2026" without timezone drift. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Where the Apply button goes: the listing's own link, or an email to ROC. */
export function applyHref(job: Opportunity, email: string) {
  if (job.apply_url) return job.apply_url;
  const subject = `Application: ${job.title}${job.location ? ` (${job.location})` : ""}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

const EMPLOYMENT_SCHEMA: Record<string, string> = {
  "Direct hire": "FULL_TIME",
  Contract: "CONTRACTOR",
  "Contract-to-hire": "CONTRACTOR",
  "Part-time": "PART_TIME",
};

/** Google JobPosting structured data, built only from what the listing actually says. */
export function jobPostingJsonLd(job: Opportunity, siteUrl: string) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.summary, job.details].filter(Boolean).join("\n\n"),
    datePosted: job.posted_on,
    url: `${siteUrl}/jobs/${job.slug}`,
    hiringOrganization: {
      "@type": "Organization",
      name: "Russo Operational Consulting Group",
      sameAs: siteUrl,
      logo: `${siteUrl}/roc-social.png`,
    },
  };
  if (job.closes_on) data.validThrough = `${job.closes_on}T23:59:59`;
  if (EMPLOYMENT_SCHEMA[job.employment_type]) data.employmentType = EMPLOYMENT_SCHEMA[job.employment_type];
  if (job.work_model === "Remote") {
    data.jobLocationType = "TELECOMMUTE";
    data.applicantLocationRequirements = { "@type": "Country", name: "USA" };
  }
  const [city, region] = job.location.split(",").map((s) => s.trim());
  if (city && region) {
    data.jobLocation = {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: city, addressRegion: region, addressCountry: "US" },
    };
  }
  return data;
}

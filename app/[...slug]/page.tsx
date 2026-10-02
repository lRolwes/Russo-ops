import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentPages, specialMeta } from "../site-content";
import { SiteShell, type ShellProps } from "../site-shell";

type Params = { slug: string[] };

// /jobs has its own route (app/jobs) because its listings come from the database.
const special: Record<string, { kind: "talent" | "contact"; meta: { title: string; description: string } }> = {
  "talent-network": { kind: "talent", meta: specialMeta["talent-network"] },
  contact: { kind: "contact", meta: specialMeta.contact },
};

function resolve(slug: string[]): { props: ShellProps; title: string; description: string } | null {
  const path = slug.join("/");
  const s = special[path];
  if (s) return { props: { kind: s.kind }, ...s.meta };
  const page = contentPages.find((p) => p.path === path);
  if (page) return { props: { kind: "content", page }, title: page.metaTitle, description: page.metaDescription };
  return null;
}

// Unknown paths fall through to notFound() below. (dynamicParams = false would also 404 every page
// here after a site-manager save refreshes the cache.)
export function generateStaticParams(): Params[] {
  return [...Object.keys(special), ...contentPages.map((p) => p.path)].map((p) => ({ slug: p.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) return {};
  return {
    title: { absolute: r.title },
    description: r.description,
    alternates: { canonical: `/${slug.join("/")}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) notFound();
  return <SiteShell {...r.props} />;
}

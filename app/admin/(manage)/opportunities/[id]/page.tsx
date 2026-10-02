import { notFound } from "next/navigation";
import { sessionClient } from "@/lib/supabase/server";
import type { Opportunity } from "@/lib/opportunities";
import { OpportunityForm } from "../opportunity-form";

export default async function EditOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await sessionClient();
  const { data } = await supabase.from("opportunities").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const job = data as Opportunity;
  return (
    <>
      <div className="adm-head">
        <div>
          <a href="/admin" className="adm-muted">
            ← Opportunities
          </a>
          <h1>{job.title}</h1>
        </div>
        {job.status === "published" && (
          <a className="adm-btn" href={`/jobs/${job.slug}`} target="_blank" rel="noopener">
            View on website ↗
          </a>
        )}
      </div>
      <OpportunityForm job={job} />
    </>
  );
}

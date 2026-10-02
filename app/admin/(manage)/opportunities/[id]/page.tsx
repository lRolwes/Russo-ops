import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { OPPORTUNITY_COLUMNS, query } from "@/lib/db";
import type { Opportunity } from "@/lib/opportunities";
import { OpportunityForm } from "../opportunity-form";

export default async function EditOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdmin();
  const uuid = /^[0-9a-f-]{36}$/i.test(id) ? id : "00000000-0000-0000-0000-000000000000";
  const [job] = await query<Opportunity>(`select ${OPPORTUNITY_COLUMNS} from opportunities where id = $1`, [uuid]);
  if (!job) notFound();
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

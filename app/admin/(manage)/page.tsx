import { sessionClient } from "@/lib/supabase/server";
import { formatDate, type Opportunity } from "@/lib/opportunities";

function siteStatus(job: Opportunity, today: string) {
  if (job.status === "draft") return { label: "Draft", note: "Not on the website", tone: "muted" };
  if (job.status === "closed") return { label: "Closed", note: "Not on the website", tone: "muted" };
  if (job.closes_on && job.closes_on < today) return { label: "Expired", note: "Closing date passed", tone: "warn" };
  return { label: "Live", note: "On the website", tone: "live" };
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await sessionClient();
  const { data } = await supabase
    .from("opportunities")
    .select("*")
    .order("posted_on", { ascending: false })
    .order("created_at", { ascending: false });
  const jobs = (data as Opportunity[]) ?? [];
  const today = new Date().toISOString().slice(0, 10);
  const live = jobs.filter((j) => siteStatus(j, today).tone === "live").length;

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Opportunities</h1>
          <p className="adm-muted">
            {live} live on the website · {jobs.length} total. Only “Live” listings appear on{" "}
            <a href="/jobs" target="_blank" rel="noopener">
              /jobs
            </a>
            .
          </p>
        </div>
        <a className="adm-btn primary" href="/admin/opportunities/new">
          + New opportunity
        </a>
      </div>

      {sp.saved && <p className="adm-ok">Saved.</p>}
      {sp.deleted && <p className="adm-ok">Deleted.</p>}

      {jobs.length === 0 ? (
        <div className="adm-card adm-empty">
          <p>No opportunities yet. While there are none, the website shows a friendly “no openings” message.</p>
          <a className="adm-btn primary" href="/admin/opportunities/new">
            Add the first one
          </a>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Location</th>
                <th>Posted</th>
                <th>Closes</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => {
                const s = siteStatus(j, today);
                return (
                  <tr key={j.id}>
                    <td>
                      <a href={`/admin/opportunities/${j.id}`} className="adm-strong">
                        {j.title}
                      </a>
                    </td>
                    <td>
                      <span className={`adm-pill ${s.tone}`}>{s.label}</span>
                      <small className="adm-muted"> {s.note}</small>
                    </td>
                    <td>{j.location || "—"}</td>
                    <td>{formatDate(j.posted_on)}</td>
                    <td>{j.closes_on ? formatDate(j.closes_on) : "—"}</td>
                    <td className="adm-right">
                      <a href={`/admin/opportunities/${j.id}`}>Edit</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

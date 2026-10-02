import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { inquiryLabel, type Submission } from "@/lib/inquiries";
import { mailConfigured } from "@/lib/mailer";

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  });

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ show?: string; deleted?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const showAll = sp.show === "all";
  const rows = await query<Submission>(
    `select id, kind, inquiry_type, name, email, phone, status, email_status, created_at::text as created_at
     from submissions ${showAll ? "" : "where status = 'new'"} order by created_at desc limit 500`,
  );

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Inquiries</h1>
          <p className="adm-muted">
            Messages from the Contact and Talent Network forms. {showAll ? "Showing all." : "Showing new ones."}{" "}
            <a href={showAll ? "/admin/inquiries" : "/admin/inquiries?show=all"}>
              {showAll ? "Show only new" : "Show all, including handled"}
            </a>
          </p>
        </div>
      </div>

      {!mailConfigured() && (
        <p className="adm-error">
          Email alerts are not switched on yet, so new inquiries only appear here. Your web team can turn them on.
        </p>
      )}
      {sp.deleted && <p className="adm-ok">Deleted.</p>}

      {rows.length === 0 ? (
        <div className="adm-card adm-empty">
          <p>{showAll ? "No inquiries yet." : "No new inquiries. You're all caught up."}</p>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>From</th>
                <th>About</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{when(r.created_at)}</td>
                  <td>
                    <a href={`/admin/inquiries/${r.id}`} className="adm-strong">
                      {r.name}
                    </a>
                    <br />
                    <small className="adm-muted">{r.email}</small>
                  </td>
                  <td>{inquiryLabel(r.inquiry_type)}</td>
                  <td>
                    <span className={`adm-pill ${r.status === "new" ? "live" : "muted"}`}>
                      {r.status === "new" ? "New" : "Handled"}
                    </span>
                  </td>
                  <td className="adm-right">
                    <a href={`/admin/inquiries/${r.id}`}>Open</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

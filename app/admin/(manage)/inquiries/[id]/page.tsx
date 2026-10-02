import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { inquiryLabel, type Submission } from "@/lib/inquiries";
import { deleteSubmission, setSubmissionStatus } from "../../../actions";
import { ConfirmDelete } from "./confirm-delete";

const EMAIL_NOTE: Record<string, string> = {
  sent: "An alert email was sent.",
  failed: "The alert email could not be sent.",
  "not configured": "Email alerts were not switched on when this arrived.",
};

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const uuid = /^[0-9a-f-]{36}$/i.test(id) ? id : "00000000-0000-0000-0000-000000000000";
  const [s] = await query<Submission>(
    `select id, kind, inquiry_type, name, email, phone, fields, page, status, email_status,
            created_at::text as created_at from submissions where id = $1`,
    [uuid],
  );
  if (!s) notFound();
  const received = new Date(s.created_at).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Chicago",
  });
  const subject = encodeURIComponent(`Re: ${inquiryLabel(s.inquiry_type)} — ROC`);

  return (
    <>
      <div className="adm-head">
        <div>
          <a href="/admin/inquiries" className="adm-muted">
            ← Inquiries
          </a>
          <h1>{s.name}</h1>
          <p className="adm-muted">
            {inquiryLabel(s.inquiry_type)} · {received} (Central)
          </p>
        </div>
        <div className="adm-actions">
          <a className="adm-btn primary" href={`mailto:${s.email}?subject=${subject}`}>
            Reply by email
          </a>
          <form action={setSubmissionStatus}>
            <input type="hidden" name="id" value={s.id} />
            <input type="hidden" name="status" value={s.status === "new" ? "handled" : "new"} />
            <button className="adm-btn">{s.status === "new" ? "Mark as handled" : "Mark as new"}</button>
          </form>
        </div>
      </div>

      <div className="adm-card">
        <dl className="adm-fields">
          {s.fields.map(([k, v], i) => (
            <div key={i}>
              <dt>{k}</dt>
              <dd>
                {k === "Email" ? (
                  <a href={`mailto:${v}`}>{v}</a>
                ) : k === "Phone" ? (
                  <a href={`tel:${v.replace(/[^\d+]/g, "")}`}>{v}</a>
                ) : k === "LinkedIn" && /^https?:\/\//.test(v) ? (
                  <a href={v} target="_blank" rel="noopener noreferrer">
                    {v}
                  </a>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="adm-muted adm-small">
          Sent from {s.page || "the website"}. {EMAIL_NOTE[s.email_status] ?? ""}
        </p>
      </div>

      <form action={deleteSubmission} className="adm-danger">
        <input type="hidden" name="id" value={s.id} />
        <p className="adm-muted">Delete this inquiry when ROC no longer needs to keep it.</p>
        <ConfirmDelete name={s.name} />
      </form>
    </>
  );
}

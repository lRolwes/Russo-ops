"use client";

import { useActionState } from "react";
import { deleteOpportunity, saveOpportunity, type FormState } from "../../actions";
import { keepFields } from "../../keep-fields";
import { EMPLOYMENT_TYPES, WORK_MODELS, type Opportunity } from "@/lib/opportunities";

export function OpportunityForm({ job }: { job?: Opportunity }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveOpportunity, {});
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <form onSubmit={keepFields(action)} className="adm-card adm-form adm-grid">
        {job && <input type="hidden" name="id" value={job.id} />}

        <label className="full">
          <span>Job title *</span>
          <input name="title" required defaultValue={job?.title} placeholder="Senior Project Manager" />
        </label>

        <label>
          <span>Status *</span>
          <select name="status" defaultValue={job?.status ?? "draft"}>
            <option value="draft">Draft — not on the website</option>
            <option value="published">Published — on the website</option>
            <option value="closed">Closed — filled or withdrawn</option>
          </select>
        </label>
        <label>
          <span>Location</span>
          <input name="location" defaultValue={job?.location} placeholder="St. Louis, MO" />
          <small>City, State helps Google Jobs show the listing.</small>
        </label>

        <label>
          <span>Employment type</span>
          <select name="employment_type" defaultValue={job?.employment_type ?? ""}>
            <option value="">—</option>
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Work model</span>
          <select name="work_model" defaultValue={job?.work_model ?? ""}>
            <option value="">—</option>
            {WORK_MODELS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Travel</span>
          <input name="travel" defaultValue={job?.travel} placeholder="Up to 25%" />
        </label>
        <label>
          <span>Clearance</span>
          <input name="clearance" defaultValue={job?.clearance} placeholder="Secret (leave blank if none)" />
        </label>

        <label>
          <span>Compensation</span>
          <input name="compensation" defaultValue={job?.compensation} placeholder="$120,000–$145,000 + bonus" />
        </label>
        <label>
          <span>Application link</span>
          <input name="apply_url" defaultValue={job?.apply_url} placeholder="Leave blank to apply by email" />
          <small>Blank = the Apply button opens an email to ROC with the job title filled in.</small>
        </label>

        <label className="full">
          <span>Short summary</span>
          <textarea
            name="summary"
            rows={2}
            maxLength={300}
            defaultValue={job?.summary}
            placeholder="One or two sentences shown in the list of openings."
          />
        </label>
        <label className="full">
          <span>Full description</span>
          <textarea
            name="details"
            rows={12}
            defaultValue={job?.details}
            placeholder={"Scope, responsibilities, requirements, and anything a candidate should know.\n\nLeave a blank line between paragraphs."}
          />
        </label>

        <label>
          <span>Posted date</span>
          <input name="posted_on" type="date" defaultValue={job?.posted_on ?? today} />
        </label>
        <label>
          <span>Closing date</span>
          <input name="closes_on" type="date" defaultValue={job?.closes_on ?? ""} />
          <small>Optional. The listing comes off the website automatically after this date.</small>
        </label>

        {state.error && (
          <p className="adm-error full" role="alert">
            {state.error}
          </p>
        )}
        <div className="full adm-actions">
          <button className="adm-btn primary" disabled={pending}>
            {pending ? "Saving…" : "Save"}
          </button>
          <a href="/admin" className="adm-btn">
            Cancel
          </a>
        </div>
      </form>

      {job && (
        <form
          action={deleteOpportunity}
          className="adm-danger"
          onSubmit={(e) => {
            if (!confirm(`Delete "${job.title}" permanently? To just take it off the website, set Status to Closed instead.`))
              e.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={job.id} />
          <p className="adm-muted">To take a listing down but keep a record, set Status to Closed.</p>
          <button className="adm-btn danger">Delete permanently</button>
        </form>
      )}
    </>
  );
}

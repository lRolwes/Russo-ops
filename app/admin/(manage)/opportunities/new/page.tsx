import { requireAdmin } from "@/lib/auth";
import { OpportunityForm } from "../opportunity-form";

export default async function NewOpportunityPage() {
  await requireAdmin();
  return (
    <>
      <div className="adm-head">
        <div>
          <a href="/admin" className="adm-muted">
            ← Opportunities
          </a>
          <h1>New opportunity</h1>
        </div>
      </div>
      <OpportunityForm />
    </>
  );
}

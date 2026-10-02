import { OpportunityForm } from "../opportunity-form";

export default function NewOpportunityPage() {
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

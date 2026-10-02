import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { mailConfigured } from "@/lib/mailer";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  await requireAdmin();
  const [data] = await query<{ phone: string; email: string; notify_email: string }>(
    "select phone, email, notify_email from site_settings where id = 1",
  );
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Contact details</h1>
          <p className="adm-muted">Shown in the website footer and on the Contact and Talent Network pages.</p>
        </div>
      </div>
      <SettingsForm
        phone={data?.phone ?? ""}
        email={data?.email ?? ""}
        notifyEmail={data?.notify_email ?? ""}
        mailOn={mailConfigured()}
      />
    </>
  );
}

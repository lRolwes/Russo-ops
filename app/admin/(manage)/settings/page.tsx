import { sessionClient } from "@/lib/supabase/server";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const supabase = await sessionClient();
  const { data } = await supabase.from("site_settings").select("phone,email").eq("id", 1).single();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Contact details</h1>
          <p className="adm-muted">
            Shown in the website footer and on the Contact and Talent Network pages. Both forms send their emails
            to this address.
          </p>
        </div>
      </div>
      <SettingsForm phone={data?.phone ?? ""} email={data?.email ?? ""} />
    </>
  );
}

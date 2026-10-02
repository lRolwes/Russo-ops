import { redirect } from "next/navigation";
import { sessionClient } from "@/lib/supabase/server";
import { signOut } from "../actions";
import { AdminNav } from "./admin-nav";

export const dynamic = "force-dynamic";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const supabase = await sessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();

  return (
    <>
      <header className="adm-top">
        <a href="/admin" className="adm-brand">
          <img src="/roc-mark-light.png" alt="" />
          <span>Site manager</span>
        </a>
        {admin && <AdminNav />}
        <div className="adm-top-right">
          <a href="/" target="_blank" rel="noopener">
            View website ↗
          </a>
          <form action={signOut}>
            <button className="adm-link">Sign out</button>
          </form>
        </div>
      </header>
      <main className="adm-main">
        {admin ? (
          children
        ) : (
          <div className="adm-card">
            <h1>No access yet</h1>
            <p className="adm-muted">
              You are signed in as {user.email}, but this account has not been given access to the site manager.
              Ask your web team to turn it on.
            </p>
          </div>
        )}
      </main>
    </>
  );
}

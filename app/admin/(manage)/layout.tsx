import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { signOut } from "../actions";
import { AdminNav } from "./admin-nav";

export const dynamic = "force-dynamic";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  const newInquiries = await query<{ n: number }>("select count(*)::int as n from submissions where status = 'new'")
    .then((r) => r[0]?.n ?? 0)
    .catch(() => 0);

  return (
    <>
      <header className="adm-top">
        <a href="/admin" className="adm-brand">
          <img src="/roc-mark-light.png" alt="" />
          <span>Site manager</span>
        </a>
        <AdminNav newInquiries={newInquiries} />
        <div className="adm-top-right">
          <a href="/" target="_blank" rel="noopener">
            View website ↗
          </a>
          <form action={signOut}>
            <button className="adm-link">Sign out</button>
          </form>
        </div>
      </header>
      <main className="adm-main">{children}</main>
    </>
  );
}

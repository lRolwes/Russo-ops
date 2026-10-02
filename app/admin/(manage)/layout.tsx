import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/auth";
import { signOut } from "../actions";
import { AdminNav } from "./admin-nav";

export const dynamic = "force-dynamic";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <>
      <header className="adm-top">
        <a href="/admin" className="adm-brand">
          <img src="/roc-mark-light.png" alt="" />
          <span>Site manager</span>
        </a>
        <AdminNav />
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

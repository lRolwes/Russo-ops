"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentAdmin, endSession, setPassword, signInWithPassword } from "@/lib/auth";
import { query } from "@/lib/db";
import { EMPLOYMENT_TYPES, WORK_MODELS, slugify } from "@/lib/opportunities";

export type FormState = { error?: string; ok?: string };

const text = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/** Saved changes appear on the public site immediately instead of waiting for the hourly refresh. */
function refreshSite() {
  revalidatePath("/", "layout");
}

export async function signIn(_: FormState, fd: FormData): Promise<FormState> {
  let ok = false;
  try {
    ok = await signInWithPassword(text(fd, "email"), String(fd.get("password") ?? ""));
  } catch (e) {
    console.error("signIn", e);
    return { error: "Sign-in is unavailable right now. Try again in a minute." };
  }
  if (!ok) {
    await new Promise((r) => setTimeout(r, 600)); // slow down password guessing
    return { error: "That email and password did not match. Try again." };
  }
  redirect("/admin");
}

export async function signOut() {
  await endSession();
  redirect("/admin/login");
}

export async function saveOpportunity(_: FormState, fd: FormData): Promise<FormState> {
  if (!(await currentAdmin())) return { error: "Your session has ended. Sign in again." };

  const id = text(fd, "id");
  const status = text(fd, "status");
  const row = {
    title: text(fd, "title"),
    location: text(fd, "location"),
    employment_type: text(fd, "employment_type"),
    work_model: text(fd, "work_model"),
    travel: text(fd, "travel"),
    clearance: text(fd, "clearance"),
    compensation: text(fd, "compensation"),
    summary: text(fd, "summary"),
    details: String(fd.get("details") ?? "").trim(),
    apply_url: text(fd, "apply_url"),
    status,
    posted_on: text(fd, "posted_on") || new Date().toISOString().slice(0, 10),
    closes_on: text(fd, "closes_on") || null,
  };

  if (!row.title) return { error: "Give the opportunity a title." };
  if (!["draft", "published", "closed"].includes(status)) return { error: "Choose a status." };
  if (row.employment_type && !EMPLOYMENT_TYPES.includes(row.employment_type)) return { error: "Choose an employment type." };
  if (row.work_model && !WORK_MODELS.includes(row.work_model)) return { error: "Choose a work model." };
  if (row.apply_url && !/^(https?:\/\/|mailto:)/i.test(row.apply_url))
    return { error: "The application link must start with https:// (or leave it blank to use email)." };
  if (row.closes_on && row.closes_on < row.posted_on) return { error: "The closing date is before the posted date." };

  const cols = Object.keys(row);
  const vals = Object.values(row);
  try {
    if (id) {
      const set = cols.map((c, i) => `${c} = $${i + 1}`).join(", ");
      await query(`update opportunities set ${set}, updated_at = now() where id = $${cols.length + 1}`, [...vals, id]);
    } else {
      const slug = `${slugify(row.title) || "opportunity"}-${Math.random().toString(36).slice(2, 6)}`;
      const ph = [...cols, "slug"].map((_, i) => `$${i + 1}`).join(", ");
      await query(`insert into opportunities (${[...cols, "slug"].join(", ")}) values (${ph})`, [...vals, slug]);
    }
  } catch (e) {
    console.error("saveOpportunity", e);
    return { error: "Could not save. Check the dates and try again." };
  }
  refreshSite();
  redirect("/admin?saved=1");
}

export async function deleteOpportunity(fd: FormData) {
  if (!(await currentAdmin())) redirect("/admin/login");
  await query("delete from opportunities where id = $1", [text(fd, "id")]);
  refreshSite();
  redirect("/admin?deleted=1");
}

export async function setSubmissionStatus(fd: FormData) {
  if (!(await currentAdmin())) redirect("/admin/login");
  const status = text(fd, "status") === "handled" ? "handled" : "new";
  await query("update submissions set status = $1 where id = $2", [status, text(fd, "id")]);
  revalidatePath("/admin", "layout"); // refresh the "new inquiries" count in the menu
  redirect(status === "handled" ? "/admin/inquiries" : `/admin/inquiries/${text(fd, "id")}`);
}

export async function deleteSubmission(fd: FormData) {
  if (!(await currentAdmin())) redirect("/admin/login");
  await query("delete from submissions where id = $1", [text(fd, "id")]);
  revalidatePath("/admin", "layout");
  redirect("/admin/inquiries?deleted=1");
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function saveSettings(_: FormState, fd: FormData): Promise<FormState> {
  if (!(await currentAdmin())) return { error: "Your session has ended. Sign in again." };
  const phone = text(fd, "phone");
  const email = text(fd, "email");
  const notify = text(fd, "notify_email");
  if (phone.replace(/\D/g, "").length < 10) return { error: "Enter a full phone number, including area code." };
  if (!isEmail(email)) return { error: "Enter a valid email address." };
  if (notify && !isEmail(notify)) return { error: "Enter a valid address for form alerts, or leave it blank." };
  await query(
    "update site_settings set phone = $1, email = $2, notify_email = $3, updated_at = now() where id = 1",
    [phone, email, notify],
  );
  refreshSite();
  return { ok: "Saved. The website now shows these contact details." };
}

export async function changePassword(_: FormState, fd: FormData): Promise<FormState> {
  const admin = await currentAdmin();
  if (!admin) return { error: "Your session has ended. Sign in again." };
  const password = String(fd.get("password") ?? "");
  if (password.length < 8) return { error: "Use at least 8 characters." };
  if (password !== String(fd.get("confirm") ?? "")) return { error: "The two passwords do not match." };
  await setPassword(admin.id, password);
  return { ok: "Password changed. Use the new one next time you sign in." };
}

"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { sessionClient } from "@/lib/supabase/server";
import { SITE_DATA_TAG } from "@/lib/supabase/public";
import { EMPLOYMENT_TYPES, WORK_MODELS, slugify } from "@/lib/opportunities";

export type FormState = { error?: string; ok?: string };

const text = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/** Signed-in client for a confirmed admin, or an error message. */
async function adminClient() {
  const supabase = await sessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Your session has ended. Sign in again." } as const;
  const { data } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!data) return { error: "This account does not have access to the site manager." } as const;
  return { supabase } as const;
}

/** Saved changes appear on the public site immediately instead of waiting for the hourly refresh. */
function refreshSite() {
  updateTag(SITE_DATA_TAG);
  revalidatePath("/", "layout");
}

export async function signIn(_: FormState, fd: FormData): Promise<FormState> {
  const supabase = await sessionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: text(fd, "email"),
    password: String(fd.get("password") ?? ""),
  });
  if (error) return { error: "That email and password did not match. Try again." };
  redirect("/admin");
}

export async function signOut() {
  const supabase = await sessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveOpportunity(_: FormState, fd: FormData): Promise<FormState> {
  const c = await adminClient();
  if ("error" in c) return { error: c.error };

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

  if (id) {
    const { error } = await c.supabase.from("opportunities").update(row).eq("id", id);
    if (error) return { error: "Could not save: " + error.message };
  } else {
    const slug = `${slugify(row.title) || "opportunity"}-${Math.random().toString(36).slice(2, 6)}`;
    const { error } = await c.supabase.from("opportunities").insert({ ...row, slug });
    if (error) return { error: "Could not save: " + error.message };
  }
  refreshSite();
  redirect("/admin?saved=1");
}

export async function deleteOpportunity(fd: FormData) {
  const c = await adminClient();
  if ("error" in c) redirect("/admin/login");
  await c.supabase.from("opportunities").delete().eq("id", text(fd, "id"));
  refreshSite();
  redirect("/admin?deleted=1");
}

export async function saveSettings(_: FormState, fd: FormData): Promise<FormState> {
  const c = await adminClient();
  if ("error" in c) return { error: c.error };
  const phone = text(fd, "phone");
  const email = text(fd, "email");
  if (phone.replace(/\D/g, "").length < 10) return { error: "Enter a full phone number, including area code." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  const { error } = await c.supabase.from("site_settings").update({ phone, email }).eq("id", 1);
  if (error) return { error: "Could not save: " + error.message };
  refreshSite();
  return { ok: "Saved. The website now shows these contact details." };
}

export async function changePassword(_: FormState, fd: FormData): Promise<FormState> {
  const c = await adminClient();
  if ("error" in c) return { error: c.error };
  const password = String(fd.get("password") ?? "");
  if (password.length < 8) return { error: "Use at least 8 characters." };
  if (password !== String(fd.get("confirm") ?? "")) return { error: "The two passwords do not match." };
  const { error } = await c.supabase.auth.updateUser({ password });
  if (error) return { error: "Could not change the password: " + error.message };
  return { ok: "Password changed. Use the new one next time you sign in." };
}

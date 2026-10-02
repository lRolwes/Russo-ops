"use server";

import { headers } from "next/headers";
import { SITE_URL } from "./site-content";
import { hasDatabase, query } from "@/lib/db";
import { getContactInfo } from "@/lib/data";
import { inquiryLabel, type FieldPair } from "@/lib/inquiries";
import { sendMail } from "@/lib/mailer";

export type InquiryState = { ok?: boolean; error?: string };

// Form fields that are plumbing, not answers.
const INTERNAL = new Set(["_mode", "_page", "_t", "_hp"]);

const REQUIRED: Record<"contact" | "talent", string[]> = {
  contact: ["Name", "Email", "Inquiry type", "Operating need", "Consent"],
  talent: ["Name", "Email", "Current location", "Target roles", "Career summary", "Consent"],
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function submitInquiry(_: InquiryState, fd: FormData): Promise<InquiryState> {
  const mode = fd.get("_mode") === "talent" ? "talent" : "contact";

  // Spam traps: a hidden field people never see, and a form filled in faster than a person could.
  // Bots get a quiet "success" so they don't retry.
  const startedAt = Number(fd.get("_t") ?? 0);
  if (String(fd.get("_hp") ?? "") !== "" || (startedAt && Date.now() - startedAt < 2500)) return { ok: true };

  const value = (k: string) => String(fd.get(k) ?? "").trim().slice(0, 5000);
  for (const k of REQUIRED[mode]) if (!value(k)) return { error: "Please fill in every field marked *." };
  const email = value("Email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };

  const inquiryType = mode === "talent" ? "candidate" : value("Inquiry type");
  const fields: FieldPair[] = [];
  for (const [k, v] of fd.entries()) {
    if (INTERNAL.has(k) || typeof v !== "string") continue;
    if (k === "Consent") continue;
    const label = k === "Inquiry type" ? "Inquiry type" : k;
    const val = k === "Inquiry type" ? inquiryLabel(v) : v.trim().slice(0, 5000);
    if (val) fields.push([label, val]);
  }
  fields.push(["Consent", "Yes"]);

  if (!hasDatabase) return { error: "The form is unavailable right now. Please email or call ROC directly." };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim();

  try {
    if (ip) {
      const [{ n }] = await query<{ n: number }>(
        "select count(*)::int as n from submissions where ip = $1 and created_at > now() - interval '10 minutes'",
        [ip],
      );
      if (n >= 5) return { error: "Too many messages from this connection. Please try again in a few minutes." };
    }

    const [row] = await query<{ id: string }>(
      `insert into submissions (kind, inquiry_type, name, email, phone, fields, page, ip)
       values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`,
      [mode, inquiryType, value("Name"), email, value("Phone"), JSON.stringify(fields), value("_page").slice(0, 300), ip],
    );

    const [settings] = await query<{ notify_email: string }>("select notify_email from site_settings where id = 1");
    const to = settings?.notify_email || (await getContactInfo()).email;
    const subject = `ROC Website: ${inquiryLabel(inquiryType)} — ${value("Name")}`;
    const link = `${SITE_URL}/admin/inquiries/${row.id}`;
    const text = [...fields.map(([k, v]) => `${k}: ${v}`), "", `View in the site manager: ${link}`].join("\n");
    const html =
      `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
      fields
        .map(
          ([k, v]) =>
            `<tr><td style="color:#687772;vertical-align:top;white-space:nowrap"><b>${esc(k)}</b></td>` +
            `<td style="white-space:pre-wrap">${esc(v)}</td></tr>`,
        )
        .join("") +
      `</table><p style="font-family:Arial,sans-serif;font-size:14px"><a href="${link}">View in the site manager</a>` +
      ` · Reply to this email to answer ${esc(value("Name"))} directly.</p>`;

    const emailStatus = await sendMail({ to, subject, text, html, replyTo: email });
    await query("update submissions set email_status = $1 where id = $2", [emailStatus, row.id]);
  } catch (e) {
    console.error("submitInquiry", e);
    return { error: "Something went wrong sending your message. Please try again, or email ROC directly." };
  }
  return { ok: true };
}

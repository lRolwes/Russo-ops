// Sends email through Resend (https://resend.com). Needs RESEND_API_KEY in the Vercel environment;
// RESEND_FROM must be an address on a domain verified in Resend, e.g. "ROC Website <website@russo-ops.com>".

export const mailConfigured = () => Boolean(process.env.RESEND_API_KEY);

export async function sendMail(msg: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<"sent" | "not configured" | "failed"> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "not configured";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "ROC Website <website@russo-ops.com>",
        to: [msg.to],
        subject: msg.subject,
        text: msg.text,
        html: msg.html,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("sendMail", res.status, await res.text());
      return "failed";
    }
    return "sent";
  } catch (e) {
    console.error("sendMail", e);
    return "failed";
  }
}

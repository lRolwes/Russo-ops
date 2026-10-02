import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "./db";
import { SESSION_COOKIE } from "./session-cookie";

const SESSION_DAYS = 7;

export type Admin = { id: string; email: string };

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

/** Checks email + password (bcrypt, inside Postgres) and starts a session. */
export async function signInWithPassword(email: string, password: string): Promise<boolean> {
  const [admin] = await query<{ id: string }>(
    "select id from admins where lower(email) = lower($1) and password_hash = crypt($2, password_hash)",
    [email.trim(), password],
  );
  if (!admin) return false;

  const token = randomBytes(32).toString("base64url");
  await query("delete from admin_sessions where expires_at < now()");
  await query(
    `insert into admin_sessions (token_hash, admin_id, expires_at) values ($1, $2, now() + interval '${SESSION_DAYS} days')`,
    [hashToken(token), admin.id],
  );
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return true;
}

/** The signed-in admin, or null. */
export async function currentAdmin(): Promise<Admin | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const [admin] = await query<Admin>(
    `select a.id, a.email from admin_sessions s join admins a on a.id = s.admin_id
     where s.token_hash = $1 and s.expires_at > now()`,
    [hashToken(token)],
  );
  return admin ?? null;
}

/** For admin pages: the signed-in admin, or a redirect to the login page. Checked per page, not
 *  only in the layout, because layouts are not re-run on every navigation. */
export async function requireAdmin(): Promise<Admin> {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function endSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await query("delete from admin_sessions where token_hash = $1", [hashToken(token)]);
  store.delete(SESSION_COOKIE);
}

export async function setPassword(adminId: string, password: string) {
  await query("update admins set password_hash = crypt($1, gen_salt('bf', 10)) where id = $2", [password, adminId]);
}

import { Pool } from "pg";

// Neon's Vercel integration sets DATABASE_URL (POSTGRES_URL on older setups).
const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

const globalForDb = globalThis as unknown as { rocPool?: Pool };

function pool() {
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  if (!globalForDb.rocPool) {
    const p = new Pool({ connectionString, max: Number(process.env.DB_POOL_MAX ?? 3), idleTimeoutMillis: 10_000 });
    // Neon closes idle connections when it scales to zero; without this listener a dropped idle
    // connection would crash the server process.
    p.on("error", (err) => console.error("db pool", err.message));
    globalForDb.rocPool = p;
  }
  return globalForDb.rocPool;
}

export const hasDatabase = Boolean(connectionString);

const isDroppedConnection = (e: unknown) =>
  e instanceof Error && /Connection terminated|ECONNRESET|ECONNREFUSED|EPIPE/i.test(e.message);

export async function query<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  // Connections that went stale while the database was asleep fail once each; the pool discards
  // them, so retry until a fresh one is used (pool size + 1 attempts at most).
  for (let attempt = 0; ; attempt++) {
    try {
      return (await pool().query(text, params)).rows as T[];
    } catch (e) {
      if (!isDroppedConnection(e) || attempt >= 3) throw e;
    }
  }
}

/** Columns selected for an opportunity, with dates as plain YYYY-MM-DD strings. */
export const OPPORTUNITY_COLUMNS = `id, slug, title, location, employment_type, work_model, travel, clearance,
  compensation, summary, details, apply_url, status, posted_on::text as posted_on,
  closes_on::text as closes_on, created_at::text as created_at, updated_at::text as updated_at`;

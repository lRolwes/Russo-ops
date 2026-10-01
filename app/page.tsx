import type { Metadata } from "next";
import { SiteShell } from "./site-shell";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return <SiteShell kind="home" />;
}

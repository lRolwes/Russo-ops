import type { Metadata } from "next";
import { SiteShell } from "./site-shell";

export const metadata: Metadata = { title: "Page not found | ROC Group", robots: { index: false } };

export default function NotFound() {
  return <SiteShell kind="notfound" />;
}

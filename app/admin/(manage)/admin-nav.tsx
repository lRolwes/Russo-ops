"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Opportunities", match: (p: string) => p === "/admin" || p.startsWith("/admin/opportunities") },
  { href: "/admin/inquiries", label: "Inquiries", match: (p: string) => p.startsWith("/admin/inquiries") },
  { href: "/admin/settings", label: "Contact details", match: (p: string) => p === "/admin/settings" },
  { href: "/admin/account", label: "Password", match: (p: string) => p === "/admin/account" },
];

export function AdminNav({ newInquiries = 0 }: { newInquiries?: number }) {
  const path = usePathname();
  return (
    <nav className="adm-nav">
      {links.map((l) => (
        <a key={l.href} href={l.href} className={l.match(path) ? "active" : undefined}>
          {l.label}
          {l.href === "/admin/inquiries" && newInquiries > 0 && <span className="adm-badge">{newInquiries}</span>}
        </a>
      ))}
    </nav>
  );
}

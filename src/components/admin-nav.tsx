"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const adminNavItems = [
  ["Overview", "/admin"],
  ["CRM", "/admin/crm"],
  ["Pipeline", "/admin/pipeline"],
  ["Inquiries", "/admin/inquiries"],
  ["Clients", "/admin/clients"],
  ["Proposals", "/admin/proposals"],
  ["Contracts", "/admin/contracts"],
  ["Services", "/admin/services"],
  ["Analytics", "/admin/analytics"],
  ["SEO", "/admin/seo"],
  ["Records", "/admin/records"],
  ["Settings", "/admin/settings"],
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation">
      {adminNavItems.map(([label, href], index) => {
        const active = pathname === href;
        return (
          <Link href={href} key={href} aria-current={active ? "page" : undefined} className={active ? "is-active" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>{label}
          </Link>
        );
      })}
    </nav>
  );
}

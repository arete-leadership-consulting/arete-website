import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../actions";

const navItems = [
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
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, is_active")
    .eq("id", data.user.id)
    .single();

  if (!profile?.is_active) redirect("/admin/login?error=unauthorized");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-wordmark">ARETÉ <span>OS</span></Link>
        <nav aria-label="Admin navigation">
          {navItems.map(([label, href], index) => (
            <Link href={href} key={href}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}
            </Link>
          ))}
        </nav>
        <div className="admin-user">
          <p>{profile.full_name || data.user.email}</p>
          <span>{profile.role.replaceAll("_", " ")}</span>
          <form action={signOut}><button type="submit">Sign out</button></form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

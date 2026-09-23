import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../actions";
import { AdminNav } from "@/components/admin-nav";
import { AreteLogo } from "@/components/arete-logo";

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
        <Link href="/admin" className="admin-logo-link" aria-label="ARETÉ Business OS overview"><AreteLogo className="admin-logo" /></Link>
        <AdminNav />
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

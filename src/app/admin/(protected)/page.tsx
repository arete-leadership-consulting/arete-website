import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Business OS",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [inquiries, opportunities, won] = await Promise.all([
    supabase.from("inquiries").select("id", { count: "exact", head: true }),
    supabase.from("opportunities").select("estimated_value", { count: "exact" }),
    supabase.from("opportunities").select("estimated_value").eq("stage", "closed_won"),
  ]);

  const pipelineValue =
    opportunities.data?.reduce((sum, item) => sum + Number(item.estimated_value || 0), 0) ?? 0;
  const closedRevenue =
    won.data?.reduce((sum, item) => sum + Number(item.estimated_value || 0), 0) ?? 0;

  return (
    <>
      <header className="admin-page-head">
        <div><p>ARETE BUSINESS OS</p><h1>Executive overview</h1></div>
        <span>LIVE OPERATIONS</span>
      </header>
      <section className="admin-metrics" aria-label="Executive metrics">
        <article><span>01</span><p>Inquiries</p><strong>{inquiries.count ?? 0}</strong></article>
        <article><span>02</span><p>Active opportunities</p><strong>{opportunities.count ?? 0}</strong></article>
        <article><span>03</span><p>Pipeline value</p><strong>₱{pipelineValue.toLocaleString()}</strong></article>
        <article><span>04</span><p>Closed revenue</p><strong>₱{closedRevenue.toLocaleString()}</strong></article>
      </section>
      <section className="admin-empty-state">
        <p className="admin-kicker">THE OPERATING VIEW</p>
        <h2>Clarity before activity.</h2>
        <p>New inquiries, opportunities, follow-ups, proposals, and revenue will gather here as the system comes online.</p>
      </section>
    </>
  );
}

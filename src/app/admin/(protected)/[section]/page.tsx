import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminSection, type AdminMetric, type AdminRow } from "@/components/admin-section";
import { createClient } from "@/lib/supabase/server";

type SectionKey = "crm" | "pipeline" | "inquiries" | "clients" | "proposals" | "contracts" | "services" | "analytics" | "seo" | "records" | "settings";

const sections = new Set<SectionKey>(["crm", "pipeline", "inquiries", "clients", "proposals", "contracts", "services", "analytics", "seo", "records", "settings"]);

const labels: Record<SectionKey, string> = {
  crm: "CRM",
  pipeline: "Pipeline",
  inquiries: "Inquiries",
  clients: "Clients",
  proposals: "Proposals",
  contracts: "Contracts",
  services: "Services",
  analytics: "Analytics",
  seo: "SEO",
  records: "Records",
  settings: "Settings",
};

const money = (value: number | string | null | undefined) => `₱${Number(value || 0).toLocaleString("en-PH")}`;
const date = (value: string | null | undefined) => value ? new Intl.DateTimeFormat("en-PH", { dateStyle: "medium" }).format(new Date(value)) : "—";
const labelize = (value: string | null | undefined) => value ? value.replaceAll("_", " ") : "—";

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  return { title: `${labels[section as SectionKey] ?? "Business OS"} | ARETE`, robots: { index: false, follow: false } };
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: rawSection } = await params;
  if (!sections.has(rawSection as SectionKey)) notFound();
  const section = rawSection as SectionKey;
  const supabase = await createClient();

  if (section === "crm") {
    const [{ data: organizations }, { data: contacts }, { data: activities }] = await Promise.all([
      supabase.from("organizations").select("id,name,industry,website,created_at").order("created_at", { ascending: false }),
      supabase.from("contacts").select("id,full_name,email,title,created_at").order("created_at", { ascending: false }),
      supabase.from("activities").select("id,follow_up_at,completed_at"),
    ]);
    const due = activities?.filter((item) => item.follow_up_at && !item.completed_at).length ?? 0;
    return <AdminSection eyebrow="RELATIONSHIP INTELLIGENCE" title="CRM" intro="A unified view of the people and organizations connected to ARETE." metrics={[{ label: "Organizations", value: organizations?.length ?? 0 }, { label: "Contacts", value: contacts?.length ?? 0 }, { label: "Open follow-ups", value: due }]} columns={["Contact", "Role", "Email", "Added"]} rows={(contacts ?? []).map((item) => ({ id: String(item.id), cells: [item.full_name, item.title || "—", item.email || "—", date(item.created_at)] }))} emptyTitle="No relationships recorded yet." emptyCopy="Contacts created from qualified inquiries and client work will appear here." />;
  }

  if (section === "pipeline" || section === "proposals" || section === "contracts") {
    const query = supabase.from("opportunities").select("id,title,stage,service_interest,estimated_value,probability,expected_close_date,created_at").order("created_at", { ascending: false });
    if (section === "proposals") query.in("stage", ["proposal", "negotiation"]);
    if (section === "contracts") query.eq("stage", "closed_won");
    const { data: opportunities } = await query;
    const total = opportunities?.reduce((sum, item) => sum + Number(item.estimated_value || 0), 0) ?? 0;
    const weighted = opportunities?.reduce((sum, item) => sum + Number(item.estimated_value || 0) * Number(item.probability || 0) / 100, 0) ?? 0;
    const content = {
      pipeline: { eyebrow: "REVENUE PIPELINE", title: "Pipeline", intro: "Track every opportunity from first contact through decision and delivery.", empty: "No opportunities in the pipeline yet." },
      proposals: { eyebrow: "COMMERCIAL PROGRESS", title: "Proposals", intro: "Monitor active proposals, decision stages, expected value, and next commercial steps.", empty: "No active proposals yet." },
      contracts: { eyebrow: "CLIENT COMMITMENTS", title: "Contracts", intro: "A working view of won engagements and the value committed to delivery.", empty: "No won engagements yet." },
    }[section];
    return <AdminSection eyebrow={content.eyebrow} title={content.title} intro={content.intro} metrics={[{ label: "Records", value: opportunities?.length ?? 0 }, { label: "Total value", value: money(total) }, { label: section === "contracts" ? "Committed value" : "Weighted value", value: money(section === "contracts" ? total : weighted) }]} columns={["Opportunity", "Stage", "Service", "Value", "Close"]} rows={(opportunities ?? []).map((item) => ({ id: String(item.id), cells: [item.title, <span className="admin-status" key="stage">{labelize(item.stage)}</span>, item.service_interest || "—", money(item.estimated_value), date(item.expected_close_date)] }))} emptyTitle={content.empty} emptyCopy="Records will appear here as opportunities move through the ARETE operating process." />;
  }

  if (section === "inquiries") {
    const { data: inquiries } = await supabase.from("inquiries").select("id,name,email,organization_name,requested_service,status,submitted_at").order("submitted_at", { ascending: false });
    const newCount = inquiries?.filter((item) => item.status === "new").length ?? 0;
    const qualified = inquiries?.filter((item) => item.status === "qualified" || item.status === "converted").length ?? 0;
    return <AdminSection eyebrow="INBOUND DEMAND" title="Inquiries" intro="Review website inquiries, qualification status, requested services, and response priority." metrics={[{ label: "Total inquiries", value: inquiries?.length ?? 0 }, { label: "New", value: newCount }, { label: "Qualified / converted", value: qualified }]} columns={["Name", "Organization", "Service", "Status", "Submitted"]} rows={(inquiries ?? []).map((item) => ({ id: String(item.id), cells: [<span key="name"><strong>{item.name}</strong><small>{item.email}</small></span>, item.organization_name || "—", item.requested_service || "—", <span className="admin-status" key="status">{labelize(item.status)}</span>, date(item.submitted_at)] }))} emptyTitle="No inquiries yet." emptyCopy="New submissions from the Work With ARETE form will arrive here." />;
  }

  if (section === "clients") {
    const [{ data: organizations }, { data: contacts }] = await Promise.all([
      supabase.from("organizations").select("id,name,industry,website,created_at").order("created_at", { ascending: false }),
      supabase.from("contacts").select("id,organization_id"),
    ]);
    return <AdminSection eyebrow="CLIENT PORTFOLIO" title="Clients" intro="Keep the client portfolio, account context, and relationship coverage visible." metrics={[{ label: "Organizations", value: organizations?.length ?? 0 }, { label: "Client contacts", value: contacts?.length ?? 0 }]} columns={["Organization", "Industry", "Website", "Contacts", "Added"]} rows={(organizations ?? []).map((item) => ({ id: String(item.id), cells: [item.name, item.industry || "—", item.website || "—", contacts?.filter((contact) => contact.organization_id === item.id).length ?? 0, date(item.created_at)] }))} emptyTitle="No client organizations yet." emptyCopy="Qualified organizations and active clients will be managed from this portfolio." />;
  }

  if (section === "services") {
    const services = [
      ["Leadership & organizational development", "Consulting, diagnostics, capability building, and transformation support."],
      ["Customer experience & service culture", "Service strategy, internal culture, recovery systems, and frontline enablement."],
      ["Strategy sessions & workshops", "Focused working sessions that turn important questions into clear action."],
      ["Speaking & executive facilitation", "Keynotes, leadership conversations, and facilitated executive alignment."],
    ];
    return <AdminSection eyebrow="OFFER ARCHITECTURE" title="Services" intro="The operating catalogue behind proposals, engagements, and client conversations." metrics={[{ label: "Core service families", value: services.length }, { label: "Delivery model", value: "Bespoke" }]} columns={["Service family", "Positioning", "Status"]} rows={services.map(([name, description], index) => ({ id: String(index), cells: [name, description, <span className="admin-status" key="active">active</span>] }))} />;
  }

  if (section === "analytics") {
    const [{ data: inquiries }, { data: opportunities }] = await Promise.all([
      supabase.from("inquiries").select("id,status,submitted_at"),
      supabase.from("opportunities").select("id,stage,estimated_value,created_at"),
    ]);
    const won = opportunities?.filter((item) => item.stage === "closed_won") ?? [];
    const pipeline = opportunities?.filter((item) => !["closed_won", "closed_lost"].includes(item.stage)) ?? [];
    const conversion = inquiries?.length ? Math.round((won.length / inquiries.length) * 100) : 0;
    const stageRows = ["new_inquiry", "contacted", "discovery", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"].map((stage) => ({ id: stage, cells: [labelize(stage), opportunities?.filter((item) => item.stage === stage).length ?? 0, money(opportunities?.filter((item) => item.stage === stage).reduce((sum, item) => sum + Number(item.estimated_value || 0), 0))] }));
    return <AdminSection eyebrow="PERFORMANCE SIGNALS" title="Analytics" intro="A concise commercial view of demand, conversion, pipeline health, and realized value." metrics={[{ label: "Inquiry-to-win", value: `${conversion}%` }, { label: "Open pipeline", value: pipeline.length }, { label: "Pipeline value", value: money(pipeline.reduce((sum, item) => sum + Number(item.estimated_value || 0), 0)) }, { label: "Won value", value: money(won.reduce((sum, item) => sum + Number(item.estimated_value || 0), 0)) }]} columns={["Stage", "Opportunities", "Value"]} rows={stageRows} />;
  }

  if (section === "seo") {
    const pages = [["Home", "/", "Brand and consultancy overview"], ["About", "/about", "Founder, philosophy, and method"], ["Consulting", "/consulting", "Consulting offers and engagement paths"], ["Speaking", "/speaking", "Keynotes and speaking engagements"], ["Insights", "/insights", "Thought leadership library"], ["Work with ARETE", "/work-with-arete", "Primary conversion page"]];
    return <AdminSection eyebrow="DISCOVERABILITY" title="SEO" status="INDEX HEALTH" intro="A practical index of the public pages that shape ARETE’s search presence." metrics={[{ label: "Indexed page groups", value: pages.length }, { label: "Insights", value: 3 }, { label: "Structured data", value: "Active" }]} columns={["Page", "Path", "Search role", "Status"]} rows={pages.map(([name, path, role]) => ({ id: path, cells: [name, <code key="path">{path}</code>, role, <span className="admin-status" key="status">indexable</span>] }))} />;
  }

  if (section === "records") {
    const { data: records } = await supabase.from("audit_log").select("id,action,entity_type,entity_id,created_at").order("created_at", { ascending: false }).limit(100);
    return <AdminSection eyebrow="GOVERNANCE TRAIL" title="Records" intro="A protected chronological record of important activity across ARETE Business OS." metrics={[{ label: "Recent records", value: records?.length ?? 0 }, { label: "Retention view", value: "Latest 100" }]} columns={["Action", "Entity", "Reference", "Recorded"]} rows={(records ?? []).map((item) => ({ id: String(item.id), cells: [labelize(item.action), labelize(item.entity_type), item.entity_id || "—", date(item.created_at)] }))} emptyTitle="No audit records yet." emptyCopy="Important administrative activity will be recorded here as the system is used." />;
  }

  const [{ data: userData }, { data: profile }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("profiles").select("full_name,role,is_active,created_at,updated_at").single(),
  ]);
  const settingsRows: AdminRow[] = [
    { id: "name", cells: ["Account name", profile?.full_name || "—", "Profile"] },
    { id: "email", cells: ["Email", userData.user?.email || "—", "Authentication"] },
    { id: "role", cells: ["Access role", labelize(profile?.role), profile?.is_active ? "Active" : "Inactive"] },
    { id: "updated", cells: ["Profile updated", date(profile?.updated_at), "System"] },
  ];
  const settingsMetrics: AdminMetric[] = [{ label: "Account status", value: profile?.is_active ? "Active" : "Inactive" }, { label: "Role", value: labelize(profile?.role) }, { label: "Environment", value: "Production" }];
  return <AdminSection eyebrow="SYSTEM CONTROL" title="Settings" status="SECURE CONFIGURATION" intro="Account identity, access status, and the production environment supporting ARETE Business OS." metrics={settingsMetrics} columns={["Setting", "Value", "Source"]} rows={settingsRows} />;
}

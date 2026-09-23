import type { ReactNode } from "react";

export type AdminMetric = { label: string; value: ReactNode };
export type AdminRow = { id: string; cells: ReactNode[] };

export function AdminSection({
  eyebrow,
  title,
  status = "LIVE OPERATIONS",
  intro,
  metrics = [],
  columns = [],
  rows = [],
  emptyTitle = "Nothing here yet.",
  emptyCopy = "This section is connected and ready for the first record.",
  children,
}: {
  eyebrow: string;
  title: string;
  status?: string;
  intro: string;
  metrics?: AdminMetric[];
  columns?: string[];
  rows?: AdminRow[];
  emptyTitle?: string;
  emptyCopy?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <header className="admin-page-head">
        <div><p>{eyebrow}</p><h1>{title}</h1></div>
        <span>{status}</span>
      </header>
      <p className="admin-page-intro">{intro}</p>
      {metrics.length ? (
        <section className="admin-section-metrics" aria-label={`${title} summary`}>
          {metrics.map((metric, index) => (
            <article key={metric.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </section>
      ) : null}
      {children}
      {columns.length ? (
        <section className="admin-table-wrap" aria-label={`${title} records`}>
          <div className="admin-table-head"><p>OPERATING RECORDS</p><span>{rows.length} TOTAL</span></div>
          {rows.length ? (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
                <tbody>{rows.map((row) => <tr key={row.id}>{row.cells.map((cell, index) => <td key={`${row.id}-${index}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          ) : (
            <div className="admin-inline-empty"><h2>{emptyTitle}</h2><p>{emptyCopy}</p></div>
          )}
        </section>
      ) : null}
    </>
  );
}

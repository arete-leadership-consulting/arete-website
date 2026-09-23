import type { Metadata } from "next";
import Link from "next/link";
import { RecoveryForm } from "./recovery-form";

export const metadata: Metadata = {
  title: "Choose a New Password",
  robots: { index: false, follow: false },
};

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message = error === "length"
    ? "Use at least 12 characters."
    : error === "match"
      ? "The passwords do not match."
      : error === "update"
        ? "We could not update your password. Request a new recovery link and try again."
        : null;

  return (
    <main className="admin-login">
      <section className="admin-login-panel">
        <Link href="/" className="admin-wordmark">ARETÉ <span>LEAD</span></Link>
        <div className="admin-login-copy">
          <p className="admin-kicker">PROTECTED ACCESS</p>
          <h1>Choose a new<br />password.</h1>
          <p>Use a unique password with at least 12 characters.</p>
        </div>
      </section>
      <section className="admin-login-form-wrap">
        <RecoveryForm message={message} />
      </section>
    </main>
  );
}

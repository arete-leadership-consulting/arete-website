import type { Metadata } from "next";
import Link from "next/link";
import { signIn } from "./actions";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reset?: string }>;
}) {
  const { error, reset } = await searchParams;
  const message =
    error === "invalid"
      ? "The email or password is incorrect."
      : error === "missing"
        ? "Enter both your email and password."
        : error === "unauthorized"
          ? "This account does not have access to ARETE Business OS."
        : null;

  return (
    <main className="admin-login">
      <section className="admin-login-panel">
        <Link href="/" className="admin-wordmark" aria-label="Return to ARETE">
          ARETÉ <span>LEAD</span>
        </Link>
        <div className="admin-login-copy">
          <p className="admin-kicker">PRIVATE BUSINESS OS</p>
          <h1>Lead the work.<br />See the whole picture.</h1>
          <p>Secure access for authorized ARETE team members.</p>
        </div>
      </section>

      <section className="admin-login-form-wrap">
        <form action={signIn} className="admin-login-form">
          <p className="admin-index">01</p>
          <h2>Sign in</h2>
          <p>Use your authorized ARETE account.</p>
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {message ? <p className="admin-form-error" role="alert">{message}</p> : null}
          {reset === "success" ? <p className="admin-form-success" role="status">Your password has been updated. Sign in with your new password.</p> : null}
          <button type="submit">Enter ARETE OS <span>↗</span></button>
          <Link href="/admin/forgot-password" className="admin-return">Forgot password?</Link>
          <Link href="/" className="admin-return">Return to website</Link>
        </form>
      </section>
    </main>
  );
}

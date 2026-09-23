import type { Metadata } from "next";
import Link from "next/link";
import { requestPasswordReset } from "./actions";

export const metadata: Metadata = {
  title: "Reset Admin Password",
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const { error, sent } = await searchParams;

  return (
    <main className="admin-login">
      <section className="admin-login-panel">
        <Link href="/" className="admin-wordmark">ARETÉ <span>LEAD</span></Link>
        <div className="admin-login-copy">
          <p className="admin-kicker">SECURE ACCOUNT RECOVERY</p>
          <h1>Return to<br />the work.</h1>
          <p>We will send a secure, time-limited recovery link to your authorized ARETE account.</p>
        </div>
      </section>
      <section className="admin-login-form-wrap">
        <form action={requestPasswordReset} className="admin-login-form">
          <p className="admin-index">02</p>
          <h2>Reset password</h2>
          <p>Enter the email address connected to ARETE Business OS.</p>
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          {error ? <p className="admin-form-error" role="alert">We could not send the recovery email. Please try again.</p> : null}
          {sent ? <p className="admin-form-success" role="status">Check your inbox for a secure password-reset link.</p> : null}
          <button type="submit">Send recovery link <span>↗</span></button>
          <Link href="/admin/login" className="admin-return">Back to sign in</Link>
        </form>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { updatePassword } from "./actions";

export function RecoveryForm({ message }: { message: string | null }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setReady(Boolean(session));
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <form action={updatePassword} className="admin-login-form">
      <p className="admin-index">03</p>
      <h2>New password</h2>
      <p>{ready ? "Your secure recovery link is verified." : "Open this page from your newest recovery email to verify your reset session."}</p>
      <label>New password<input name="password" type="password" autoComplete="new-password" minLength={12} required disabled={!ready} /></label>
      <label>Confirm password<input name="confirmation" type="password" autoComplete="new-password" minLength={12} required disabled={!ready} /></label>
      {message ? <p className="admin-form-error" role="alert">{message}</p> : null}
      <button type="submit" disabled={!ready}>Update password <span>↗</span></button>
      <Link href="/admin/forgot-password" className="admin-return">Request a new link</Link>
    </form>
  );
}

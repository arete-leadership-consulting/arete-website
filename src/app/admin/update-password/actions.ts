"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (password.length < 12) redirect("/admin/update-password?error=length");
  if (password !== confirmation) redirect("/admin/update-password?error=match");

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/forgot-password?error=expired");

  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect("/admin/update-password?error=update");

  await supabase.auth.signOut();
  redirect("/admin/login?reset=success");
}

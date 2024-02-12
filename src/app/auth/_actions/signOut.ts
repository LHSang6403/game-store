"use server";

import createSupabaseServerClient from "@supabase/server";
import { redirect } from "next/navigation";

export async function signOutHandler() {
  "use server";
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return error;
  }
  return redirect("/auth");
}

"use server";

import createSupabaseServerClient from "@supabase/server";

export async function signOutHandler() {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signOut();

  return result;
}

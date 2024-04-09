"use server";

import createSupabaseServerClient from "@/supabase-query/server";

export async function signOutHandler() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.auth.signOut();

    return result;
  } catch {
    return {
      data: null,
      error: "Đăng xuất thất bại.",
    };
  }
}

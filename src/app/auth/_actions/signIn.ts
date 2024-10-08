"use server";

import createSupabaseServerClient from "@/supabase-query/server";

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    return result;
  } catch {
    return { data: null, error: "Đăng nhập thất bại." };
  }
}

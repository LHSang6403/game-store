"use server";

import createSupabaseServerClient from "@supabase/server";

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
    return { data: null, error: "Failed to sign in." };
  }
}

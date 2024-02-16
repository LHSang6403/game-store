"use server";

import createSupabaseServerClient from "@supabase/server";
import type { ProductType } from "@utils/types/index";

export async function readProduct(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("products").select("*").eq("id", id);
    return { data: result.data as ProductType[] };
  } catch (error: any) {
    return { error: error.message };
  }
}

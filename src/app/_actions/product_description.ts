"use server";

import createSupabaseServerClient from "@supabase/server";
import type { ProductDescriptionType } from "@utils/types/index";

export async function createProductDescription(des: ProductDescriptionType) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("product_description").insert([des]);

    return result;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function readProductDescription({ id }: { id: string }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product_description")
      .select("*")
      .eq("id", id)
      .single();

    return { data: result.data as ProductDescriptionType };
  } catch (error: any) {
    return { error: error.message };
  }
}

"use server";

import createSupabaseServerClient from "@supabase/server";
import type { ProductDescriptionType } from "@utils/types/index";

export async function createProductDescription(des: ProductDescriptionType) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("product_description").insert([des]);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      data: null,
      error: error.message,
    };
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

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as ProductDescriptionType,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      data: null,
      error: error.message,
    };
  }
}

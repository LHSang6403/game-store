"use server";

import createSupabaseServerClient from "@supabase/server";
import type { ProductType, StorageType } from "@utils/types/index";

export async function readStorageQuantityByProductId(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("storage").select("*").eq("prod_id", id);

    return { data: result.data as StorageType[] };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateStorageQuantityByProductId(
  id: string,
  updaingQuantity: number // can be negative or positive
) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("storage")
      .select("quantity")
      .eq("prod_id", id)
      .single();

    if (result.error) {
      return { error: result.error.message };
    }

    const currentQuantity = result.data.quantity as number;
    const newQuantity = currentQuantity + updaingQuantity;

    await supabase
      .from("storage")
      .update({ quantity: newQuantity })
      .eq("prod_id", id);

    return { data: newQuantity };
  } catch (error: any) {
    return { error: error.message };
  }
}

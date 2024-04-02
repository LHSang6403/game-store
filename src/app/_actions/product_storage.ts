"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type { ProductStorageType } from "@utils/types/index";

export async function createProductStorage({
  productStorage,
}: {
  productStorage: ProductStorageType;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product_storage")
      .insert(productStorage);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error.",
      data: null,
      error: error,
    };
  }
}

export async function removeProductStorage(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("product_storage").delete().eq("id", id);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error.",
      data: null,
      error: error,
    };
  }
}

export async function updateStorageQuantityByProductId({
  prod_id,
  storage_id,
  updatedQuantity,
}: {
  prod_id: string;
  storage_id: string;
  updatedQuantity: number; // can be negative or positive
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const readResult = await supabase
      .from("product_storage")
      .select("quantity")
      .eq("prod_id", prod_id)
      .eq("storage_id", storage_id)
      .single();

    if (readResult.error || !readResult.data)
      throw new Error("Không tìm thấy sản phẩm trong kho.");

    const currentQuantity = readResult?.data?.quantity as number;
    const newQuantity = currentQuantity + updatedQuantity;

    const result = await supabase
      .from("product_storage")
      .update({ quantity: newQuantity })
      .eq("prod_id", prod_id)
      .eq("storage_id", storage_id);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error.",
      data: null,
      error: error,
    };
  }
}

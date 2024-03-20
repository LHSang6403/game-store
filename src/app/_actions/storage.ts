"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type { StorageType } from "@utils/types/index";

export async function createStorage(storage: StorageType) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("storage").insert(storage);

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

export async function readStorage({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("storage")
      .select("*")
      .range(offset, limit);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as StorageType[],
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

export async function readStorageQuantityByProductId(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("storage").select("*").eq("prod_id", id);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as StorageType[],
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

export async function updateStorageQuantityByProductId(
  id: string,
  updaingQuantity: number // can be negative or positive
) {
  try {
    const supabase = await createSupabaseServerClient();

    const readResult = await supabase
      .from("storage")
      .select("quantity")
      .eq("prod_id", id)
      .single();

    if (readResult.error) {
      return { error: readResult.error.message };
    }

    const currentQuantity = readResult.data.quantity as number;
    const newQuantity = currentQuantity + updaingQuantity;

    const result = await supabase
      .from("storage")
      .update({ quantity: newQuantity })
      .eq("prod_id", id);

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

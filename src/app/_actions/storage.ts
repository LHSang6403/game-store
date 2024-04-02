"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type {
  StorageType,
  StorageWithProductStorageType,
} from "@utils/types/index";

export async function createStorage(storage: StorageType) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("storage").insert(storage);

    return result;
  } catch (error: any) {
    return error;
  }
}

export async function readStorages() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("storage").select("*");

    if (result.error || !result.data) throw new Error("Lỗi truy vấn kho.");

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

export async function readAllStoragesAndProductStorages() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("storage").select(
      `
  *,
  product_storage (id, product_id, storage_id, product_name, storage_name, quantity)
  `
    );

    if (result.error || !result.data) throw new Error("Lỗi truy vấn kho.");

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as StorageWithProductStorageType[] | null,
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

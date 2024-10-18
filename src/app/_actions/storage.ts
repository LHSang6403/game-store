"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import { buildResponse } from "@/utils/functions/buildResponse";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";
import type {
  StorageType,
  StorageWithProductStorageType,
} from "@utils/types/index";

export async function createStorage(storage: StorageType) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("storage").insert(storage);

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    });
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error,
    });
  }
}

export async function readStorages() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("storage").select("*");

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
      data: result.data as StorageType[],
      error: result.error,
    });
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error,
    });
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

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
      data: result.data as StorageWithProductStorageType[] | null,
      error: result.error,
    });
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error,
    });
  }
}

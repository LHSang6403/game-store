"use server";

import createSupabaseServerClient from "@supabase/server";
import type { OrderType } from "@utils/types/index";
import { updateStorageQuantityByProductId } from "@app/(main)/product/_actions/storage";
import { updateSoldQuantityByProductId } from "@app/(main)/product/_actions/product";

export async function readOrders({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("order")
      .select("*")
      .range(offset, limit);

    return { data: result.data as OrderType[] };
  } catch (error: any) {
    return { error: error.message };
  }
}

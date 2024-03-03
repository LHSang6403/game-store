"use server";

import createSupabaseServerClient from "@supabase/server";
import type { OrderType } from "@utils/types/index";
import { updateStorageQuantityByProductId } from "@/app/_actions/storage";
import { updateSoldQuantityByProductId } from "@/app/_actions/product";
import { zip } from "lodash";
import { revalidatePath } from "next/cache";

export async function createOrder(order: OrderType) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("order").insert(order);

    if (!result.error) {
      const prodIds = order.products.map((prod) => prod.id);

      for (const prodId of prodIds) {
        await updateStorageQuantityByProductId(prodId, -1);
        await updateSoldQuantityByProductId(prodId, 1);
      }
    }

    revalidatePath("/cart");
    return result;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateStateOrder({
  id,
  state,
}: {
  id: string;
  state: "pending" | "shipping" | "delivered" | "canceled" | "returned";
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("order")
      .update({ state: state })
      .eq("id", id);

    if (!result.error) revalidatePath("/dashboard/order");

    return result;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function readOrdersByCustomerId(customerId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("order")
      .select("*")
      .eq("customer_id", customerId);

    return result;
  } catch (error: any) {
    return { error: error.message };
  }
}

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

"use server";

import createSupabaseServerClient from "@supabase/server";
import type { OrderType } from "@utils/types/index";
import { updateStorageQuantityByProductId } from "@app/(main)/product/_actions/storage";
import { updateSoldQuantityByProductId } from "@app/(main)/product/_actions/product";
import { zip } from "lodash";

export async function createOrder(order: OrderType) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("order").insert(order);

    if (!result.error) {
      const prodQuantities = order.prod_quantities;
      const prodIds = order.prod_ids;

      for (const [prodQuantity, prodId] of zip(prodQuantities, prodIds)) {
        if (prodId && prodQuantity) {
          // update storage quantity for each product
          await updateStorageQuantityByProductId(prodId, -1 * prodQuantity);

          // update sold quantity for each product
          await updateSoldQuantityByProductId(prodId, prodQuantity);
        }
      }
    }

    return result;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateStateOrder(
  id: string,
  state: "pending" | "shipping" | "delivered" | "canceled" | "returned"
) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("order").update(state).eq("id", id);

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

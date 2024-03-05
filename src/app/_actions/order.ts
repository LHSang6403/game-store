"use server";

import createSupabaseServerClient from "@supabase/server";
import type { OrderType } from "@utils/types/index";
import { updateStorageQuantityByProductId } from "@/app/_actions/storage";
import { updateSoldQuantityByProductId } from "@/app/_actions/product";
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

export async function readOrderByMonth({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const result = await supabase
      .from("order")
      .select("*")
      .gte("created_at", firstDayOfMonth.toISOString())
      .lte("created_at", lastDayOfMonth.toISOString());

    return result;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getOrderPricesByYear({ year }: { year: number }) {
  const orderPricesByYear: number[] = [];

  for (let month = 1; month <= 12; month++) {
    const orderByMonthResponse = await readOrderByMonth({ month, year });
    let totalRevenueOfMonth = 0;

    if ("data" in orderByMonthResponse) {
      orderByMonthResponse.data?.forEach((order) => {
        totalRevenueOfMonth += order.price;
      });
    }

    orderPricesByYear.push(totalRevenueOfMonth);
  }

  return orderPricesByYear;
}

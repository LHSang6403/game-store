"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type { OrderType, LogActorType } from "@utils/types/index";
import { updateStorageQuantityByProductId } from "@/app/_actions/product_storage";
import { updateSoldQuantityByProductId } from "@/app/_actions/product";
import { revalidatePath } from "next/cache";
import { ShipmentState } from "@utils/types/index";
import { saveToLog } from "@app/_actions/log";
import { checkRoleAuthenticated, checkRoleStaff } from "@app/_actions/user";

export async function createOrder({
  order,
  actor,
}: {
  order: OrderType;
  actor: LogActorType;
}) {
  try {
    const isAuthenticated = await checkRoleAuthenticated();
    if (!isAuthenticated)
      throw new Error("Không xác định tài khoản đăng nhập.");

    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("order").insert(order);

    const prodIds = order.products.map((prod) => prod.product.id);
    for (const prodId of prodIds) {
      await updateStorageQuantityByProductId({
        prod_id: prodId,
        storage_id: order.pick_storage_id,
        updatedQuantity: -1,
      });
      await updateSoldQuantityByProductId(prodId, 1);
    }

    await saveToLog({
      logName: "Tạo đơn " + order.address,
      logType: "Tạo mới",
      logResult: !result.error ? "Thành công" : "Thất bại",
      logActor: actor,
    });

    revalidatePath("/cart");
    revalidatePath("/dashboard/order");

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error.message,
    };
  }
}

export async function updateStateOrder({
  order,
  state,
  actor,
}: {
  order: OrderType;
  state: ShipmentState;
  actor: LogActorType;
}) {
  try {
    const isAuthenticated = await checkRoleAuthenticated();
    if (!isAuthenticated)
      throw new Error("Không xác định tài khoản đăng nhập.");

    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("order")
      .update({ state: state })
      .eq("id", order.id);

    if (result.error) throw new Error("Lỗi khi cập nhật trình trạng đơn hàng.");

    revalidatePath("/dashboard/order");

    await saveToLog({
      logName: "Cập nhật đơn " + order.address + " thành " + state,
      logType: "Cập nhật",
      logResult: !result.error ? "Thành công" : "Thất bại",
      logActor: actor,
    });

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error.message,
    };
  }
}

export async function readOrdersByCustomerId(customerId: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("order")
      .select("*")
      .eq("customer_id", customerId);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as OrderType[],
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: "No data.",
    };
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

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as OrderType[],
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error.message,
    };
  }
}

export async function readOrdersByDateRange({
  from,
  to,
}: {
  from: Date;
  to: Date;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({ role: "Quản lý" });
    const isSellerAuthenticated = await checkRoleStaff({
      role: "Bán hàng",
    });
    const isWriterAuthenticated = await checkRoleStaff({
      role: "Biên tập",
    });

    if (
      !isManagerAuthenticated &&
      !isSellerAuthenticated &&
      !isWriterAuthenticated
    ) {
      throw new Error("Không có quyền truy cập.");
    }

    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("order")
      .select("*")
      .gte("created_at", from.toISOString())
      .lte("created_at", to.toISOString());

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as OrderType[],
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error.message,
    };
  }
}

export async function readOrdersNumbersByDateRange({
  from,
  to,
}: {
  from: Date;
  to: Date;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({ role: "Quản lý" });
    if (!isManagerAuthenticated) throw new Error("Không có quyền truy cập.");

    const supabase = await createSupabaseServerClient();

    const orderPricesByMonth: { month: number; year: number; total: number }[] =
      [];

    const result = await supabase
      .from("order")
      .select("*")
      .gte("created_at", from.toISOString())
      .lte("created_at", to.toISOString());

    if ("data" in result) {
      const orders = result.data ?? [];
      const monthlyTotal: { [key: string]: number } = {};

      orders.forEach((order) => {
        const date = new Date(order.created_at);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const key = `${month}-${year}`;
        if (!monthlyTotal[key]) {
          monthlyTotal[key] = 0;
        }
        monthlyTotal[key] += order.price;
      });

      Object.entries(monthlyTotal).forEach(([key, total]) => {
        const [monthStr, yearStr] = key.split("-");
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);
        orderPricesByMonth.push({ month, year, total });
      });
    }

    return {
      status: result.status,
      statusText: result.statusText,
      data: orderPricesByMonth,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error.message,
    };
  }
}

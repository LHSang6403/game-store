"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type {
  InsertedProductStorageType,
  ProductStorageType,
} from "@utils/types/index";
import { revalidatePath } from "next/cache";
import { saveToLog } from "@app/_actions/log";
import { LogActorType } from "@utils/types/index";
import { checkRoleAuthenticated, checkRoleStaff } from "@app/_actions/user";

export async function createProductStorage({
  productStorage,
}: {
  productStorage: ProductStorageType;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: "Quản lý",
    });
    const isSellerAuthenticated = await checkRoleStaff({
      role: "Bán hàng",
    });

    if (!isManagerAuthenticated && !isSellerAuthenticated)
      throw new Error("Không có quyền lưu kho sản phẩm");

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
      statusText: "Lỗi máy chủ",
      data: null,
      error: error,
    };
  }
}

export async function removeProductStorage(id: string) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: "Quản lý",
    });
    if (!isManagerAuthenticated)
      throw new Error("Không có quyền xóa kho sản phẩm");

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
      statusText: "Lỗi máy chủ",
      data: null,
      error: error,
    };
  }
}

export async function readAllProductStorages() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("product_storage").select("*");

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as ProductStorageType[],
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
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
    const isAuthenticated = await checkRoleAuthenticated();
    if (!isAuthenticated) throw new Error("Chưa có thông tin đăng nhập");

    const supabase = await createSupabaseServerClient();

    const readResult = await supabase
      .from("product_storage")
      .select("quantity")
      .eq("product_id", prod_id)
      .eq("storage_id", storage_id)
      .single();

    const currentQuantity = readResult?.data?.quantity as number;
    const newQuantity = currentQuantity + updatedQuantity;

    const result = await supabase
      .from("product_storage")
      .update({ quantity: newQuantity })
      .eq("product_id", prod_id)
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
      statusText: "Lỗi máy chủ",
      data: null,
      error: error,
    };
  }
}

export async function updateProductStoragesQuantity({
  addProductStorageList,
  actor,
}: {
  addProductStorageList: InsertedProductStorageType[];
  actor: LogActorType;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: "Quản lý",
    });
    const isSellerAuthenticated = await checkRoleStaff({
      role: "Bán hàng",
    });

    if (!isManagerAuthenticated && !isSellerAuthenticated)
      throw new Error("Không có quyền nhập kho sản phẩm");

    const supabase = await createSupabaseServerClient();

    for (const addProductStorage of addProductStorageList) {
      const sproductStorage_id = addProductStorage.product_storage_id;

      const orgiginalProductStorage = await supabase
        .from("product_storage")
        .select("*")
        .eq("id", sproductStorage_id)
        .single();

      const updatedQuantity =
        parseInt(orgiginalProductStorage?.data?.quantity ?? 0) +
        addProductStorage.inserted_quantity;

      const updateResult = await supabase
        .from("product_storage")
        .update({ quantity: updatedQuantity })
        .eq("id", sproductStorage_id);

      await saveToLog({
        logName:
          "Nhập thêm " +
          addProductStorage.inserted_quantity +
          " " +
          addProductStorage.product_name +
          " vào kho " +
          addProductStorage.storage_name,
        logType: "Cập nhật",
        logResult: !updateResult.error ? "Thành công" : "Thất bại",
        logActor: actor,
      });
    }

    revalidatePath("/dashboard/insert");

    return {
      status: 200,
      statusText: "Cập nhật thành công",
      data: addProductStorageList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi nhập thêm sản phẩm.",
      data: null,
      error: error,
    };
  }
}

"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type {
  InsertedProductStorageType,
  ProductStorageType,
} from "@utils/types/index";
import { revalidatePath } from "next/cache";
import { saveToLog } from "@app/_actions/log";
import { LogActorType, StaffRole } from "@utils/types/index";
import { checkRoleAuthenticated, checkRoleStaff } from "@app/_actions/user";
import { buildResponse } from "@/utils/functions/buildResponse";
import { Log } from "@/utils/types/log";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";
import { NO_PERMISSION_TO_DELETE, NO_PERMISSION_TO_UPDATE, UNAUTHENTICATED_USER } from "@/utils/constant/auth";

export async function createProductStorage({
  productStorage,
}: {
  productStorage: ProductStorageType;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: StaffRole.Manager,
    });
    const isSellerAuthenticated = await checkRoleStaff({
      role: StaffRole.Seller,
    });

    if (!isManagerAuthenticated && !isSellerAuthenticated)
      throw new Error("Không có quyền lưu kho sản phẩm");

    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product_storage")
      .insert(productStorage);

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
      error: error,
    });
  }
}

export async function removeProductStorage(id: string) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: StaffRole.Manager,
    });
    if (!isManagerAuthenticated) throw new Error(NO_PERMISSION_TO_DELETE);

    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("product_storage").delete().eq("id", id);

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
      error: error,
    });
  }
}

export async function readAllProductStorages() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("product_storage").select("*");

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
      data: result.data as ProductStorageType[],
      error: result.error,
    });
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error,
    });
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
    if (!isAuthenticated) throw new Error(UNAUTHENTICATED_USER);

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
      error: error,
    });
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
      role: StaffRole.Manager,
    });
    const isSellerAuthenticated = await checkRoleStaff({
      role: StaffRole.Seller,
    });

    if (!isManagerAuthenticated && !isSellerAuthenticated)
      throw new Error(NO_PERMISSION_TO_UPDATE);

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
        logType: Log.Update,
        logResult: !updateResult.error ? Log.Success : Log.Fail,
        logActor: actor,
      });
    }

    revalidatePath("/dashboard/insert");

    return buildResponse({
      status: ApiStatusNumber.Success,
      statusText: ApiStatus.Success,
      data: addProductStorageList,
      error: null,
    });
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error,
    });
  }
}

"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type {
  InsertedProductStorageType,
  ProductStorageType,
} from "@utils/types/index";
import { revalidatePath } from "next/cache";

export async function createProductStorage({
  productStorage,
}: {
  productStorage: ProductStorageType;
}) {
  try {
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
      statusText: "Internal Server Error.",
      data: null,
      error: error,
    };
  }
}

export async function removeProductStorage(id: string) {
  try {
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
      statusText: "Internal Server Error.",
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
      statusText: "Internal Server Error.",
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
    const supabase = await createSupabaseServerClient();

    const readResult = await supabase
      .from("product_storage")
      .select("quantity")
      .eq("product_id", prod_id)
      .eq("storage_id", storage_id)
      .single();

    if (readResult.error && !readResult.data)
      throw new Error("Không tìm thấy sản phẩm trong kho.");

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
      statusText: "Internal Server Error.",
      data: null,
      error: error,
    };
  }
}

export async function updateProductStoragesQuantity({
  addProductStorageList,
}: {
  addProductStorageList: InsertedProductStorageType[];
}) {
  try {
    const supabase = await createSupabaseServerClient();
    let result;

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

      if (updateResult.error)
        throw new Error("Đã có lỗi xảy ra khi nhập thêm sản phẩm vào kho.");

      result = updateResult;
    }

    revalidatePath("/dashboard/insert");

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
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

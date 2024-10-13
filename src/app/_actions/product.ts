"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type {
  CategoryType,
  ProductDescriptionType,
  ProductStorageType,
  ProductType,
  ProductWithDescriptionAndStorageType,
  StorageType,
} from "@utils/types/index";
import { revalidatePath } from "next/cache";
import { saveToLog } from "@app/_actions/log";
import { LogActorType, StaffRole } from "@utils/types/index";
import { checkRoleAuthenticated, checkRoleStaff } from "@app/_actions/user";
import { buildResponse } from "@utils/functions/buildResponse";
import { Log } from "@/utils/types/log";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";
import {
  NO_PERMISSION_TO_CREATE,
  NO_PERMISSION_TO_DELETE,
  NO_PERMISSION_TO_UPDATE,
  UNAUTHENTICATED_USER,
} from "@/utils/constant/auth";

export async function createProduct({
  product,
  actor,
}: {
  product: ProductType;
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
      throw new Error(NO_PERMISSION_TO_CREATE);

    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("product").insert(product);

    await saveToLog({
      logName: "Tạo sản phẩm" + product.name,
      logType: Log.Create,
      logResult: !result.error ? Log.Success : Log.Fail,
      logActor: actor,
    });

    revalidatePath("/dashboard/product");
    revalidatePath("/product");

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

export async function readProducts({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .select("*")
      .range(offset, limit)
      .eq("is_deleted", false);

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
      data: result.data as ProductType[],
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

export async function readProductsWithDetail() {
  try {
    const supabase = await createSupabaseServerClient();

    const productResult = await supabase
      .from("product")
      .select("*")
      .eq("is_deleted", false);

    const descriptionResult = await supabase
      .from("product_description")
      .select("*");

    const storageResult = await supabase.from("storage").select("*");

    const productStorageResult = await supabase
      .from("product_storage")
      .select("*");

    const products: ProductType[] = productResult.data || [];
    const descriptions: ProductDescriptionType[] = descriptionResult.data || [];
    const storages: StorageType[] = storageResult.data || [];
    const productStorages: ProductStorageType[] =
      productStorageResult.data || [];

    const productDetails: ProductWithDescriptionAndStorageType[] = products.map(
      (product) => {
        const description = descriptions.find(
          (desc) => desc.id === product.description_id
        );
        const productStoragesFiltered = productStorages.filter(
          (ps) => ps.product_id === product.id
        );
        const productStoragesDetails: ProductStorageType[] =
          productStoragesFiltered.map((ps) => {
            const storage = storages.find(
              (storage) => storage.id === ps.storage_id
            );
            return {
              ...ps,
              storage_name: storage ? storage.name : "",
              storage_address: storage ? storage.address : "",
            };
          });

        return {
          product,
          product_description: description || {
            id: "",
            content: "",
            writer: "",
            created_at: "",
          },
          product_storages: productStoragesDetails,
          storages,
        };
      }
    );

    return buildResponse({
      status: ApiStatusNumber.Success,
      statusText: ApiStatus.Success,
      data: productDetails,
      error: null,
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

export async function readProductDetailById(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const productResult = await supabase
      .from("product")
      .select("*")
      .eq("id", id)
      .eq("is_deleted", false)
      .single();

    const descriptionResult = await supabase
      .from("product_description")
      .select("*")
      .eq("id", productResult.data.description_id)
      .single();

    let resultData: ProductWithDescriptionAndStorageType = {
      product: productResult.data as ProductType,
      product_description: descriptionResult.data as ProductDescriptionType,
      product_storages: [] as ProductStorageType[],
      storages: [] as StorageType[],
    };

    // query storages
    const productStorageResult = (await supabase
      .from("product_storage")
      .select("*")
      .eq("product_id", id)) as { data: ProductStorageType[]; error: any };

    if (productStorageResult.data.length > 0) {
      resultData.product_storages = productStorageResult.data;

      for (const productStorage of productStorageResult.data) {
        const storageResult = await supabase
          .from("storage")
          .select("*")
          .eq("id", productStorage.storage_id)
          .single();

        if (storageResult.data) {
          resultData.storages.push(storageResult.data);
        }
      }
    }

    return buildResponse<ProductWithDescriptionAndStorageType>({
      status: productResult.status,
      statusText: productResult.statusText,
      data: resultData,
      error: productResult.error,
    });
  } catch (error: any) {
    return buildResponse<null>({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error,
    });
  }
}

export async function updateSoldQuantityByProductId(
  id: string,
  updatingQuantity: number
) {
  try {
    const isAuthenticated = await checkRoleAuthenticated();
    if (!isAuthenticated) throw new Error(UNAUTHENTICATED_USER);

    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .select("sold_quantity")
      .eq("id", id)
      .single();

    const currentSoldQuantity = result?.data?.sold_quantity as number;
    const newSoldQuantity = currentSoldQuantity + updatingQuantity;

    const updateResult = await supabase
      .from("product")
      .update({ sold_quantity: newSoldQuantity })
      .eq("id", id);

    return buildResponse({
      status: updateResult.status,
      statusText: updateResult.statusText,
      data: updateResult.data,
      error: updateResult.error,
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

export async function readAllCategories() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("category")
      .select("*")
      .eq("is_deleted", false);

    return buildResponse<CategoryType[]>({
      status: result.status,
      statusText: result.statusText,
      data: result.data as CategoryType[],
      error: result.error,
    });
  } catch (error: any) {
    return buildResponse<null>({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error?.message,
    });
  }
}

export async function readProductBrands() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .select("brand")
      .eq("is_deleted", false);

    const uniqueBrands = Array.from(
      new Set(result?.data?.map((item: { brand: string }) => item.brand))
    );

    return buildResponse<string[]>({
      status: result.status,
      statusText: result.statusText,
      data: uniqueBrands,
      error: result.error,
    });
  } catch (error: any) {
    return buildResponse<null>({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error,
    });
  }
}

export async function removeProductById({
  product,
  actor,
}: {
  product: ProductType;
  actor: LogActorType;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: StaffRole.Manager,
    });
    if (!isManagerAuthenticated) throw new Error(NO_PERMISSION_TO_DELETE);

    const supabase = await createSupabaseServerClient();

    const removeResult = await supabase
      .from("product")
      .update({ is_deleted: true })
      .eq("id", product.id);

    await saveToLog({
      logName: "Xóa sản phẩm" + product.name,
      logType: Log.Delete,
      logResult: !removeResult.error ? Log.Success : Log.Fail,
      logActor: actor,
    });

    return buildResponse({
      status: removeResult.status,
      statusText: removeResult.statusText,
      data: removeResult.data,
      error: removeResult.error,
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

export async function updateProduct({
  updatedProduct,
  actor,
}: {
  updatedProduct: ProductType;
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

    const result = await supabase
      .from("product")
      .update(updatedProduct)
      .eq("id", updatedProduct.id)
      .eq("is_deleted", false);

    await saveToLog({
      logName: "Cập nhật sản phẩm " + updatedProduct.name,
      logType: Log.Update,
      logResult: !result.error ? Log.Success : Log.Fail,
      logActor: actor,
    });

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

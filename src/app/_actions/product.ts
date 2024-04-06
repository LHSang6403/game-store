"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type {
  ProductDescriptionType,
  ProductStorageType,
  ProductType,
  ProductWithDescriptionAndStorageType,
  StorageType,
} from "@utils/types/index";
import { revalidatePath } from "next/cache";
import { saveToLog, LogActorType } from "@app/_actions/log";

export async function createProduct({
  product,
  actor,
}: {
  product: ProductType;
  actor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("product").insert(product);

    await saveToLog({
      logName: "Tạo sản phẩm" + product.name,
      logType: "Tạo mới",
      logResult: !result.error ? "Thành công" : "Thất bại",
      logActor: actor,
    });

    revalidatePath("/dashboard/product");
    revalidatePath("/product");

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

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as ProductType[],
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

    if (
      productResult.error ||
      descriptionResult.error ||
      storageResult.error ||
      productStorageResult.error
    ) {
      throw new Error("Lỗi khi truy vấn dữ liệu.");
    }

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

    return {
      status: 200,
      statusText: "OK",
      data: productDetails,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error,
    };
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

    if (productResult.error || !productResult.data) {
      throw new Error("Lỗi truy vấn sản phẩm.");
    }

    const descriptionResult = await supabase
      .from("product_description")
      .select("*")
      .eq("id", productResult.data.description_id)
      .single();

    if (descriptionResult.error || !descriptionResult.data) {
      throw new Error("Lỗi truy vấn mô tả sản phẩm.");
    }

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

    return {
      status: productResult.status,
      statusText: productResult.statusText,
      data: resultData as ProductWithDescriptionAndStorageType,
      error: productResult.error,
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

export async function updateSoldQuantityByProductId(
  id: string,
  updatingQuantity: number
) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .select("sold_quantity")
      .eq("id", id)
      .single();

    if (result.error) {
      throw new Error("Lỗi truy vấn mô tả sản phẩm.");
    }

    const currentSoldQuantity = result.data.sold_quantity as number;
    const newSoldQuantity = currentSoldQuantity + updatingQuantity;

    const updateResult = await supabase
      .from("product")
      .update({ sold_quantity: newSoldQuantity })
      .eq("id", id);

    return {
      status: updateResult.status,
      statusText: updateResult.statusText,
      data: updateResult.data,
      error: updateResult.error,
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

export async function readAllProductsWithNameAndId() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .select("id, name")
      .eq("is_deleted", false);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as { id: string; name: string }[],
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

export async function readAllCategories() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .select("category")
      .eq("is_deleted", false);

    if (result.error) {
      throw new Error("Lỗi truy vấn mô tả sản phẩm.");
    }

    const uniqueCategories = Array.from(
      new Set(result.data.map((item: { category: string }) => item.category))
    );

    return {
      status: result.status,
      statusText: result.statusText,
      data: uniqueCategories,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error?.message,
    };
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

    return {
      status: result.status,
      statusText: result.statusText,
      data: uniqueBrands,
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

export async function removeProductById({
  product,
  actor,
}: {
  product: ProductType;
  actor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const removeResult = await supabase
      .from("product")
      .update({ is_deleted: true })
      .eq("id", product.id);

    await saveToLog({
      logName: "Xóa sản phẩm" + product.name,
      logType: "Xóa",
      logResult: !removeResult.error ? "Thành công" : "Thất bại",
      logActor: actor,
    });

    return {
      status: removeResult.status,
      statusText: removeResult.statusText,
      data: removeResult.data,
      error: removeResult.error,
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

export async function updateProduct({
  updatedProduct,
  actor,
}: {
  updatedProduct: ProductType;
  actor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .update(updatedProduct)
      .eq("id", updatedProduct.id)
      .eq("is_deleted", false);

    await saveToLog({
      logName: "Cập nhật sản phẩm " + updatedProduct.name,
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
      error: error,
    };
  }
}

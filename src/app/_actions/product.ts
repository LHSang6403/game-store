"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type {
  ProductType,
  ProductWithDescriptionAndStorageType,
} from "@utils/types/index";
import { revalidatePath } from "next/cache";

export async function createProduct(product: ProductType) {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("product").insert(product);

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
      statusText: "Internal Server Error.",
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
      statusText: "Internal Server Error.",
      data: null,
      error: error,
    };
  }
}

export async function readProductsWithDetail({ limit, offset }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .select(
        `
  *,
  product_description (id, content, writer, comments),
  storage (id, address, quantity)
`
      )
      .range(offset, limit)
      .eq("is_deleted", false);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as ProductWithDescriptionAndStorageType[],
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

export async function readProductDetailById(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .select(
        `
  *,
  product_description (id, content, writer, comments),
  storage (id, address, quantity)
`
      )
      .eq("id", id)
      .eq("is_deleted", false)
      .single();

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as ProductWithDescriptionAndStorageType,
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
      throw new Error("Failed to retrieve sold quantity for product.");
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
      statusText: "Internal Server Error.",
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
      statusText: "Internal Server Error.",
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
      throw new Error("Failed to retrieve sold quantity for product.");
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
      statusText: "Internal Server Error.",
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
      statusText: "Internal Server Error.",
      data: null,
      error: error,
    };
  }
}

export async function removeProductById(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const removeResult = await supabase
      .from("product")
      .update({ is_deleted: true })
      .eq("id", id);

    return {
      status: removeResult.status,
      statusText: removeResult.statusText,
      data: removeResult.data,
      error: removeResult.error,
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

export async function updateProductById({
  updatedProduct,
}: {
  updatedProduct: ProductType;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product")
      .update(updatedProduct)
      .eq("id", updatedProduct.id)
      .eq("is_deleted", false);

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

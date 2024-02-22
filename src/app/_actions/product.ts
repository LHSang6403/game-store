"use server";

import createSupabaseServerClient from "@supabase/server";
import type {
  ProductType,
  ProductWithDescriptionAndStorageType,
} from "@utils/types/index";

export async function createProduct(
  product: ProductType
) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("product").insert(product);

    return result;
  } catch (error: any) {
    return { error: error.message };
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

    return { data: result.data as ProductType[] };
  } catch (error: any) {
    return { error: error.message };
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
  product_description (id, content, images, writer, comments),
  storage (id, name, address, quantity)
`
      )
      .eq("id", id)
      .eq("is_deleted", false)
      .single();

    return { data: result.data as ProductWithDescriptionAndStorageType };
  } catch (error: any) {
    return { error: error.message };
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
      return { error: result.error.message };
    }

    const currentSoldQuantity = result.data.sold_quantity as number;
    const newSoldQuantity = currentSoldQuantity + updatingQuantity;

    await supabase
      .from("product")
      .update({ sold_quantity: newSoldQuantity })
      .eq("id", id);

    return result;
  } catch (error: any) {
    return { error: error.message };
  }
}

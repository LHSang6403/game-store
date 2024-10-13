"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import { StaffRole, type ProductDescriptionType } from "@utils/types/index";
import { checkRoleStaff } from "@app/_actions/user";
import { buildResponse } from "@/utils/functions/buildResponse";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";
import {
  NO_PERMISSION_TO_CREATE,
  NO_PERMISSION_TO_UPDATE,
} from "@/utils/constant/auth";

export async function createProductDescription(des: ProductDescriptionType) {
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

    const result = await supabase.from("product_description").insert([des]);

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
      error: error.message,
    });
  }
}

export async function readProductDescription({ id }: { id: string }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("product_description")
      .select("*")
      .eq("id", id)
      .single();

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
      data: result.data as ProductDescriptionType,
      error: result.error,
    });
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error.message,
    });
  }
}

export async function updateProductDescription({
  updatedProductDescription,
}: {
  updatedProductDescription: ProductDescriptionType;
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
      .from("product_description")
      .update(updatedProductDescription)
      .eq("id", updatedProductDescription.id);

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
      error: error.message,
    });
  }
}

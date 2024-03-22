"use server";

import type { CustomerType, StaffType } from "@utils/types";
import createSupabaseServerClient, {
  createSupabaseAdmin,
} from "@/supabase-query/server";
import { revalidatePath } from "next/cache";
import customerToStaff from "@utils/functions/customerToStaff";

export async function readUserSession() {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.getSession();

    if (!result?.data?.session) throw new Error("No session.");

    const userMetadataRole = result?.data?.session?.user?.user_metadata?.role;
    const userId = result?.data?.session?.user?.id;

    if (
      userMetadataRole === "Seller" ||
      userMetadataRole === "Writer" ||
      userMetadataRole === "Manager"
    ) {
      const staffResult = await supabase
        .from("staff")
        .select("*")
        .eq("id", userId);

      return {
        status: staffResult.status,
        statusText: staffResult.statusText,
        data: {
          ...(result as { data: any; error: any }),
          detailData: (staffResult.data?.[0] as StaffType) || null,
        },
        error: staffResult.error,
      };
    } else {
      const customerResult = await supabase
        .from("customer")
        .select("*")
        .eq("id", userId);

      return {
        status: customerResult.status,
        statusText: customerResult.statusText,
        data: {
          ...(result as { data: any; error: any }),
          detailData: (customerResult.data?.[0] as CustomerType) || null,
        },
        error: customerResult.error,
      };
    }
  } catch {
    return {
      status: 500,
      statusText: "Internal server error",
      data: null,
      error: "No session.",
    };
  }
}

export async function updateStaffRole({
  id,
  updatedRole,
}: {
  id: string;
  updatedRole: string;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    const result = await supabase
      .from("staff")
      .update({ role: updatedRole })
      .eq("id", id);

    await supabaseAdmin.auth.admin.updateUserById(id, {
      user_metadata: { role: updatedRole },
    });

    if (!result.error) revalidatePath("/dashboard/staff");

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      data: null,
      error: "Error on update.",
    };
  }
}

export async function updateToStaff({
  id,
  role,
}: {
  id: string;
  role: "Seller" | "Writer" | "Manager";
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    const orders = await supabase
      .from("order")
      .select("*")
      .eq("customer_id", id);

    const hasOrders = orders?.data && orders?.data.length > 0;

    if (hasOrders) {
      return {
        status: 400,
        statusText: "Customer is having orders.",
        data: null,
        error: "Customer is having orders.",
      };
    } else {
      const customer = await supabase
        .from("customer")
        .select("*")
        .eq("id", id)
        .single();
      const customerData = customer.data;

      if (customerData) {
        await supabaseAdmin.auth.admin.updateUserById(id, {
          user_metadata: { role: role },
        });

        await supabase.from("customer").delete().eq("id", id);

        const result = await supabase
          .from("staff")
          .insert(customerToStaff(customerData, role));

        return {
          status: result.status,
          statusText: result.statusText,
          data: result.data,
          error: result.error,
        };
      } else
        return {
          status: 404,
          statusText: "Customer data error.",
          data: null,
          error: "User can not found.",
        };
    }
  } catch {
    return {
      status: 500,
      statusText: "Internal server error.",
      data: null,
      error: "Error on update.",
    };
  }
}

export async function updateUserProfile<T>({
  id,
  role,
  updatingData,
}: {
  id: string;
  role: "Staff" | "Customer";
  updatingData: T;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from(role.toLowerCase())
      .update(updatingData)
      .eq("id", id);

    if (!result.error) revalidatePath("/profile");

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch {
    return {
      status: 500,
      statusText: "Error on update.",
      data: null,
      error: "Error on update.",
    };
  }
}

export async function readStaffs({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("staff")
      .select("*")
      .range(offset, limit);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as StaffType[],
      error: result.error,
    };
  } catch {
    return {
      status: 500,
      statusText: "Internal server error.",
      data: null,
      error: "Error on read.",
    };
  }
}

export async function readCustomers({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("customer")
      .select("*")
      .range(offset, limit);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as CustomerType[],
      error: result.error,
    };
  } catch {
    return {
      status: 500,
      statusText: "Internal server error.",
      data: null,
      error: "Error on read.",
    };
  }
}

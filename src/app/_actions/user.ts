"use server";

import type { CustomerType, StaffType } from "@utils/types";
import createSupabaseServerClient, {
  createSupabaseAdmin,
} from "@/supabase-query/server";
import { revalidatePath } from "next/cache";
import customerToStaff from "@utils/functions/customerToStaff";
import staffToCustomer from "@utils/functions/staffToCustomer";
import { saveToLog, LogActorType } from "@app/_actions/log";

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
  staff,
  updatedRole,
  actor,
}: {
  staff: StaffType;
  updatedRole: string;
  actor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    const updateResult = await supabase
      .from("staff")
      .update({ role: updatedRole })
      .eq("id", staff.id);

    const updateAdminResult = await supabaseAdmin.auth.admin.updateUserById(
      staff.id,
      {
        user_metadata: { role: updatedRole },
      }
    );

    await saveToLog({
      logName: "Update Staff to " + updatedRole,
      logType: "Update",
      logResult:
        !updateResult.error && !updateAdminResult ? "Success" : "Error",
      logActor: actor,
    });

    if (!updateResult.error && !updateAdminResult)
      revalidatePath("/dashboard/staff");

    return {
      status: updateResult.status,
      statusText: updateResult.statusText,
      data: updateResult.data,
      error: updateResult.error,
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

export async function updateCustomerToStaff({
  customer,
  role,
  actor,
}: {
  customer: CustomerType;
  role: "Seller" | "Writer" | "Manager";
  actor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    const orders = await supabase
      .from("order")
      .select("*")
      .eq("customer_id", customer.id);

    const hasOrders = orders?.data && orders?.data.length > 0;

    if (hasOrders) {
      return {
        status: 400,
        statusText: "Customer is having orders.",
        data: null,
        error: "Customer is having orders.",
      };
    } else {
      const customerResult = await supabase
        .from("customer")
        .select("*")
        .eq("id", customer.id)
        .single();

      const customerData = customerResult.data;

      if (customerData) {
        await supabaseAdmin.auth.admin.updateUserById(customer.id, {
          user_metadata: { role: role },
        });

        await supabase.from("customer").delete().eq("id", customer.id);

        const result = await supabase
          .from("staff")
          .insert(customerToStaff(customerData, role));

        revalidatePath("/dashboard/customer");
        revalidatePath("/dashboard/staff");

        await saveToLog({
          logName: "Update Customer " + customer.name + " to Staff",
          logType: "Update",
          logResult: !result.error ? "Success" : "Error",
          logActor: actor,
        });

        return {
          status: result.status,
          statusText: result.statusText,
          data: result.data,
          error: result.error,
        };
      } else throw new Error("User can not found.");
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

export async function updateStaffToCustomer({
  staff,
  actor,
}: {
  staff: StaffType;
  actor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    const staffResult = await supabase
      .from("staff")
      .select("*")
      .eq("id", staff.id)
      .single();

    const staffData = staffResult.data;

    if (staffData) {
      await supabaseAdmin.auth.admin.updateUserById(staff.id, {
        user_metadata: { role: "Customer" },
      });

      await supabase.from("staff").delete().eq("id", staff.id);

      const result = await supabase
        .from("customer")
        .insert(staffToCustomer(staffData));

      revalidatePath("/dashboard/customer");
      revalidatePath("/dashboard/staff");

      await saveToLog({
        logName: "Update Staff " + staff.name + " to Customer",
        logType: "Update",
        logResult: !result.error ? "Success" : "Error",
        logActor: actor,
      });

      return {
        status: result.status,
        statusText: result.statusText,
        data: result.data,
        error: result.error,
      };
    } else throw new Error("User can not found.");
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal server error.",
      data: null,
      error: "Error on update.",
    };
  }
}

export async function updateUserProfile({
  updatedUser,
  actor,
}: {
  updatedUser: CustomerType | StaffType;
  actor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    let role = "customer";
    if ("role" in updatedUser) {
      role = "staff";
    }

    const result = await supabase
      .from(role.toLowerCase())
      .update(updatedUser)
      .eq("id", updatedUser.id);

    if (!result.error) {
      revalidatePath("/profile");

      await supabaseAdmin.auth.admin.updateUserById(updatedUser.id, {
        user_metadata: { name: updatedUser.name, phone: updatedUser.phone },
      });
    }

    await saveToLog({
      logName: "Update profile of " + updatedUser.name,
      logType: "Update",
      logResult: !result.error ? "Success" : "Error",
      logActor: actor,
    });

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
      .range(offset, limit)
      .neq("name", "Default Staff Create");

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

export async function updateCustomerLevel({
  customer,
  newLevel,
  actor,
}: {
  customer: CustomerType;
  newLevel: number;
  actor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("customer")
      .update({ level: newLevel })
      .eq("id", customer.id);

    if (!result.error) revalidatePath("/dashboard/customer");

    await saveToLog({
      logName: "Update Customer level " + customer.name + " to " + newLevel,
      logType: "Update",
      logResult: !result.error ? "Success" : "Error",
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
      statusText: "Internal server error.",
      data: null,
      error: "Error on update.",
    };
  }
}

export async function updateUserImage({
  id,
  table,
  newImage,
}: {
  id: string;
  table: "customer" | "staff";
  newImage: string;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from(table)
      .update({ image: newImage })
      .eq("id", id);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal server error.",
      data: null,
      error: "Error on update.",
    };
  }
}

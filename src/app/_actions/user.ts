"use server";

import { CustomerType, StaffRole, StaffType, LogActorType } from "@utils/types";
import createSupabaseServerClient, {
  createSupabaseAdmin,
} from "@/supabase-query/server";
import { revalidatePath } from "next/cache";
import customerToStaff from "@utils/functions/customerToStaff";
import staffToCustomer from "@utils/functions/staffToCustomer";
import { saveToLog } from "@app/_actions/log";
import { buildResponse } from "@/utils/functions/buildResponse";
import { Log } from "@/utils/types/log";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";
import {
  ERROR_WHEN_READ,
  ERROR_WHEN_UPDATE,
  NO_PERMISSION_TO_UPDATE,
  UNAUTHENTICATED_USER,
} from "@/utils/constant/auth";

const OWNER_ID = "970f61f1-f480-4388-a100-521594fe7840";

export async function readUserSession() {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.getSession();

    if (!result?.data?.session) throw new Error(UNAUTHENTICATED_USER);

    const userMetadataRole = result?.data?.session?.user?.user_metadata?.role;
    const userId = result?.data?.session?.user?.id;

    if (
      userMetadataRole === "Bán hàng" ||
      userMetadataRole === "Biên tập" ||
      userMetadataRole === "Quản lý"
    ) {
      const staffResult = await supabase
        .from("staff")
        .select("*")
        .eq("id", userId);

      return buildResponse({
        status: staffResult.status,
        statusText: staffResult.statusText,
        data: {
          ...(result as { data: any; error: any }),
          detailData: (staffResult.data?.[0] as StaffType) || null,
        },
        error: staffResult.error,
      });
    } else {
      const customerResult = await supabase
        .from("customer")
        .select("*")
        .eq("id", userId);

      return buildResponse({
        status: customerResult.status,
        statusText: customerResult.statusText,
        data: {
          ...(result as { data: any; error: any }),
          detailData: (customerResult.data?.[0] as CustomerType) || null,
        },
        error: customerResult.error,
      });
    }
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error.message,
    });
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
    if (staff.id === OWNER_ID) throw new Error(NO_PERMISSION_TO_UPDATE);

    const isManagerAuthenticeated = await checkRoleStaff({
      role: StaffRole.Manager,
    });
    if (!isManagerAuthenticeated) throw new Error(NO_PERMISSION_TO_UPDATE);

    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    const updateResult = await supabase
      .from("staff")
      .update({ role: updatedRole })
      .eq("id", staff.id);

    if (updateResult.error) throw new Error(ERROR_WHEN_UPDATE);

    const updateAdminResult = await supabaseAdmin.auth.admin.updateUserById(
      staff.id,
      {
        user_metadata: { role: updatedRole },
      }
    );

    await saveToLog({
      logName: "Cập nhật nhân viên thành " + updatedRole,
      logType: Log.Update,
      logResult:
        !updateResult.error && !updateAdminResult ? Log.Success : Log.Fail,
      logActor: actor,
    });

    revalidatePath("/dashboard/staff");

    return buildResponse({
      status: updateResult.status,
      statusText: updateResult.statusText,
      data: updateResult.data,
      error: null,
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

export async function updateCustomerToStaff({
  customer,
  role,
  actor,
}: {
  customer: CustomerType;
  role: StaffRole;
  actor: LogActorType;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: StaffRole.Manager,
    });
    if (!isManagerAuthenticated) throw new Error(NO_PERMISSION_TO_UPDATE);

    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    const orders = await supabase
      .from("order")
      .select("*")
      .eq("customer_id", customer.id);

    const hasOrders = orders?.data && orders?.data.length > 0;
    if (hasOrders) throw new Error("Khách hàng đang có đơn.");

    const customerResult = await supabase
      .from("customer")
      .select("*")
      .eq("id", customer.id)
      .single();

    const customerData = customerResult.data;
    if (!customerData) throw new Error(ERROR_WHEN_READ);

    await supabaseAdmin.auth.admin.updateUserById(customer.id, {
      user_metadata: { role: role },
    });

    await supabase.from("customer").delete().eq("id", customer.id);

    const result = await supabase
      .from("staff")
      .insert(customerToStaff(customerData, role));

    if (result.error) throw new Error(ERROR_WHEN_READ);

    revalidatePath("/dashboard/customer");
    revalidatePath("/dashboard/staff");

    await saveToLog({
      logName: "Cập nhật khách hàng " + customer.name + " thành nhân viên",
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
      error: error.message,
    });
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
    if (staff.id === OWNER_ID) throw new Error(NO_PERMISSION_TO_UPDATE);

    const isManagerAuthenticated = await checkRoleStaff({
      role: StaffRole.Manager,
    });
    if (!isManagerAuthenticated) throw new Error(NO_PERMISSION_TO_UPDATE);

    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createSupabaseAdmin();

    const staffResult = await supabase
      .from("staff")
      .select("*")
      .eq("id", staff.id)
      .single();

    const staffData = staffResult.data;

    if (!staffData) throw new Error(ERROR_WHEN_READ);

    await supabaseAdmin.auth.admin.updateUserById(staff.id, {
      user_metadata: { role: "Khách hàng" },
    });

    await supabase.from("staff").delete().eq("id", staff.id);

    const result = await supabase
      .from("customer")
      .insert(staffToCustomer(staffData));

    if (result.error) throw new Error(ERROR_WHEN_UPDATE);

    revalidatePath("/dashboard/customer");
    revalidatePath("/dashboard/staff");

    await saveToLog({
      logName: "Cập nhật nhân viên " + staff.name + " thành khách hàng",
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
      error: error.message,
    });
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
    const isAuthenticated = await checkRoleAuthenticated();
    if (!isAuthenticated) throw new Error(UNAUTHENTICATED_USER);

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

    if (result.error) throw new Error(ERROR_WHEN_UPDATE);

    revalidatePath("/profile");

    await supabaseAdmin.auth.admin.updateUserById(updatedUser.id, {
      user_metadata: { name: updatedUser.name, phone: updatedUser.phone },
    });

    await saveToLog({
      logName: "Cập nhật tài khoản " + updatedUser.name,
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
      error: error.message,
    });
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

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
      data: result.data as StaffType[],
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
      .neq("name", "Khách hàng qua điện thoại");

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
      data: result.data as CustomerType[],
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
    const isManagerAuthenticated = await checkRoleStaff({
      role: StaffRole.Manager,
    });
    const isSellerAuthenticated = await checkRoleStaff({
      role: StaffRole.Manager,
    });

    if (!isManagerAuthenticated && !isSellerAuthenticated) {
      throw new Error(NO_PERMISSION_TO_UPDATE);
    }

    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("customer")
      .update({ level: newLevel })
      .eq("id", customer.id);

    if (result.error) throw new Error(ERROR_WHEN_UPDATE);

    revalidatePath("/dashboard/customer");

    await saveToLog({
      logName:
        "Cập nhật điểm khách hàng " + customer.name + " thành " + newLevel,
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
      error: error.message,
    });
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
    const isAuthenticated = await checkRoleAuthenticated();
    if (!isAuthenticated) throw new Error(UNAUTHENTICATED_USER);

    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from(table)
      .update({ image: newImage })
      .eq("id", id);

    if (result.error) throw new Error(ERROR_WHEN_UPDATE);

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

// Check role functions

export async function checkRoleAuthenticated() {
  try {
    const session = await readUserSession();

    if (session.data?.data) return true;
  } catch (error: any) {
    return false;
  }
}

export async function checkRoleCustomer() {
  try {
    const session = await readUserSession();
    const customerSession = session.data?.detailData as CustomerType;

    if (customerSession && "level" in customerSession) return true;
  } catch (error: any) {
    return false;
  }
}

export async function checkRoleStaff({ role }: { role: StaffRole }) {
  try {
    const session = await readUserSession();
    const staffSession = session.data?.detailData as StaffType;

    if (staffSession && "role" in staffSession && staffSession.role === role)
      return true;
  } catch (error: any) {
    return false;
  }
}

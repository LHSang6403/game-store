"use server";

import type { CustomerType, StaffType } from "@utils/types";
import createSupabaseServerClient from "@supabase/server";
import { revalidatePath } from "next/cache";

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.getSession();

  if (!result?.data?.session) return { data: null, error: "No session" };
  const userMetadataRole = result?.data?.session?.user?.user_metadata?.role;
  const userId = result?.data?.session?.user?.id;

  if (userMetadataRole === "Staff") {
    const staffResult = await supabase
      .from("staff")
      .select("*")
      .eq("id", userId);

    return {
      ...(result as { data: any; error: any }),
      detailData: (staffResult.data?.[0] as StaffType) || null,
    };
  } else {
    const customerResult = await supabase
      .from("customer")
      .select("*")
      .eq("id", userId);

    return {
      ...(result as { data: any; error: any }),
      detailData: (customerResult.data?.[0] as CustomerType) || null,
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
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("staff")
    .update({ role: updatedRole })
    .eq("id", id);

  console.log(id, updatedRole, data, error);
  if (!error) revalidatePath("/dashboard/staff");

  return { data, error };
}

export async function updateToStaff(
  id: string,
  role: "Staff" | "Writer" | "Manager"
) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.admin.updateUserById(id, {
    user_metadata: { role: role },
  });

  // check has any order?

  // remove user from customer table

  // add user to staff table

  return result;
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
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from(role.toLowerCase())
    .update(updatingData)
    .eq("id", id);

  if (!result.error) revalidatePath("/profile");

  return result;
}

export async function readStaffs({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from("staff").select("*").range(offset, limit);

  return result as { data: StaffType[]; error: any };
}

export async function readCustomers({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("customer")
    .select("*")
    .range(offset, limit);

  return result as { data: CustomerType[]; error: any };
}

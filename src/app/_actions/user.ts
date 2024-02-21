"use server";

import type {
  CustomerType,
  AdminType,
  StaffType,
  WriterType,
} from "@utils/types";
import createSupabaseServerClient from "@supabase/server";

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.getSession();

  if (!result?.data?.session) return null;
  const data = await readRoleTableById(result.data.session.user.id);

  return { ...result, data };
}

// ask if this is the right way to do it
export async function readRoleTableById(
  id: string
): Promise<CustomerType | AdminType | StaffType | WriterType | null> {
  const supabase = await createSupabaseServerClient();
  const tables = ["customer", "admin", "staff", "writer"];

  for (const table of tables) {
    const { data } = await supabase.from(table).select("*").eq("id", id);

    if (data && data.length > 0) {
      const rowData = data[0];
      let resultData: CustomerType | AdminType | StaffType | WriterType;

      if (table === "customer") {
        resultData = rowData as CustomerType;
      } else if (table === "admin") {
        resultData = rowData as AdminType;
      } else if (table === "staff") {
        resultData = rowData as StaffType;
      } else {
        resultData = rowData as WriterType;
      }

      return resultData;
    }
  }

  return null;
}

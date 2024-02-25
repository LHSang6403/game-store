"use server";

import type { CustomerType, StaffType } from "@utils/types";
import createSupabaseServerClient, {
  createSupabaseAdmin,
} from "@supabase/server";

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.getSession();

  if (!result?.data?.session) return null;
  // get customer/ staff table data

  return { ...result };
}

export async function updateToStaff(
  id: string,
  role: "Staff" | "Writer" | "Manager"
) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.admin.updateUserById(id, {
    user_metadata: { role: role },
  });

  // remove user from customer table

  // add user to staff table

  return result;
}

// ask if this is the right way to do it
// export async function readRoleTableById(
//   id: string
// ): Promise<CustomerType | StaffType | null> {
//   const supabase = await createSupabaseServerClient();
//   const tables = ["customer", "staff", "writer"];

//   for (const table of tables) {
//     const { data } = await supabase.from(table).select("*").eq("id", id);

//     if (data && data.length > 0) {
//       const rowData = data[0];
//       let resultData: CustomerType | StaffType;

//       if (table === "customer") {
//         resultData = rowData as CustomerType;
//       } else {
//         resultData = rowData as StaffType;
//       }

//       return resultData;
//     }
//   }

//   return null;
// }

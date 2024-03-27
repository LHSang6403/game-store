"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import convertToTimestampz from "@utils/functions/dateToTimestampz";

export async function signUpWithEmailAndPassword({
  name,
  phone,
  dob,
  address,
  ward,
  district,
  province,
  email,
  password,
}: {
  name: string;
  phone: string;
  dob: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  email: string;
  password: string;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const createResult = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          phone: phone,
          role: "Customer", // by default
        },
      },
    });

    // store more data in customer table
    const createdUserId = createResult?.data?.user?.id;

    if (createdUserId) {
      const customerObject = {
        id: createdUserId,
        name: name,
        email: email,
        phone: phone,
        dob: convertToTimestampz(dob),
        address: address,
        ward: ward,
        district: district,
        province: province,
        level: 0,
        image:
          "user_images/defaultAvatar/avatar.jpg",
      };

      const customerInsertResult = await supabase
        .from("customer")
        .insert(customerObject);
    }

    return createResult;
  } catch {
    return { data: null, error: "Failed to sign up." };
  }
}

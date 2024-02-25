"use server";

import createSupabaseServerClient from "@supabase/server";
import type { CustomerType } from "@utils/types";

export async function signUpWithEmailAndPassword({
  name,
  phone,
  address,
  email,
  password,
}: {
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
}) {
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
      address: address,
      level: 0,
      image: "",
    };

    const customerCreated = await supabase
      .from("customer")
      .insert(customerObject);

    console.log(customerObject, customerCreated);
  }

  return createResult;
}

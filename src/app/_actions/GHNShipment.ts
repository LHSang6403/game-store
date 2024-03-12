"use server";

import axios from "axios";
import { GHNDataType } from "../(main)/cart/_actions";
import { revalidatePath } from "next/cache";
import { updateStateOrder } from "./order";

const headers = {
  "Content-Type": "application/json",
  ShopId: process.env.GHN_ID,
  Token: process.env.GHN_API_TOKEN,
};

export async function requestGHNOrder(data: GHNDataType) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "/shipping-order/create",
      data,
      { headers }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function calGHNFees(params: any) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "/shipping-order/fee",
      params,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function cancelGHNOrder({
  id,
  order_codes,
}: {
  id: string;
  order_codes: string[];
}) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "/switch-status/cancel",
      { order_codes: order_codes },
      { headers }
    );

    console.log("Cancel GHN Order Response:", response.data);

    if (response?.data?.code === 200) {
      await updateStateOrder({
        id: id,
        state: "canceled",
      });
    }

    revalidatePath("/cart");

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getGHNOrder({ order_codes }: { order_codes: string[] }) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "switch-status/return",
      { order_codes: [order_codes] },
      { headers }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function printGHNOrder({
  order_codes,
  size,
}: {
  order_codes: string[];
  size: "A5" | "80x80" | "52x70";
}) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "/a5/gen-token",
      { order_codes: order_codes },
      { headers }
    );

    const printResponse = await axios.get(
      process.env.GHN_PRINT_URL + size + "?token=" + response.data.data.token,
      { headers }
    );

    return printResponse.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

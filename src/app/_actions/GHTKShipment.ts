"use server";

import axios from "axios";
import { updateStateOrder } from "./order";
import type { OrderFeesParams } from "@/app/(main)/cart/Components/Summary/types";

export async function requestOrder({
  products,
  order,
}: {
  products: unknown;
  order: unknown;
}) {
  try {
    const requestData = {
      products: products,
      order: order,
    };

    const requestDataString = JSON.stringify(requestData);

    const headers = {
      Token: process.env.GHTK_API_TOKEN,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      process.env.GHTK_URL + "/services/shipment/order",
      requestDataString,
      { headers }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOrder(label: string): Promise<any> {
  try {
    const response = await fetch(
      process.env.GHTK_URL + "/services/shipment/v2/$" + label,
      {
        method: "GET",
        headers: { Token: `${process.env.GHTK_API_TOKEN}` },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}

export async function getOrderStatus(label: string) {
  try {
    const response = await fetch(
      process.env.GHTK_URL + "/services/shipment/v2/" + label,
      {
        method: "GET",
        headers: { Token: `${process.env.GHTK_API_TOKEN}` },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}

export async function getShipmentFees({ params }: { params: OrderFeesParams }) {
  try {
    const queryParams = parseOrderFeesParams(params).toString();
    const response = await axios.get(
      process.env.GHTK_URL + "/services/shipment/fee?" + queryParams,
      {
        headers: {
          Token: `${process.env.GHTK_API_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to get shipment fee");
  }
}

export async function cancelOrder({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  try {
    const response = await axios.post(
      process.env.GHTK_URL + "/services/shipment/cancel/" + label,
      {},
      {
        headers: {
          Token: process.env.GHTK_API_TOKEN,
        },
      }
    );

    if (response.data.success) {
      const updateResult = await updateStateOrder({
        id: id,
        state: "canceled",
      });
      console.log("---- update result", updateResult);
    }

    return response;
  } catch (error) {
    return error;
  }
}

function parseOrderFeesParams(params: OrderFeesParams): URLSearchParams {
  const {
    pick_province,
    pick_district,
    pick_ward,
    pick_address,
    province,
    district,
    ward,
    address,
    weight,
    value,
    deliver_option,
  } = params;

  const searchParams = new URLSearchParams();
  searchParams.set("pick_province", pick_province);
  searchParams.set("pick_district", pick_district);
  searchParams.set("pick_ward", pick_ward);
  searchParams.set("pick_address", pick_address);
  searchParams.set("province", province);
  searchParams.set("district", district);
  searchParams.set("ward", ward);
  searchParams.set("address", address);
  searchParams.set("weight", weight.toString());
  searchParams.set("value", value.toString());
  searchParams.set("deliver_option", deliver_option);

  return searchParams;
}

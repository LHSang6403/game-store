"use server";

import axios from "axios";
import { updateStateOrder } from "./order";

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

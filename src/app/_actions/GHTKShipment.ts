"use server";

import axios from "axios";
import { updateStateOrder } from "@app/_actions/order";
import { GHTKDataType } from "@/app/(main)/cart/_actions/calShip";
import { revalidatePath } from "next/cache";
import { LogActorType } from "@app/_actions/log";

export async function requestGHTKOrder(data: GHTKDataType) {
  try {
    const headers = {
      Token: process.env.GHTK_API_TOKEN,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      process.env.GHTK_URL + "/services/shipment/order",
      data,
      { headers }
    );

    return {
      status: response?.data?.success ? 200 : 500,
      statusText: response?.data?.message,
      data: response?.data?.order,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      data: null,
      error: error.message,
    };
  }
}

export async function getGHTKOrder(label: string): Promise<any> {
  try {
    const response = await fetch(
      process.env.GHTK_URL + "/services/shipment/v2/$" + label,
      {
        method: "GET",
        headers: { Token: `${process.env.GHTK_API_TOKEN}` },
      }
    );

    const responseData = await response.json();

    return {
      status: responseData.data.success ? 200 : 500,
      statusText: responseData.data.message,
      data: responseData.data.order,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      data: null,
      error: error.message,
    };
  }
}

export async function getGHTKOrderStatus(label: string) {
  try {
    const response = await fetch(
      process.env.GHTK_URL + "/services/shipment/v2/" + label,
      {
        method: "GET",
        headers: { Token: `${process.env.GHTK_API_TOKEN}` },
      }
    );

    const responseData = await response.json();

    return {
      status: responseData.success ? 200 : 500,
      statusText: responseData.message,
      data: responseData.message,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      data: null,
      error: error.message,
    };
  }
}

export async function calGHTKFees(params: any) {
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

    return {
      status: response.data.success ? 200 : 500,
      statusText: response.data.message,
      data: {
        service_fee: response.data.fee?.ship_fee_only,
        insurance_fee: response.data.fee?.insurance_fee,
      },
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      data: null,
      error: error.message,
    };
  }
}

export async function cancelGHTKOrder({
  id,
  label,
  actor,
}: {
  id: string;
  label: string;
  actor: LogActorType;
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
        actor: actor,
      });
    }

    revalidatePath("/cart");

    return {
      status: response.data.success ? 200 : 500,
      statusText: response.data.message,
      data: response.data.message,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      data: null,
      error: error.message,
    };
  }
}

function parseOrderFeesParams(params: any): URLSearchParams {
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

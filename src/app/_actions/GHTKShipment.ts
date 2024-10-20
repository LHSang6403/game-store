"use server";

import axios from "axios";
import { updateStateOrder } from "@app/_actions/order";
import { GHTKDataType } from "@/app/(main)/cart/_actions/processGHTK";
import { revalidatePath } from "next/cache";
import { OrderType, LogActorType } from "@/utils/types";
import { buildResponse } from "@/utils/functions/buildResponse";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";

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

    return buildResponse({
      status: response?.data?.success
        ? ApiStatusNumber.Success
        : ApiStatusNumber.InternalServerError,
      statusText: response?.data?.message,
      data: response?.data?.order,
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

    return buildResponse({
      status: responseData.data.success
        ? ApiStatusNumber.Success
        : ApiStatusNumber.InternalServerError,
      statusText: responseData.data.message,
      data: responseData.data.order,
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

    return buildResponse({
      status: responseData.success
        ? ApiStatusNumber.Success
        : ApiStatusNumber.InternalServerError,
      statusText: responseData.message,
      data: responseData.message,
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

    return buildResponse({
      status: response.data.success
        ? ApiStatusNumber.Success
        : ApiStatusNumber.InternalServerError,
      statusText: response.data.message,
      data: {
        service_fee: response.data.fee?.ship_fee_only,
        insurance_fee: response.data.fee?.insurance_fee,
      },
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

export async function cancelGHTKOrder({
  order,
  label,
  actor,
}: {
  order: OrderType;
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
      await updateStateOrder({
        order: order,
        state: "Đã hủy",
        actor: actor,
      });

      revalidatePath("/cart");

      return buildResponse({
        status: response.data.success
          ? ApiStatusNumber.Success
          : ApiStatusNumber.InternalServerError,
        statusText: response.data.message,
        data: response.data.message,
        error: null,
      });
    }

    throw new Error("Hủy đơn không thành công");
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error.message,
    });
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

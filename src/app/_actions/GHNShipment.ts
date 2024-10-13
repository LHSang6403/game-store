"use server";

import axios from "axios";
import { GHNDataType } from "@/app/(main)/cart/_actions/processGHN";
import { revalidatePath } from "next/cache";
import { updateStateOrder } from "@app/_actions/order";
import { OrderType, LogActorType } from "@/utils/types";
import removeLeadingZeroAfterSpace from "@utils/functions/removeLeadingZeroAfterSpace";
import { buildResponse } from "@/utils/functions/buildResponse";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";

const headers = {
  "Content-Type": "application/json",
  ShopId: process.env.GHN_ID,
  Token: process.env.GHN_API_TOKEN,
};

export async function findGHNWardIDByNameExtension(
  to_district_id: number,
  name: string
) {
  try {
    const wardsInDistrict = await axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      { district_id: to_district_id },
      {
        headers,
      }
    );

    if (!wardsInDistrict.data.data) throw new Error("Lỗi xác định phường.");

    const cleanName = removeLeadingZeroAfterSpace(name);

    const wards = wardsInDistrict.data.data;
    for (const item of wards) {
      const ward = item.NameExtension.find((extension) => {
        return extension.toString() === cleanName;
      });
      if (ward) {
        return item.WardCode;
      }
    }

    throw new Error("Không tìm thấy phường.");
  } catch (error: any) {
    return error;
  }
}

export async function requestGHNOrder(data: GHNDataType) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "/shipping-order/create",
      data,
      {
        headers,
      }
    );

    return buildResponse({
      status: response?.data?.code,
      statusText: response?.data?.message_display,
      data: response?.data?.data,
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

export async function calGHNFees(params: any) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "/shipping-order/fee",
      params,
      {
        headers,
      }
    );

    return buildResponse({
      status: response?.data?.code,
      statusText: response?.data?.message,
      data: response?.data?.data,
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

export async function cancelGHNOrder({
  order,
  order_codes,
  actor,
}: {
  order: OrderType;
  order_codes: string[];
  actor: LogActorType;
}) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "/switch-status/cancel",
      { order_codes: order_codes },
      { headers }
    );

    if (response.data.code === ApiStatusNumber.Success) {
      await updateStateOrder({
        order: order,
        state: "Đã hủy",
        actor: actor,
      });

      revalidatePath("/cart");

      return buildResponse({
        status: response.data.code,
        statusText: response.data.message,
        data: response.data.data,
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

export async function getGHNOrder({ order_codes }: { order_codes: string[] }) {
  try {
    const response = await axios.post(
      process.env.GHN_URL + "switch-status/return",
      { order_codes: [order_codes] },
      { headers }
    );

    return buildResponse({
      status: response?.data?.code,
      statusText: response?.data?.message,
      data: response?.data?.data,
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

    return buildResponse({
      status: ApiStatusNumber.Success,
      statusText: ApiStatus.Success,
      data: printResponse?.data,
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

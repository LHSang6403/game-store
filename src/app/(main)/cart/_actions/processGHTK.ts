import type { OrderType } from "@/utils/types";
import { generate } from "randomstring";
import { requestGHTKOrder } from "@/app/_actions/GHTKShipment";

export interface GHTKDataType {
  order: {
    id: string;
    pick_name: string;
    pick_province: string;
    pick_district: string;
    pick_ward: string;
    pick_address: string;
    pick_tel: string;
    tel: string;
    name: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    hamlet: string;
    is_freeship: string;
    pick_money: number;
    note: string;
    value: number;
    pick_option: string;
    email: string;
    return_email: string;
  };
  products: { name: string; quantity: number; weight: number }[];
}

export async function processOrderGHTK({
  formData,
  order,
}: {
  formData: any;
  order: OrderType;
}) {
  try {
    const ghtkData: GHTKDataType = {
      order: {
        id: order.id || generate(12),
        pick_name: "Game store HCM",
        pick_tel: "0922262456",
        pick_address: order.pick_address,
        pick_ward: order.pick_ward,
        pick_district: order.pick_district,
        pick_province: order.pick_province,
        name: formData.name,
        tel: formData.phone,
        address: formData.address,
        ward: formData.ward,
        district: formData.district,
        province: formData.province,
        hamlet: "Khác",
        is_freeship: "1",
        pick_money: 0,
        note: order?.note ?? "Không",
        value: order?.price || 0,
        pick_option: "cod",
        email: "user@gmail.com",
        return_email: "gamestorevn2024@gmail.com",
      },
      products: order.products.map((prod) => ({
        name: prod.product.name,
        quantity: 1,
        weight: 0.4, // Kg
      })),
    };

    const ghtkOrderResult = await requestGHTKOrder(ghtkData);

    return {
      status: ghtkOrderResult?.status,
      statusText: ghtkOrderResult?.statusText,
      data: ghtkOrderResult?.data,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: error.message,
      data: null,
      error: error.message,
    };
  }
}

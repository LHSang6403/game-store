import { OrderType } from "@/utils/types";
import { requestGHNOrder } from "@/app/_actions/GHNShipment";
import axios from "axios";

import districts from "@/static-data/GHN-api/districts.json";

export interface GHNDataType {
  required_note: string;
  from_name: string;
  from_phone: string;
  from_address: string;
  from_ward_name: string;
  from_district_name: string;
  from_province_name: string;
  to_name: string;
  to_phone: string;
  to_address: string;
  to_ward_code: string;
  to_district_id: number;
  weight: number;
  service_id: number;
  service_type_id: number;
  payment_type_id: number;
  coupon: any;
  items: { name: string; quantity: number; weight: number }[];
}

function findGHNDistrictIDByNameExtension(jsonData: any, name: string) {
  for (const item of jsonData) {
    if (item && "NameExtension" in item) {
      const district = item.NameExtension.find((extension) => {
        return extension.toString() === name;
      });
      if (district) {
        return item.DistrictID;
      }
    }
  }
  return null;
}

async function findGHNWardIDByNameExtension(
  to_district_id: number,
  name: string
) {
  try {
    const wardsInDistrict = await axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      { district_id: to_district_id },
      {
        headers: {
          "Content-Type": "application/json",
          Token:
            process.env.GHN_API_TOKEN ?? "6877003a-dd62-11ee-a6e6-e60958111f48",
        },
      }
    );

    if (!wardsInDistrict.data.data) throw new Error("Lỗi xác định phường.");

    const wards = wardsInDistrict.data.data;
    for (const item of wards) {
      const ward = item.NameExtension.find((extension) => {
        return extension.toString() === name;
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

export async function processOrderGHN({
  formData,
  order,
}: {
  formData: any;
  order: OrderType;
}) {
  try {
    const to_district_id = findGHNDistrictIDByNameExtension(
      districts,
      formData?.district
    );

    const to_ward_code = await findGHNWardIDByNameExtension(
      to_district_id,
      formData?.ward
    );

    if (!to_district_id || !to_ward_code)
      throw new Error("Không hỗ trợ địa chỉ giao hàng.");

    const ghnData: GHNDataType = {
      required_note: "KHONGCHOXEMHANG",
      from_name: "Game store HCM",
      from_phone: "0922262456",
      from_address: order.pick_address,
      from_ward_name: order.pick_ward,
      from_district_name: order.pick_district,
      from_province_name: order.pick_province,
      to_name: formData.name,
      to_phone: formData.phone,
      to_address: formData.address,
      to_ward_code: to_ward_code.toString(),
      to_district_id: to_district_id,
      weight: 400,
      service_id: 0,
      service_type_id: 2,
      payment_type_id: 1,
      coupon: null,
      items: order.products.map((prod) => ({
        name: prod.product.name,
        quantity: 1,
        weight: 400, // Gram
      })),
    };

    // **** bug can not create an order here ****

    console.log(ghnData);

    const ghnOrderResult = await requestGHNOrder(ghnData);

    return {
      status: ghnOrderResult?.status,
      statusText: ghnOrderResult?.statusText,
      data: ghnOrderResult?.data,
      error: null,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      status: 500,
      statusText: error.message,
      data: null,
      error: error.message,
    };
  }
}

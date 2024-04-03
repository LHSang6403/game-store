import type { CustomerType, OrderType } from "@/utils/types";
import { generate } from "randomstring";
import type { ShipmentNameType } from "@/utils/types";
import { calGHNFees, requestGHNOrder } from "@/app/_actions/GHNShipment";
import { calGHTKFees, requestGHTKOrder } from "@/app/_actions/GHTKShipment";
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
  coupon: null | any;
  items: { name: string; quantity: number; weight: number }[];
}

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

export async function processOrderWithGHN({
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
      to_address: formData?.address,
      to_ward_code: to_ward_code.toString(),
      to_district_id: to_district_id,
      weight: order.weight || 100,
      service_id: 0,
      service_type_id: 2,
      payment_type_id: 1,
      coupon: null,
      items: order.products.map((prod) => ({
        name: prod.product.name,
        quantity: 1,
        weight: 1,
      })),
    };

    const ghnOrderResult = await requestGHNOrder(ghnData);

    return {
      status: ghnOrderResult?.status,
      statusText: ghnOrderResult?.statusText,
      data: ghnOrderResult?.data,
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

export async function processOrderWithGHTK({
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
        email: "test@gmail.com",
        return_email: "test2@gmail.com",
      },
      products: order.products.map((prod) => ({
        name: prod.product.name,
        quantity: 1,
        weight: 1,
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

export async function calShipmentFees({
  formData,
  order,
}: {
  formData: any;
  order: OrderType;
}) {
  switch (formData.shipment as ShipmentNameType) {
    case "GHN":
      const shipFeesRequestGHN = {
        from_district_id: 1444,
        from_ward_code: "20301",
        service_id: 53320,
        service_type_id: null,
        to_district_id: 1443,
        to_ward_code: "20211",
        height: 50,
        length: 20,
        weight: 300,
        width: 20,
        insurance_value: 0,
        cod_failed_amount: 2000,
      };

      const responseGHN = await calGHNFees(shipFeesRequestGHN);

      return {
        status: responseGHN?.status,
        statusText: responseGHN?.statusText,
        data: {
          service_fee: responseGHN?.data?.service_fee,
          insurance_fee: responseGHN?.data?.insurance_fee,
        },
        error: null,
      };

    case "GHTK":
      const shipFeesRequestGHTK = {
        pick_province: "TP. Hồ Chí Minh",
        pick_district: "Quận 3",
        pick_ward: "Phường 1",
        pick_address: "590 CMT8 P.11",
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        address: formData.address,
        weight: 300,
        value: order?.price || 0,
        deliver_option: "xteam",
      };

      const responseGHTK = await calGHTKFees(shipFeesRequestGHTK);

      if (!responseGHTK.data) throw new Error("Lỗi khi tính toán chi phí.");

      return {
        status: responseGHTK?.status,
        statusText: responseGHTK?.statusText,
        data: {
          service_fee: responseGHTK.data.service_fee,
          insurance_fee: responseGHTK.data.insurance_fee,
        },
        error: null,
      };
  }

  return {
    status: 500,
    statusText: "Unknown shipment type.",
    data: undefined,
    error: "Unknown shipment type.",
  };
}

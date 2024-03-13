import type { CustomerType, OrderType } from "@/utils/types";
import { generate } from "randomstring";
import type { ShipmentNameType } from "@/utils/types";
import { calGHNFees, requestGHNOrder } from "@/app/_actions/GHNShipment";
import { calGHTKFees, requestGHTKOrder } from "@/app/_actions/GHTKShipment";

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

export async function processOrderRequestData({
  formData,
  order,
  customerSession,
}: {
  formData: any;
  order: OrderType;
  customerSession: CustomerType;
}) {
  switch (formData.shipment as ShipmentNameType) {
    case "GHN":
      const ghnData: GHNDataType = {
        required_note: "KHONGCHOXEMHANG",
        from_name: "Game store HCM",
        from_phone: "0922262456",
        from_address: "590 CMT8 P.11",
        from_ward_name: "Phường 1",
        from_district_name: "Quận 3",
        from_province_name: "HCM",
        to_name: formData?.name || customerSession?.name || "Unknown",
        to_phone: formData?.phone || "0123456789",
        to_address: formData?.address || customerSession?.address || "Unknown",
        to_ward_code: "20308",
        to_district_id: 1444,
        weight: order.weight || 100,
        service_id: 0,
        service_type_id: 2,
        payment_type_id: 1,
        coupon: null,
        items: [
          ...order.products.map((prod) => ({
            name: prod.name,
            quantity: 1,
            weight: 1,
          })),
        ],
      };

      const ghnOrderResult = await requestGHNOrder(ghnData as GHNDataType);

      return {
        status: ghnOrderResult?.data.code,
        statusText: ghnOrderResult?.data.message,
        data: ghnOrderResult?.data,
        error: ghnOrderResult?.data.error,
      };

    case "GHTK":
      const ghtkData: GHTKDataType = {
        order: {
          id: order.id || generate(12),
          pick_name: "Game store HCM",
          pick_tel: "0922262456",
          pick_address: "590 CMT8 P.11",
          pick_ward: "Phường 1",
          pick_district: "Quận 3",
          pick_province: "TP. Hồ Chí Minh",
          name: formData?.name || customerSession?.name || "Unknown",
          tel: formData?.phone || "0123456789",
          address: formData?.address || customerSession?.address || "Unknown",
          ward: formData?.ward || customerSession?.ward || "Unknown",
          district:
            formData?.district || customerSession?.district || "Unknown",
          province:
            formData?.province || customerSession?.province || "Unknown",
          hamlet: "Khác",
          is_freeship: "1",
          pick_money: 0,
          note: order?.note ?? "Khong",
          value: order?.price || 0,
          pick_option: "cod",
          email: "test@gmail.com",
          return_email: "test2@gmail.com",
        },
        products: [
          ...order.products.map((prod) => ({
            name: prod.name,
            quantity: 1,
            weight: 1,
          })),
        ],
      };

      const ghtkOrderResult = await requestGHTKOrder(ghtkData as GHTKDataType);

      return {
        status: ghtkOrderResult?.success ? 200 : 500,
        statusText: ghtkOrderResult?.message,
        data: ghtkOrderResult?.data,
        error: ghtkOrderResult?.error,
      };
  }

  return {
    status: 500,
    statusText: "Unknown shipment type.",
    data: undefined,
    error: "Unknown shipment type.",
  };
}

export async function calShipmentFees({
  formData,
  order,
  customerSession,
}: {
  formData: any;
  order: OrderType;
  customerSession: CustomerType;
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
        status: responseGHN?.code,
        statusText: responseGHN?.message,
        data: {
          service_fee: responseGHN?.data?.service_fee,
          insurance_fee: responseGHN?.data?.insurance_fee,
        },
        error: responseGHN?.error,
      };

    case "GHTK":
      const shipFeesRequestGHTK = {
        pick_province: "TP. Hồ Chí Minh",
        pick_district: "Quận 3",
        pick_ward: "Phường 1",
        pick_address: "590 CMT8 P.11",
        province: formData?.province || customerSession?.province || "Unknown",
        district: formData?.district || customerSession?.district || "Unknown",
        ward: formData?.ward || customerSession?.ward || "Unknown",
        address: formData?.address || customerSession?.address || "Unknown",
        weight: 300,
        value: order?.price || 0,
        deliver_option: "xteam",
      };

      const responseGHTK = await calGHTKFees(shipFeesRequestGHTK);

      return {
        status: responseGHTK?.success === true ? 200 : 500,
        statusText: responseGHTK?.message,
        data: {
          service_fee: responseGHTK?.fee.ship_fee_only,
          insurance_fee: responseGHTK?.fee.insurance_fee,
        },
        error: responseGHTK?.error,
      };
  }

  return {
    status: 500,
    statusText: "Unknown shipment type.",
    data: undefined,
    error: "Unknown shipment type.",
  };
}

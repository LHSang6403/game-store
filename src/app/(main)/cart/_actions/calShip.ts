import type { OrderType } from "@/utils/types";
import type { ShipmentNameType } from "@/utils/types";
import {
  calGHNFees,
  findGHNWardIDByNameExtension,
} from "@/app/_actions/GHNShipment";
import { calGHTKFees } from "@/app/_actions/GHTKShipment";
import { findGHNDistrictIDByNameExtension } from "@app/(main)/cart/_actions/processGHN";

import districts from "@/static-data/GHN-api/districts.json";

export async function calShipmentFees({
  formData,
  order,
}: {
  formData: any;
  order: OrderType;
}) {
  try {
    switch (formData.shipment as ShipmentNameType) {
      case "GHN":
        const to_district_id: number = findGHNDistrictIDByNameExtension(
          districts,
          formData?.district
        );

        const to_ward_code: number = await findGHNWardIDByNameExtension(
          to_district_id,
          formData?.ward
        );

        const from_district_id: number = findGHNDistrictIDByNameExtension(
          districts,
          order.pick_district
        );

        const from_ward_code: number = await findGHNWardIDByNameExtension(
          from_district_id,
          order.pick_ward
        );

        if (!to_district_id || !to_ward_code)
          throw new Error("Không hỗ trợ địa chỉ giao hàng.");

        const shipFeesRequestGHN = {
          from_district_id: from_district_id,
          from_ward_code: from_ward_code.toString(),
          service_id: 53320,
          service_type_id: null,
          to_ward_code: to_ward_code.toString(),
          to_district_id: to_district_id,
          height: 50,
          length: 20,
          weight: 400 * order.products.length,
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
          pick_province: order.pick_province,
          pick_district: order.pick_district,
          pick_ward: order.pick_ward,
          pick_address: order.pick_address,
          province: formData.province,
          district: formData.district,
          ward: formData.ward,
          address: formData.address,
          weight: 0.4 * order.products.length,
          value: order?.price ?? 0,
          deliver_option: "none",
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
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error.message,
    };
  }
}

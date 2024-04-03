import type { OrderType } from "@/utils/types";
import type { ShipmentNameType } from "@/utils/types";
import { calGHNFees } from "@/app/_actions/GHNShipment";
import { calGHTKFees } from "@/app/_actions/GHTKShipment";

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

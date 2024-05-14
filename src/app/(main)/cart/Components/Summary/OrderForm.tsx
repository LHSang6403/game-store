"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form, FormLabel } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useSession, SessionState } from "@/zustand/useSession";
import { useOrder, OrderState } from "@/zustand/useOrder";
import type { CustomerType, StaffType } from "@utils/types";
import ConfirmDialog from "@app/(main)/cart/Components/Summary//ConfirmDialog";
import { useState, useEffect } from "react";
import useAddressSelects from "@/zustand/useAddressSelects";
import { calShipmentFees } from "@/app/(main)/cart/_actions/calShip";
import LocationDialog from "@app/(main)/cart/Components/Summary/LocationDialog";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { readStorages } from "@app/_actions/storage";
import { findAvailableStorage } from "@app/(main)/cart/_actions/findAvailbleStorage";
import OrderFormInputs from "@app/(main)/cart/Components/Summary/OrderFormInputs";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập tên." }),
  phone: z
    .string()
    .min(6, { message: "Vui lòng nhập số điện thoại di động hợp lệ" })
    .max(12, { message: "Vui lòng nhập số điện thoại di động hợp lệ" }),
  address: z
    .string()
    .min(2, { message: "Vui lòng nhập địa chỉ của bạn để giao hàng." }),
  ward: z
    .string()
    .min(2, { message: "Vui lòng chọn địa chỉ của bạn để giao hàng." }),
  district: z.string().min(2, { message: "Vui lòng chọn địa chỉ của bạn." }),
  province: z.string().min(2, { message: "Vui lòng chọn địa chỉ của bạn." }),
  shipment: z.string().min(2, { message: "Vui lòng chọn tên dịch vụ." }),
  note: z.string().nullable(),
});

export default function OrderForm() {
  const { order, setPrices, setNewID } = useOrder() as OrderState;
  const { session } = useSession() as SessionState;
  const customerSession = session as CustomerType;
  const { addressValues } = useAddressSelects();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  const { data: storages } = useQuery({
    queryKey: ["storages", "all"],
    queryFn: () => readStorages(),
    staleTime: 60 * (60 * 1000),
  });

  const [content, setContent] = useLocalStorage("storage", {
    name: "Miền Trung & Nam",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: customerSession?.name,
      phone: customerSession?.phone,
      address: customerSession?.address,
      ward: addressValues?.commune,
      district: addressValues?.district,
      province: addressValues?.province,
      shipment: "GHTK",
      note: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (addressValues) {
      form.setValue("province", addressValues.province);
      form.setValue("district", addressValues.district);
      form.setValue("ward", addressValues.commune);
    }
    form.trigger("ward");
  }, [addressValues]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (order) {
      toast.promise(
        async () => {
          if (!customerSession)
            throw new Error("Không tìm thấy thông tin khách hàng.");

          const staffSession = session as StaffType;
          if ("role" in staffSession)
            throw new Error("Nhân viên không thể mua hàng.");

          // set enough info to useOrder's state
          order.address = form.getValues().address;
          order.ward = form.getValues().ward;
          order.district = form.getValues().district;
          order.province = form.getValues().province;

          const clientArea = JSON.parse(
            window.localStorage.getItem("storage") ?? ""
          ).name;

          // decide the suitable storage for pick all products
          const suitablePickStorage = findAvailableStorage({
            order: order,
            clientArea: clientArea,
            allStorages: storages?.data ?? [],
          });

          if (!suitablePickStorage)
            throw new Error("Hệ thống kho không cung cấp đủ.");

          order.pick_address = suitablePickStorage?.address;
          order.pick_ward = suitablePickStorage?.ward;
          order.pick_district = suitablePickStorage?.district;
          order.pick_province = suitablePickStorage?.province;
          order.pick_storage_id = suitablePickStorage?.id;

          order.customer_id = customerSession.id;
          order.customer_name = form.getValues().name;
          order.customer_phone = form.getValues().phone;

          const calFees = await calShipmentFees({
            formData: data,
            order: order,
          });

          if (!calFees?.data?.service_fee)
            throw new Error("Tính toán thất bại, vui lòng thử lại.");

          setPrices(
            calFees?.data?.service_fee,
            calFees?.data?.insurance_fee ?? 0
          );
          setNewID();

          setIsConfirmDialogOpen(true);
        },
        {
          loading: "Đang ước tính chi phí...",
          error: (error: any) => {
            return error.message;
          },
        }
      );
    }
  }

  // location dialog
  useEffect(() => {
    if (!window.localStorage.getItem("storage")) {
      if (order) {
        const timeoutToShow = setTimeout(() => {
          setIsLocationDialogOpen(true);
        }, 2000);

        const timeoutToHide = setTimeout(() => {
          setIsLocationDialogOpen(false);

          // set default if user not select
          if (!window.localStorage.getItem("storage")) {
            setContent({
              name: "Miền Trung & Nam",
            });
          }
        }, 5000);

        return () => {
          clearTimeout(timeoutToShow);
          clearTimeout(timeoutToHide);
        };
      }
    }
  }, []);

  return (
    <>
      {order && (
        <div className="flex h-fit w-full flex-col gap-2 rounded-md border px-3 py-2 pb-4">
          <h2 className="text-lg font-semibold">Đơn hàng của bạn</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-2 gap-3 sm:grid-cols-1"
            >
              <OrderFormInputs form={form} />
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className="mt-3 w-full bg-foreground text-background"
              >
                Ước lượng giá
              </Button>
              <div>
                {window.localStorage.getItem("storage") && (
                  <div className="mt-1 flex h-full flex-col items-start justify-center gap-1">
                    <FormLabel>
                      Khu vực:{" "}
                      {
                        JSON.parse(window.localStorage.getItem("storage") ?? "")
                          .name
                      }
                    </FormLabel>
                    <div
                      onClick={() =>
                        setIsLocationDialogOpen(!isLocationDialogOpen)
                      }
                      className="text-sm font-normal underline hover:cursor-pointer"
                    >
                      Thay đổi
                    </div>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </div>
      )}
      {order && customerSession && (
        <ConfirmDialog
          formData={form.getValues()}
          order={order}
          isOpen={isConfirmDialogOpen}
          onOpenChange={() => {
            setIsConfirmDialogOpen(!isConfirmDialogOpen);
          }}
        />
      )}
      <>
        <LocationDialog
          isOpen={isLocationDialogOpen}
          onOpenChange={() => setIsLocationDialogOpen(!isLocationDialogOpen)}
        />
      </>
    </>
  );
}

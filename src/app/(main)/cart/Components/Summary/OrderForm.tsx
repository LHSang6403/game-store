"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useSession } from "@/zustand/useSession";
import { useOrder } from "@/zustand/useOrder";
import type { CustomerType, StaffType } from "@utils/types";
import ConfirmDialog from "./ConfirmDialog";
import { useState, useEffect } from "react";
import FormAddressPicker from "@components/Picker/Address/FormAddressPicker";
import useAddressSelects from "@/zustand/useAddressSelects";
import SelectShipmentForm from "./SelectShipmentForm";
import { calShipmentFees } from "@/app/(main)/cart/_actions/calShip";
import LocationDialog from "@app/(main)/cart/Components/Summary/LocationDialog";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { readStorages } from "@app/_actions/storage";
import { findAvailableStorage } from "@app/(main)/cart/_actions/findAvailbleStorage";

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
  province: z.string().min(5, { message: "Vui lòng chọn địa chỉ của bạn." }),
  shipment: z.string().min(2, { message: "Vui lòng chọn tên dịch vụ." }),
  note: z.string().nullable(),
});

export default function OrderForm() {
  const { order, setPrices, setNewID } = useOrder();
  const { session } = useSession();
  const customerSession = session as CustomerType;
  const { addressValues } = useAddressSelects();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  const { data: storages } = useQuery({
    queryKey: ["storages", "all"],
    queryFn: () => readStorages(),
    staleTime: 1000 * 60 * 60,
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

          setPrices(calFees?.data?.service_fee, calFees?.data?.insurance_fee);
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tên khách hàng"
                        {...field}
                        type="text"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Số liên hệ"
                        {...field}
                        type="text"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={() => (
                  <FormItem>
                    <FormLabel>Tỉnh, huyện, phường</FormLabel>
                    <FormControl>
                      <FormAddressPicker />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú thêm</FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-44 min-h-28 border-[#E5E7EB]"
                        placeholder="Ghi chú..."
                        {...field}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Số nhà, tên đường"
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipment"
                render={() => (
                  <FormItem>
                    <FormLabel>Dịch vụ giao hàng</FormLabel>
                    <FormControl>
                      <SelectShipmentForm
                        onChange={(value) => {
                          form.setValue("shipment", value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
          onOpenChange={() => setIsConfirmDialogOpen(!isConfirmDialogOpen)}
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

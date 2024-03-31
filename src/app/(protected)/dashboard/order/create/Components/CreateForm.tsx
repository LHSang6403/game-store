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
import { useOrder } from "@/zustand/useOrder";
import type {
  CustomerType,
  ShipmentNameType,
  ProductWithDescriptionAndStorageType,
} from "@utils/types";
import { useState, useEffect } from "react";
import FormAddressPicker from "@components/Picker/Address/FormAddressPicker";
import useAddressSelects from "@/zustand/useAddressSelects";
import SelectShipmentForm from "@app/(main)/cart/Components/Summary/SelectShipmentForm";
import { calShipmentFees } from "@app/(main)/cart/_actions/index";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formatCurrency from "@/utils/functions/formatCurrency";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "@app/(main)/cart/Components/Summary/Columns";
import ProductCard from "@app/(protected)/dashboard/order/create/Components/ProductCard";
import { ApiErrorHandlerClient } from "@utils/errorHandler/apiErrorHandler";
import ConfirmDialog from "@app/(main)/cart/Components/Summary/ConfirmDialog";

import province from "@/static-data/provinces.json";
import district from "@/static-data/districts.json";
import communes from "@/static-data/communes.json";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Vui lòng nhập tên." }),
  phone: z
    .string()
    .min(6, { message: "Vui lòng nhập số điện thoại đúng." })
    .max(12, { message: "Vui lòng nhập số điện thoại đúng." }),
  address: z.string().min(2, { message: "Vui lòng nhập địa chỉ." }),
  ward: z.string().min(2, { message: "Vui lòng nhập phường/xã." }),
  district: z.string().min(2, { message: "Vui lòng nhập quận/huyện." }),
  province: z.string().min(5, { message: "Vui lòng nhập tỉnh/thành phố." }),
  shipment: z.string().min(2, { message: "Vui lòng chọn đơn vị vận chuyển." }),
  note: z.string().nullable(),
});

export default function CreateForm({
  customersData,
  productsData,
}: {
  customersData: CustomerType[];
  productsData: ProductWithDescriptionAndStorageType[];
}) {
  const {
    order,
    addProduct,
    setShipment,
    removeAll,
    setPrices,
    setCustomer,
    setNewID,
  } = useOrder();

  const [customerSelect, setCustomerSelect] = useState<CustomerType | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const orderProducts = order?.products;
  const { addressValues, setProvince, setDistrict, setCommune, clearAll } =
    useAddressSelects();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      province: "",
      shipment: "GHTK",
      note: "",
    },
    mode: "onBlur",
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
    toast.promise(
      async () => {
        if (!customerSelect) {
          // create new default anonymous customer
          // in case of staff create order by phone call...
          // this ID is a default row in customer table for creating order by staff

          const dummyCustomer: CustomerType = {
            id: "1f8c6d32-0cff-4916-9104-ce60f171d12c",
            created_at: "",
            dob: "",
            email: "",
            name: data.name,
            phone: data.phone,
            address: data.address,
            ward: data.ward,
            district: data.district,
            province: data.province,
            level: 0,
            image: "",
          };

          setCustomerSelect(dummyCustomer);
        }

        // calculate, open confirm dialog, and create order
        if (order && customerSelect) {
          const calFeesResponse = await calShipmentFees({
            formData: data,
            order: order,
            customerSession: customerSelect,
          });

          const calFees = ApiErrorHandlerClient<{
            service_fee: number;
            insurance_fee: number;
          }>({
            response: calFeesResponse,
            isShowToast: false,
          });

          if (calFees?.data?.service_fee) {
            setPrices(calFees?.data?.service_fee, calFees?.data?.insurance_fee);
            setCustomer(customerSelect.id, customerSelect.name);
            setNewID();

            setIsDialogOpen(true);
          }
        }
      },
      {
        loading: "Đang tính toán...",
        error: () => {
          return "Tính toán không thành công, vui long thử lại.";
        },
      }
    );
  }

  function onSelectCustomerChange(value: string) {
    if (value !== "new" && value) {
      form.setValue(
        "name",
        customersData.find((customer) => customer.id === value)?.name ?? ""
      );
      form.setValue(
        "address",
        customersData.find((customer) => customer.id === value)?.address ?? ""
      );
      form.setValue(
        "ward",
        customersData.find((customer) => customer.id === value)?.ward ?? ""
      );
      form.setValue(
        "district",
        customersData.find((customer) => customer.id === value)?.district ?? ""
      );
      form.setValue(
        "province",
        customersData.find((customer) => customer.id === value)?.province ?? ""
      );
      form.setValue(
        "phone",
        customersData.find((customer) => customer.id === value)?.phone ?? ""
      );

      const provinceId =
        province.find(
          (province) =>
            province.name ===
            customersData.find((customer) => customer.id === value)?.province
        )?.idProvince ?? "";

      setProvince(
        customersData.find((customer) => customer.id === value)?.province ?? "",
        provinceId
      );

      const districtId =
        district.find(
          (district) =>
            district.name ===
            customersData.find((customer) => customer.id === value)?.district
        )?.idDistrict ?? "";

      setDistrict(
        customersData.find((customer) => customer.id === value)?.district ?? "",
        districtId
      );

      const communeId =
        communes.find(
          (commune) =>
            commune.name ===
            customersData.find((customer) => customer.id === value)?.ward
        )?.idCommune ?? "";

      setCommune(
        customersData.find((customer) => customer.id === value)?.ward ?? "",
        communeId
      );

      form.trigger("name");
    }
  }

  return (
    <>
      <div className="h-fit w-full max-w-[1400px] gap-2 pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-row gap-4 lg:flex-col"
          >
            <div className="flex w-1/2 flex-col gap-3 lg:w-full">
              <div>
                <FormLabel>Chọn tài khoản khách hàng</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setCustomerSelect(
                      customersData.find((customer) => customer.id === value) ??
                        null
                    );
                    onSelectCustomerChange(value);
                    if (value === "new") {
                      form.reset();
                      clearAll();
                    }
                  }}
                >
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Khách hàng</SelectLabel>
                      <SelectItem key="new" value="new">
                        Khách mới
                      </SelectItem>
                      {customersData.map((customer, index) => (
                        <SelectItem key={index} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khách hàng</FormLabel>
                    <FormControl>
                      <Input
                        className="border-[#E5E7EB]"
                        placeholder="Nhập tên"
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
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        className="border-[#E5E7EB]"
                        placeholder="Nhập số"
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
                    <FormLabel>Khu vực</FormLabel>
                    <FormControl>
                      <FormAddressPicker />
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
                    <FormLabel>Địa chỉ nhà</FormLabel>
                    <FormControl>
                      <Input
                        className="border-[#E5E7EB]"
                        placeholder="Nhập số nhà, tên đường"
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
                          setShipment(value as ShipmentNameType, "");
                        }}
                      />
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
                        placeholder="Ghi chú cho đơn hàng của bạn..."
                        {...field}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-1/2 flex-col justify-between lg:w-full">
              <div>
                <FormLabel>Sản phẩm</FormLabel>
                <div className="mt-2 flex h-[540px] flex-col gap-3 overflow-auto pr-2">
                  {productsData.map((prod, index) => (
                    <div key={index}>
                      <ProductCard
                        prod={prod}
                        onAdd={() => {
                          addProduct(prod);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mb-2 mt-4">
                  {orderProducts && (
                    <DataTable
                      key={JSON.stringify(orderProducts)}
                      columns={columns}
                      data={orderProducts}
                      isPaginationEnabled={false}
                      isCollumnVisibilityEnabled={false}
                      isSearchEnabled={false}
                    />
                  )}
                </div>
              </div>
              <div>
                {order && (
                  <div className="flex flex-row items-center justify-between">
                    <span className="">
                      Giá: {formatCurrency(order?.price)} VNĐ
                    </span>
                    <Button
                      onClick={() => {
                        removeAll();
                      }}
                      variant="outline"
                      className="w-fit border-none"
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                )}
                <Button
                  disabled={!form.formState.isValid || !order}
                  type="submit"
                  className="mt-2 w-full bg-foreground text-background"
                >
                  Tính giá tiền
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {order && customerSelect && (
        <ConfirmDialog
          key="dashboard-create-confirm-dialog"
          formData={form.getValues()}
          order={order}
          customerSession={customerSelect}
          isOpen={isDialogOpen}
          onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
        />
      )}
    </>
  );
}

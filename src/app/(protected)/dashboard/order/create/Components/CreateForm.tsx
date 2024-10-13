"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form, FormLabel } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useOrder, OrderState } from "@/zustand/useOrder";
import type {
  CustomerType,
  ProductWithDescriptionAndStorageType,
  ProductWithQuantity,
  StorageType,
} from "@utils/types";
import { useState, useEffect, useMemo, useCallback } from "react";
import useAddressSelects from "@/zustand/useAddressSelects";
import { calShipmentFees } from "@/app/(main)/cart/_actions/calShip";
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
import ProductCard from "@/app/(protected)/dashboard/order/create/Components/ProductCard";
import ConfirmDialog from "@app/(main)/cart/Components/Summary/ConfirmDialog";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import CreateFormInputs from "@app/(protected)/dashboard/order/create/Components/CreateFormInputs";

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
  province: z.string().min(2, { message: "Vui lòng nhập tỉnh/thành phố." }),
  shipment: z.string().min(2, { message: "Vui lòng chọn đơn vị vận chuyển." }),
  note: z.string().nullable(),
});

export default function CreateForm({
  storages,
  customers,
  products,
}: {
  storages: StorageType[];
  customers: CustomerType[];
  products: ProductWithDescriptionAndStorageType[];
}) {
  const { order, addProduct, removeAll, setPrices, setNewID } =
    useOrder() as OrderState;
  const [customerSelect, setCustomerSelect] = useState<CustomerType | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStorage, setSelectedStorage] =
    useState<string>("Kho Hồ Chí Minh");

  const { addressValues, setProvince, setDistrict, setCommune, clearAll } =
    useAddressSelects();

  const orderProducts = order?.products;
  const productsWithQuantities = useMemo(() => {
    const productQuantities: ProductWithQuantity[] = [];
    orderProducts?.forEach((product: ProductWithDescriptionAndStorageType) => {
      const existingProduct = productQuantities.find(
        (p) => p.product.product.id === product.product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        productQuantities.push({ product: product, quantity: 1 });
      }
    });

    return productQuantities;
  }, [orderProducts, orderProducts?.length]);

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.product_storages.some(
        (product_storage) => product_storage.storage_name === selectedStorage
      )
    );
  }, [products, selectedStorage]);

  const onSelectCustomerChange = useCallback(
    (value: string) => {
      if (value !== "new" && value) {
        const selectedCustomer = customers.find(
          (customer) => customer.id === value
        );
        if (selectedCustomer) {
          form.setValue("name", selectedCustomer.name ?? "");
          form.setValue("address", selectedCustomer.address ?? "");
          form.setValue("ward", selectedCustomer.ward ?? "");
          form.setValue("district", selectedCustomer.district ?? "");
          form.setValue("province", selectedCustomer.province ?? "");
          form.setValue("phone", selectedCustomer.phone ?? "");

          const provinceId =
            province.find((prov) => prov.name === selectedCustomer.province)
              ?.idProvince ?? "";
          setProvince(selectedCustomer.province ?? "", provinceId);

          const districtId =
            district.find((dist) => dist.name === selectedCustomer.district)
              ?.idDistrict ?? "";
          setDistrict(selectedCustomer.district ?? "", districtId);

          const communeId =
            communes.find((commune) => commune.name === selectedCustomer.ward)
              ?.idCommune ?? "";
          setCommune(selectedCustomer.ward ?? "", communeId);

          form.trigger("name");
        }
      }
    },
    [customers, form, setCommune, setDistrict, setProvince]
  );

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      toast.promise(
        async () => {
          if (!customerSelect) {
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

          if (order && customerSelect) {
            const suitablePickStorage = storages.find(
              (storage) => storage.name === selectedStorage
            );
            if (!suitablePickStorage)
              throw new Error("Không tìm thấy kho phù hợp.");

            order.pick_address = suitablePickStorage.address;
            order.pick_ward = suitablePickStorage.ward;
            order.pick_district = suitablePickStorage.district;
            order.pick_province = suitablePickStorage.province;
            order.pick_storage_id = suitablePickStorage.id;
            order.customer_id = customerSelect.id;
            order.customer_name = form.getValues().name;
            order.customer_phone = form.getValues().phone;

            const calFees = await calShipmentFees({
              formData: data,
              order: order,
            });

            if (calFees?.data?.service_fee) {
              setPrices(
                calFees?.data?.service_fee,
                calFees?.data?.insurance_fee
              );
              setNewID();
              setIsDialogOpen(true);
            }
          }
        },
        {
          loading: "Đang tính toán...",
          error: "Tính toán không thành công, vui lòng thử lại.",
        }
      );
    },
    [
      customerSelect,
      form,
      order,
      setIsDialogOpen,
      setNewID,
      setPrices,
      storages,
      selectedStorage,
    ]
  );

  return (
    <>
      <div className="h-fit w-full max-w-[1400px] gap-2 pb-4 sm:pb-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-row gap-4 lg:flex-col"
          >
            <Card className="h-fit w-1/2 lg:w-full">
              <CardHeader className="pb-3 sm:px-2">
                Thông tin đơn hàng
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div>
                  <FormLabel>Chọn tài khoản khách hàng</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setCustomerSelect(
                        customers.find((customer) => customer.id === value) ??
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
                      <SelectValue placeholder="Chọn khách hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Khách hàng</SelectLabel>
                        <SelectItem key="new" value="new">
                          Khách mới
                        </SelectItem>
                        {customers.map((customer, index) => (
                          <SelectItem key={index} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <CreateFormInputs form={form} />
                <Button
                  disabled={!form.formState.isValid || !order}
                  type="submit"
                  className="mt-2 w-full bg-foreground text-background"
                >
                  Tính giá tiền
                </Button>
              </CardContent>
            </Card>
            <Card className="h-fit w-1/2 lg:w-full">
              <CardHeader className="pb-3 sm:px-2">
                Danh sách sản phẩm
              </CardHeader>
              <CardContent className="flex h-auto flex-col overflow-hidden">
                <div className="my-1">
                  <Select
                    defaultValue={selectedStorage}
                    onValueChange={(value) => {
                      setSelectedStorage(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn kho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Các kho toàn quốc</SelectLabel>
                        {storages.map((storage, index) => (
                          <SelectItem key={index} value={storage.name}>
                            {storage.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-3 flex h-[540px] w-full flex-col gap-3 overflow-auto pr-2">
                  {filteredProducts.map((prod, index) => (
                    <div className="w-full" key={index}>
                      <ProductCard
                        prod={prod}
                        onAdd={() => {
                          addProduct(prod);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    {orderProducts && (
                      <DataTable
                        key={JSON.stringify(orderProducts)}
                        columns={columns}
                        data={productsWithQuantities}
                        isPaginationEnabled={false}
                        isCollumnVisibilityEnabled={false}
                        isSearchEnabled={false}
                      />
                    )}
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
      {order && customerSelect && (
        <ConfirmDialog
          key="dashboard-create-confirm-dialog"
          formData={form.getValues()}
          order={order}
          isOpen={isDialogOpen}
          onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
        />
      )}
    </>
  );
}

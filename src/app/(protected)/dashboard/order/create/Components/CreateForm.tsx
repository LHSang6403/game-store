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
import type {
  CustomerType,
  ProductType,
  ShipmentNameType,
  StaffType,
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

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is a compulsory." }),
  phone: z
    .string()
    .min(6, { message: "Must be a valid mobile number" })
    .max(12, { message: "Must be a valid mobile number" }),
  address: z
    .string()
    .min(2, { message: "Your address is a compulsory for shipping." }),
  ward: z
    .string()
    .min(2, { message: "Your ward is a compulsory for shipping." }),
  district: z
    .string()
    .min(2, { message: "Your district is a compulsory for shipping." }),
  province: z
    .string()
    .min(5, { message: "Your province is a compulsory for shipping." }),
  shipment: z
    .string()
    .min(2, { message: "Service service is a compulsory for shipping." }),
  note: z.string().nullable(),
});

export default function CreateForm({
  customersData,
  productsData,
}: {
  customersData: CustomerType[];
  productsData: ProductWithDescriptionAndStorageType[];
}) {
  const { order, addProduct, setShipment, removeAll } = useOrder();

  const { session } = useSession();
  const staffSession = session as StaffType;

  const orderProducts = order?.products;

  const { addressValues, setAddress, setProvince, setDistrict, setCommune } =
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

  //   useEffect(() => {
  //     if (addressValues) {
  //       form.setValue("province", addressValues.province);
  //       form.setValue("district", addressValues.district);
  //       form.setValue("ward", addressValues.commune);
  //     }
  //     form.trigger("ward");
  //   }, [addressValues]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // if (!order) {
    //   return <></>;
    // }

    // toast.promise(
    //   async () => {
    //     // const unprocessedCalFeesResponse = await calShipmentFees({
    //     //   formData: data,
    //     //   order: order,
    //     //   customerSession: customerSession,
    //     // });
    //     // const processedCalFeesResponse = ApiErrorHandlerClient<{
    //     //   service_fee: number;
    //     //   insurance_fee: number;
    //     // }>({
    //     //   response: unprocessedCalFeesResponse,
    //     //   isShowToast: false,
    //     // });
    //     // if (processedCalFeesResponse?.data?.service_fee) {
    //     //   setPrices(
    //     //     processedCalFeesResponse?.data?.service_fee,
    //     //     processedCalFeesResponse?.data?.insurance_fee
    //     //   );
    //     //   setCustomer(customerSession.id, customerSession.name);
    //     //   setNewID();
    //     //   setIsDialogOpen(true);
    //     // }
    //   },
    //   {
    //     loading: "Calculating order...",
    //     error: (error) => {
    //       return `Failed to calculate order: ${error}`;
    //     },
    //   }
    // );
  }

  function onSelectCustomerChange(value) {
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
      setProvince(
        customersData.find((customer) => customer.id === value)?.province ?? "",
        "province id"
      );
      setDistrict(
        customersData.find((customer) => customer.id === value)?.district ?? "",
        "dis id"
      );
      setCommune(
        customersData.find((customer) => customer.id === value)?.ward ?? "",
        "ward id"
      );

      form.trigger("name");

      console.log("values", form.getValues());
    }
  }

  return (
    <div className="h-fit w-full max-w-[1400px] gap-2 pb-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-row gap-4"
        >
          <div className="flex w-1/2 flex-col gap-3 xl:w-full">
            <div>
              <FormLabel>Select existing customer</FormLabel>
              <Select
                onValueChange={(value) => {
                  console.log(value);
                  onSelectCustomerChange(value);
                }}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Customer</SelectLabel>{" "}
                    <SelectItem key="new" value="new">
                      Create new
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
                  <FormLabel>Customer name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#E5E7EB]"
                      placeholder="Enter name"
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
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#E5E7EB]"
                      placeholder="Enter number"
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
                  <FormLabel>Order address</FormLabel>
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#E5E7EB]"
                      placeholder="Enter address"
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
                  <FormLabel>Shiping service</FormLabel>
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
                  <FormLabel>Order note</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-44 min-h-28 border-[#E5E7EB]"
                      placeholder="Enter note here..."
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
          <div className="flex w-1/2 flex-col justify-between xl:w-full">
            <div>
              <FormLabel>Products</FormLabel>
              <div className="flex h-[540px] flex-col gap-3 overflow-auto pr-2">
                {productsData.map((prod, index) => (
                  <div key={index}>
                    <ProductCard
                      prod={prod}
                      onAdd={() => {
                        console.log("add", prod);
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
                    Price: {formatCurrency(order?.price)} VNĐ
                  </span>
                  <Button
                    onClick={() => {
                      removeAll();
                    }}
                    variant="outline"
                    className="w-fit border-none"
                  >
                    Remove all
                  </Button>
                </div>
              )}
              <Button
                disabled={!form.formState.isValid || !order}
                type="submit"
                className="mt-2 w-full bg-foreground text-background"
              >
                Calculate
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

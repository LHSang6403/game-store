"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProductFormInputs({ form }: { form: any }) {
  return (
    <div className="grid h-fit w-full grid-cols-2 gap-4 sm:flex sm:w-full sm:flex-col">
      <FormField
        control={form.control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hiệu</FormLabel>
            <FormControl>
              <Input
                placeholder="Hiệu sản phẩm"
                {...field}
                type="text"
                onChange={field.onChange}
                className="border-[#E5E7EB]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên</FormLabel>
            <FormControl>
              <Input
                placeholder="Tên sản phẩm"
                {...field}
                type="text"
                onChange={field.onChange}
                className="border-[#E5E7EB]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mô tả</FormLabel>
            <FormControl>
              <Textarea
                className="max-h-52 min-h-36 border-[#E5E7EB]"
                placeholder="Mô tả sản phẩm"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Giá</FormLabel>
            <FormControl>
              <Input
                placeholder="Giá sản phẩm (VNĐ)"
                {...field}
                type="text"
                onChange={field.onChange}
                className="border-[#E5E7EB]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="rate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bình chọn</FormLabel>
            <FormControl>
              <Input
                placeholder="Bình chọn sản phẩm"
                {...field}
                type="text"
                onChange={field.onChange}
                className="border-[#E5E7EB]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loại</FormLabel>
            <FormControl>
              <Input
                placeholder="Loại sản phẩm"
                {...field}
                type="text"
                onChange={field.onChange}
                className="border-[#E5E7EB]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="storage_address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Địa chỉ kho</FormLabel>
            <FormControl>
              <Input
                placeholder="Kho sản phẩm"
                {...field}
                type="text"
                onChange={field.onChange}
                className="border-[#E5E7EB]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="storage_quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Số lượng</FormLabel>
            <FormControl>
              <Input
                placeholder="Số lượng sản phẩm"
                {...field}
                type="text"
                onChange={field.onChange}
                className="border-[#E5E7EB]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

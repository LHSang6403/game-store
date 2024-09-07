"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryType } from "@/utils/types";

export default function CreateProductFormInputs({
  categories,
  form,
}: {
  categories: CategoryType[];
  form: any;
}) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 sm:px-2">Thông tin sản phẩm</CardHeader>
      <CardContent className="grid h-fit w-full grid-cols-2 gap-4 sm:flex sm:w-full sm:flex-col">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hãng sản xuất</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hiệu sản phẩm"
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
              <FormLabel>Giá tiền</FormLabel>
              <FormControl>
                <Input
                  placeholder="Giá sản phẩm (VNĐ)"
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Bình chọn</FormLabel>
          <Select
            defaultValue={form.getValues("category_id")}
            onValueChange={(value) => form.setValue("category_id", value)}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Chọn loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loại</SelectLabel>
                {categories.map((cate, index) => (
                  <SelectItem key={index} value={cate.id.toString()}>
                    {cate.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

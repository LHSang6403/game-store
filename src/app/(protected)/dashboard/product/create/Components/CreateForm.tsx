"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import DropAndDragZone from "@components/File/DropAndDragZone";
import ProductFormInputs from "@/app/(protected)/dashboard/product/create/Components/CreateProductFormInputs";
import useFiles from "@/zustand/useFiles";
import { useSession } from "@/zustand/useSession";
import { ProductStorageType } from "@/utils/types/index";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductStorageCheckbox from "@/app/(protected)/dashboard/product/create/Components/ProductStorageCheckbox";
import { createHandler } from "@/app/(protected)/dashboard/product/create/_actions/index";

export const FormSchema = z.object({
  brand: z.string().min(2, { message: "Vui lòng nhập hiệu." }),
  name: z.string().min(2, { message: "Vui lòng nhập tên." }),
  description: z.string().min(2, { message: "Vui lòng nhập mô tả." }),
  price: z
    .string()
    .refine(
      (val) =>
        val === "" ||
        (!Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0),
      {
        message: "Vui lòng nhập số hợp lệ.",
      }
    ),
  rate: z
    .string()
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 5,
      {
        message: "Vui lòng nhập số từ 0 đến 5.",
      }
    ),
  category: z.string().min(2, { message: "Vui lòng nhập loại." }),
});

export default function CreateForm() {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const initState = {
    brand: "",
    name: "",
    description: "",
    price: "",
    rate: "",
    category: "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onChange",
  });

  const [productStorages, setProductStorages] = useState<ProductStorageType[]>(
    []
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (!session) throw new Error("Lỗi không tìm thấy phiên làm việc.");

        await createHandler({
          formData: data,
          files: files,
          session: session,
          productStorages: productStorages,
        });
      },
      {
        loading: "Đang tạo sản phẩm...",
        success: () => {
          form.reset();
          router.push("/dashboard/product");

          return "Tạo sản phẩm thành công. Đang chuyển hướng...";
        },
        error: (error: any) => {
          return error.message;
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="h-fit w-full xl:col-span-2">
          <ProductFormInputs form={form} />
        </div>
        <Card className="flex h-full w-full flex-col xl:col-span-2">
          <CardHeader className="pb-3">Hình ảnh sản phẩm</CardHeader>
          <CardContent className="pb-0">
            <DropAndDragZone className="mt-2 w-full rounded-lg border p-16 sm:p-6" />
          </CardContent>
        </Card>
        <div className="col-span-2">
          <ProductStorageCheckbox
            onValuesChange={(values) => {
              console.log(values);
              setProductStorages(values);
            }}
          />
        </div>
        <div className="col-span-2">
          <div className="h-fit overflow-hidden rounded-md border">
            <Editor editable={true} />
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <Button
            disabled={productStorages.length === 0 || !form.formState.isValid}
            type="submit"
            className="mt-1 w-fit bg-foreground px-7 text-background"
          >
            Tạo sản phẩm
          </Button>
        </div>
      </form>
    </Form>
  );
}

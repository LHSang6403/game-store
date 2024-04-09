"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import DropAndDragZone from "@/components/File/DropAndDragZone";
import CreateProductFormInputs from "@/app/(protected)/dashboard/product/create/Components/CreateProductFormInputs";
import useFiles from "@/zustand/useFiles";
import { useSession } from "@/zustand/useSession";
import {
  ProductWithDescriptionAndStorageType,
  ProductStorageType,
} from "@/utils/types/index";
import { useState } from "react";
import ImageFileItem from "@components/File/ImageFileItem";
import ProductStorageCheckbox from "@app/(protected)/dashboard/product/create/Components/ProductStorageCheckbox";
import { updateHandler } from "@app/(protected)/dashboard/product/[edit_id]/_actions/index";
import { Card, CardHeader, CardContent } from "@components/ui/card";

export const FormSchema = z.object({
  brand: z.string().min(2, { message: "Vui lòng nhập hiệu." }),
  name: z.string().min(2, { message: "Vui lòng nhập tên." }),
  description: z.string().min(2, { message: "Vui lòng nhập mô tả." }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Vui lòng nhập số.",
  }),
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

export default function EditForm({
  product,
}: {
  product: ProductWithDescriptionAndStorageType;
}) {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const [updatedProductImages, setUpdatedProductImages] = useState<string[]>(
    product?.product.images ?? []
  );

  const initState = {
    brand: product?.product.brand ?? "",
    name: product?.product.name ?? "",
    description: product?.product.description ?? "",
    price: product?.product.price.toString() ?? "1000000",
    rate: product?.product.rate.toString() ?? "4",
    category: product?.product.category ?? "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onChange",
  });

  const [updatedProductStorages, setUpdatedProductStorages] = useState<
    ProductStorageType[]
  >([]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (!session) throw new Error("Lỗi không có phiên làm việc.");

        await updateHandler({
          formData: data,
          session: session,
          originalProduct: product,
          updatedProductImages: updatedProductImages,
          newProductImages: files,
          updatedProductStorages: updatedProductStorages,
        });
      },
      {
        loading: "Đang chỉnh sửa...",
        success: () => {
          router.push("/dashboard/product");
          return "Chỉnh sửa thành công. Chuyển hướng...";
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
        <div className="h-fit min-h-[550px] w-full xl:col-span-2">
          <CreateProductFormInputs form={form} />
        </div>
        <Card className="flex h-fit min-h-[550px] w-full flex-col xl:col-span-2">
          <CardHeader className="pb-3">Hình ảnh sản phẩm</CardHeader>
          <CardContent className="pb-0">
            <div className="mt-1.5 grid w-fit grid-cols-6 gap-3 sm:grid-cols-4">
              {updatedProductImages?.map((image: string, index: number) => (
                <ImageFileItem
                  key={index}
                  image={
                    process.env.NEXT_PUBLIC_SUPABASE_URL +
                    "/storage/v1/object/public/public_files/" +
                    image
                  }
                  name={image.split("/")[image.split("/").length - 1]}
                  removeHandler={() => {
                    setUpdatedProductImages((images) =>
                      images.filter((img) => img !== image)
                    );
                  }}
                />
              ))}
            </div>
            <div className="mt-5 w-full xl:mt-4">
              <h2 className="title mb-1 ml-1 text-sm font-medium">
                Thêm hình sản phẩm
              </h2>
              <DropAndDragZone className="mt-1.5 rounded-lg border p-16 sm:p-6" />
            </div>
          </CardContent>
        </Card>
        <div className="col-span-2">
          <ProductStorageCheckbox
            defaultProductStorages={product.product_storages ?? []}
            onValuesChange={(values) => {
              setUpdatedProductStorages(values);
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
            disabled={files.length === 0 || !form.formState.isValid}
            type="submit"
            className="mt-1 w-fit bg-foreground px-7 text-background"
          >
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </Form>
  );
}

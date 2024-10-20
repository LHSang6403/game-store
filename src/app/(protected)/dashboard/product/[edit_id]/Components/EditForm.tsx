"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import DropAndDragZone from "@/components/File/DropAndDragZone";
import CreateProductFormInputs from "@/app/(protected)/dashboard/product/create/Components/CreateProductFormInputs";
import useFiles from "@/zustand/useFiles";
import { useSession, SessionState } from "@/zustand/useSession";
import {
  ProductWithDescriptionAndStorageType,
  ProductStorageType,
} from "@/utils/types/index";
import { useState } from "react";
import ImageFileItem from "@components/File/ImageFileItem";
import ProductStorageCheckbox from "@app/(protected)/dashboard/product/create/Components/ProductStorageCheckbox";
import { handleUpdate} from "@app/(protected)/dashboard/product/[edit_id]/_actions/index";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import { JSONContent } from "novel";
import Editor from "@/components/editor/advanced-editor";
import { parseStringToJSONContent } from "@/utils/functions/parseStringToJSONContent";
import { useQuery } from "@tanstack/react-query";
import { readAllCategories } from "@/app/_actions/product";

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
  category_id: z.string().min(1, { message: "Vui lòng nhập loại." }),
});

export default function EditForm({
  product,
}: {
  product: ProductWithDescriptionAndStorageType;
}) {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession() as SessionState;

  const parsedContent: JSONContent = parseStringToJSONContent(
    product.product_description.content
  );

  const [description, setDescription] = useState<JSONContent>(parsedContent);

  const [updatedProductImages, setUpdatedProductImages] = useState<string[]>(
    product?.product.images ?? []
  );

  const initState = {
    brand: product?.product.brand ?? "",
    name: product?.product.name ?? "",
    description: product?.product.description ?? "",
    price: product?.product.price.toString() ?? "1000000",
    rate: product?.product.rate.toString() ?? "4",
    category_id: product?.product.category_id.toString() ?? "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onChange",
  });

  const [updatedProductStorages, setUpdatedProductStorages] = useState<
    ProductStorageType[]
  >([]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await readAllCategories(),
    staleTime: 60 * (60 * 1000),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (!session) throw new Error("Lỗi không có phiên làm việc.");

        const result = await handleUpdate({
          formData: data,
          description: description,
          session: session,
          originalProduct: product,
          updatedProductImages: updatedProductImages,
          newProductImages: files,
          updatedProductStorages: updatedProductStorages,
        });

        if (result.updatedProductResponse.error)
          throw new Error(result.updatedProductResponse.error);
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
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="grid grid-cols-2 gap-4">
          <div className="h-fit w-full xl:col-span-2">
            <CreateProductFormInputs
              categories={categories?.data ?? []}
              form={form}
            />
          </div>
          <Card className="flex h-auto w-full flex-col xl:col-span-2">
            <CardHeader className="pb-3 sm:px-2">Hình ảnh sản phẩm</CardHeader>
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
                    handleRemove={() => {
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
        </form>
      </Form>
      <div>
        <div className="h-fit overflow-hidden rounded-lg border">
          <Editor initialValue={description} onChange={setDescription} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={
            (files.length === 0 && updatedProductImages.length === 0) ||
            !form.formState.isValid
          }
          className="mt-1 w-fit bg-foreground px-7 text-background sm:w-full"
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}

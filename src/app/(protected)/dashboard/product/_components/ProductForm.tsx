"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import DropAndDragZone from "@components/File/DropAndDragZone";
import ProductFormInputs from "@/app/(protected)/dashboard/product/_components/CreateProductFormInputs";
import useFiles from "@/zustand/useFiles";
import { useSession, SessionState } from "@/zustand/useSession";
import {
  ProductWithDescriptionAndStorageType,
  ProductStorageType,
} from "@/utils/types/index";
import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductStorageCheckbox from "@/app/(protected)/dashboard/product/_components/ProductStorageCheckbox";
import { handleCreate } from "@/app/(protected)/dashboard/product/create/_actions/index";
import { handleUpdate } from "@/app/(protected)/dashboard/product/[edit_id]/_actions/index";
import { defaultValueEditor } from "@/utils/default-value-editor";
import { JSONContent } from "novel";
import Editor from "@/components/editor/advanced-editor";
import { readAllCategories } from "@/app/_actions/product";
import { useQuery } from "@tanstack/react-query";
import { parseStringToJSONContent } from "@/utils/functions/parseStringToJSONContent";
import ImageFileItem from "@components/File/ImageFileItem";

export const FormSchema = z.object({
  brand: z.string().min(2, { message: "Vui lòng nhập hiệu." }),
  name: z.string().min(2, { message: "Vui lòng nhập tên." }),
  description: z.string().min(2, { message: "Vui lòng nhập mô tả." }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Vui lòng nhập số hợp lệ.",
  }),
  rate: z
    .string()
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 5,
      { message: "Vui lòng nhập số từ 0 đến 5." }
    ),
  category_id: z.string().min(1, { message: "Vui lòng chọn loại." }),
});

export default function ProductForm({
  product,
}: {
  product?: ProductWithDescriptionAndStorageType;
}) {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession() as SessionState;

  const isEditMode = !!product;
  const initialDescription = useMemo(
    () =>
      isEditMode
        ? parseStringToJSONContent(product!.product_description.content)
        : defaultValueEditor,
    [isEditMode, product]
  );
  const [description, setDescription] =
    useState<JSONContent>(initialDescription);

  const [updatedProductImages, setUpdatedProductImages] = useState<string[]>(
    isEditMode ? product?.product.images ?? [] : []
  );

  const initState = useMemo(
    () => ({
      brand: product?.product.brand ?? "",
      name: product?.product.name ?? "",
      description: product?.product.description ?? "",
      price: product?.product.price?.toString() ?? "",
      rate: product?.product.rate?.toString() ?? "",
      category_id: product?.product.category_id?.toString() ?? "",
    }),
    [product]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onChange",
  });

  const [productStorages, setProductStorages] = useState<ProductStorageType[]>(
    isEditMode ? product?.product_storages ?? [] : []
  );

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await readAllCategories(),
    staleTime: 60 * 60 * 1000,
  });

  const handleStorageValuesChange = useCallback(
    (values: ProductStorageType[]) => {
      setProductStorages(values);
    },
    []
  );

  const handleSave = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      toast.promise(
        async () => {
          if (!session) throw new Error("Lỗi không có phiên làm việc.");

          if (isEditMode) {
            const result = await handleUpdate({
              formData: data,
              description,
              session,
              originalProduct: product,
              updatedProductImages,
              newProductImages: files,
              updatedProductStorages: productStorages,
            });
            if ("error" in result) throw new Error(result?.error as string);
          } else {
            const result = await handleCreate({
              formData: data,
              description,
              productImages: files,
              session,
              productStorages,
            });
            if (result.error) throw new Error(result.error);
          }
        },
        {
          loading: isEditMode
            ? "Đang lưu chỉnh sửa..."
            : "Đang tạo sản phẩm...",
          success: () => {
            form.reset();
            router.push("/dashboard/product");
            return isEditMode
              ? "Chỉnh sửa thành công. Đang chuyển hướng..."
              : "Tạo sản phẩm thành công. Đang chuyển hướng...";
          },
          error: (error: any) => {
            return error.message;
          },
        }
      );
    },
    [
      session,
      description,
      files,
      isEditMode,
      form,
      router,
      product,
      updatedProductImages,
      productStorages,
    ]
  );

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="grid grid-cols-2 gap-4">
          <div className="h-fit w-full xl:col-span-2">
            <ProductFormInputs
              categories={categories?.data ?? []}
              form={form}
            />
          </div>
          <Card className="flex h-auto w-full flex-col xl:col-span-2">
            <CardHeader className="pb-3 sm:px-2">Hình ảnh sản phẩm</CardHeader>
            <CardContent className="pb-0">
              {isEditMode && (
                <div className="mt-1.5 grid w-fit grid-cols-6 gap-3 sm:grid-cols-4">
                  {updatedProductImages.map((image, index) => (
                    <ImageFileItem
                      key={index}
                      image={
                        process.env.NEXT_PUBLIC_SUPABASE_URL +
                        "/storage/v1/object/public/public_files/" +
                        image
                      }
                      name={image.split("/").pop()!}
                      handleRemove={() =>
                        setUpdatedProductImages((images) =>
                          images.filter((img) => img !== image)
                        )
                      }
                    />
                  ))}
                </div>
              )}
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
              defaultProductStorages={
                isEditMode ? product?.product_storages : undefined
              }
              onValuesChange={handleStorageValuesChange}
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
          onClick={form.handleSubmit(handleSave)}
          disabled={
            !form.formState.isValid || (!isEditMode && files.length === 0)
          }
          className="mt-1 w-fit bg-foreground px-7 text-background sm:w-full"
        >
          {isEditMode ? "Lưu thay đổi" : "Tạo sản phẩm"}
        </Button>
      </div>
    </div>
  );
}

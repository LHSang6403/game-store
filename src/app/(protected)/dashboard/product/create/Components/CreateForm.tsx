"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import DropAndDragZone from "@components/File/DropAndDragZone";
import ProductFormInputs from "@/app/(protected)/dashboard/product/create/Components/CreateProductFormInputs";
import useFiles from "@/zustand/useFiles";
import { useSession, SessionState } from "@/zustand/useSession";
import { ProductStorageType } from "@/utils/types/index";
import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductStorageCheckbox from "@/app/(protected)/dashboard/product/create/Components/ProductStorageCheckbox";
import { handleCreate } from "@/app/(protected)/dashboard/product/create/_actions/index";
import { defaultValueEditor } from "@/utils/default-value-editor";
import { JSONContent } from "novel";
import Editor from "@/components/editor/advanced-editor";
import { readAllCategories } from "@/app/_actions/product";
import { useQuery } from "@tanstack/react-query";

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
  category_id: z.string().min(1, { message: "Vui lòng chọn loại." }),
});

export default function CreateForm() {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession() as SessionState;

  const [description, setDescription] =
    useState<JSONContent>(defaultValueEditor);

  const initState = useMemo(
    () => ({
      brand: "",
      name: "",
      description: "",
      price: "",
      rate: "",
      category_id: "",
    }),
    []
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onChange",
  });

  const [productStorages, setProductStorages] = useState<ProductStorageType[]>(
    []
  );

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await readAllCategories(),
    staleTime: 60 * (60 * 1000),
  });

  const handleStorageValuesChange = useCallback(
    (values: ProductStorageType[]) => {
      setProductStorages(values);
    },
    []
  );

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      toast.promise(
        async () => {
          if (!session) throw new Error("Lỗi không tìm thấy phiên làm việc.");

          const result = await handleCreate({
            formData: data,
            description: description,
            productImages: files,
            session: session,
            productStorages: productStorages,
          });

          if (result.error) throw new Error(result.error);
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
    },
    [session, description, files, productStorages, form, router]
  );

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-row gap-4 xl:flex-col">
            <div className="h-fit w-1/2 xl:w-full">
              <ProductFormInputs
                categories={categories?.data ?? []}
                form={form}
              />
            </div>
            <Card className="flex h-auto w-1/2 flex-col xl:w-full">
              <CardHeader className="pb-3 sm:px-2">
                Hình ảnh sản phẩm
              </CardHeader>
              <CardContent className="pb-0">
                <DropAndDragZone className="mt-2 w-full rounded-lg border p-16 sm:p-6" />
              </CardContent>
            </Card>
          </div>
          <div>
            <ProductStorageCheckbox
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
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid || files.length === 0}
          className="mt-1 w-fit bg-foreground px-7 text-background sm:w-full"
        >
          Tạo sản phẩm
        </Button>
      </div>
    </div>
  );
}

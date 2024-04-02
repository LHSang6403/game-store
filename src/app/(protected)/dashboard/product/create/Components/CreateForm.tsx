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
import ProductFormInputs from "@/app/(protected)/dashboard/product/create/Components/ProductFormInputs";
import useFiles from "@/zustand/useFiles";
import { useSession } from "@/zustand/useSession";
import { v4 as uuidv4 } from "uuid";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { createProduct } from "@app/_actions/product";
import { createProductDescription } from "@app/_actions/product_description";
import {
  ProductDescriptionType,
  ProductStorageType,
  ProductType,
} from "@/utils/types/index";
import {
  CustomerType,
  StaffType,
  ProductWithDescriptionAndStorageType,
} from "@/utils/types/index";
import { useState } from "react";
import { createProductStorage } from "@/app/_actions/product_storage";
import ProductStorageCheckbox from "@/app/(protected)/dashboard/product/create/Components/ProductStorageCheckbox";

const FormSchema = z.object({
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
  sold_quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Vui lòng nhập số.",
  }),
  category: z.string(),
});

export default function CreateForm({
  product,
}: {
  product?: ProductWithDescriptionAndStorageType;
}) {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const initState = {
    brand: product?.product.brand ?? "",
    name: product?.product.name ?? "",
    description: product?.product.description ?? "",
    price: product?.product.price.toString() ?? "000000",
    rate: product?.product.rate.toString() ?? "5",
    sold_quantity: product?.product.sold_quantity.toString() ?? "0",
    category: product?.product.category ?? "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onBlur",
  });

  const [productStorages, setProductStorages] = useState<ProductStorageType[]>(
    []
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (session) {
          await createHandler({
            data: data,
            files: files,
            session: session,
            productStorages: productStorages,
          });
        } else {
          toast.error("Lỗi phiên đăng nhập.");
        }
      },
      {
        loading: "Đang tạo sản phẩm...",
        success: () => {
          form.reset();
          router.push("/dashboard/product");

          return "Tạo sản phẩm thành công. Đang chuyển hướng...";
        },
        error: "Đã có lỗi xảy ra.",
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
          <ProductStorageCheckbox
            onValuesChange={(values) => {
              setProductStorages(values);
            }}
          />
        </div>
        <div className="flex h-fit w-full flex-col xl:col-span-2">
          <h2 className="title mb-1 ml-1 text-sm font-medium">Hình sản phẩm</h2>
          <DropAndDragZone className="mt-2 w-full rounded-lg border border-foreground/10 p-16 sm:p-6" />
        </div>
        <div className="col-span-2">
          <h2 className="title mb-1 ml-1 text-sm font-medium">Mô tả</h2>
          <div className="mt-2 h-fit overflow-hidden rounded-md border">
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

async function createHandler({
  data,
  files,
  session,
  productStorages,
}: {
  data: z.infer<typeof FormSchema>;
  files: unknown[];
  session: CustomerType | StaffType;
  productStorages: ProductStorageType[];
}) {
  const editorContent = window.localStorage.getItem("content");
  const cleanedJsonString = editorContent?.replace(/\\/g, "");

  // upload description:
  const descriptionObject: ProductDescriptionType = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    content: JSON.parse(cleanedJsonString ?? "{}"),
    writer: session?.name ?? "Không rõ",
  };
  await createProductDescription(descriptionObject);

  // upload product images:
  const supabase = createSupabaseBrowserClient();
  const productImagesUploadResults: string[] = [];

  for (const file of files) {
    const uploadingFile = file as File;
    const result = await supabase.storage
      .from("public_files")
      .upload("/product_images/" + uploadingFile.name, uploadingFile, {
        upsert: true,
        duplex: "half",
      });
    if (!result.error) productImagesUploadResults.push(result.data.path);
    else {
      toast.error(`Lôi khi lưu ảnh: ${uploadingFile.name}`);
    }
  }

  if (!productImagesUploadResults.length) throw new Error("Lỗi khi lưu ảnh.");

  // upload product:
  const product: ProductType = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    brand: data.brand,
    name: data.name,
    description: data.description,
    images: productImagesUploadResults,
    price: parseInt(data.price),
    rate: parseFloat(data.rate),
    sold_quantity: parseInt(data.sold_quantity),
    description_id: descriptionObject.id,
    category: data.category,
    is_deleted: false,
  };

  const createProductResult = await createProduct({
    product: product,
    actor: {
      actorId: session.id,
      actorName: session.name,
    },
  });

  // create product_storages for this product:
  const createdProductStorages = productStorages.map((productStorage) => ({
    ...productStorage,
    product_id: product.id,
    product_name: product.name,
  }));

  for (const createdProductStorage of createdProductStorages) {
    await createProductStorage({ productStorage: createdProductStorage });
  }

  return createProductResult;
}

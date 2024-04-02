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
import ProductFormInputs from "@/app/(protected)/dashboard/product/create/Components/ProductFormInputs";
import useFiles from "@/zustand/useFiles";
import { useSession } from "@/zustand/useSession";
import {
  CustomerType,
  StaffType,
  ProductType,
  ProductDescriptionType,
  ProductWithDescriptionAndStorageType,
  ProductStorageType,
} from "@/utils/types/index";
import { useState } from "react";
import ImageFileItem from "@components/File/ImageFileItem";
import { updateProduct } from "@app/_actions/product";
import { updateProductDescription } from "@app/_actions/product_description";
import {
  createProductStorage,
  removeProductStorage,
} from "@app/_actions/product_storage";
import createSupabaseBrowserClient from "@/supabase-query/client";
import ProductStorageCheckbox from "@/app/(protected)/dashboard/product/create/Components/ProductStorageCheckbox";

const FormSchema = z.object({
  brand: z.string().min(1, { message: "Vui lòng nhập hiệu." }),
  name: z.string().min(1, { message: "Vui lòng nhập tên." }),
  description: z.string().min(1, { message: "Vui lòng nhập mô tả." }),
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
  storage_address: z.string().min(2, { message: "Vui lòng nhập địa chỉ." }),
  storage_quantity: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Vui lòng nhập số.",
    }),
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
    sold_quantity: product?.product.sold_quantity.toString() ?? "0",
    category: product?.product.category ?? "",
    storage_address: product?.storages[0]?.address ?? "",
    storage_quantity: product?.product_storages[0]?.quantity.toString() ?? "0",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onBlur",
  });

  const [updatedProductStorages, setUpdatedProductStorages] = useState<
    ProductStorageType[]
  >([]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (session) {
          const update = await updateHandler({
            formData: data,
            session: session,
            originalProduct: product,
            updatedProductImages: updatedProductImages,
            newProductImages: files,
            updatedProductStorages: updatedProductStorages,
          });

          if (
            !update.updatedProductResponse.error &&
            !update.updateProductDescriptionResponse.error
          ) {
            toast.success("Chỉnh sửa thành công.");
            router.push("/dashboard/product");
          }
        } else {
          toast.error("Lỗi đăng nhập.");
        }
      },
      {
        loading: "Đang chỉnh sửa...",
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
            defaultProductStorages={product.product_storages}
            onValuesChange={(values) => {
              setUpdatedProductStorages(values);
            }}
          />
        </div>
        <div className="mt-0.5 flex h-fit w-full flex-col xl:col-span-2">
          <div className="w-full">
            <h2 className="title mb-1 ml-1 text-sm font-medium">
              Hình sản phẩm
            </h2>
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
          </div>
          <div className="mt-5 w-full xl:mt-4">
            <h2 className="title mb-1 ml-1 text-sm font-medium">
              Thêm hình sản phẩm
            </h2>
            <DropAndDragZone className="mt-1.5 rounded-lg border border-foreground/10 p-16 sm:p-6" />
          </div>
        </div>
        <div className="col-span-2 xl:-mt-4">
          <h2 className="title mb-1 ml-1 text-sm font-medium">Mô tả</h2>
          <div className="mt-2 h-fit overflow-hidden rounded-md border">
            <Editor editable={true} />
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <Button
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

async function updateHandler({
  formData,
  session,
  originalProduct,
  updatedProductImages,
  newProductImages,
  updatedProductStorages,
}: {
  formData: z.infer<typeof FormSchema>;
  session: CustomerType | StaffType;
  originalProduct: ProductWithDescriptionAndStorageType;
  updatedProductImages: string[];
  newProductImages: File[];
  updatedProductStorages: ProductStorageType[];
}) {
  // update product:
  const supabase = createSupabaseBrowserClient();
  const newProductImagesUploadResults: string[] = [];

  for (const file of newProductImages) {
    const uploadingFile = file as File;

    const result = await supabase.storage
      .from("public_files")
      .upload("/product_images/" + uploadingFile.name, uploadingFile, {
        upsert: true,
        duplex: "half",
      });

    if (!result.error) newProductImagesUploadResults.push(result.data.path);
    else {
      toast.error("Lỗi khi lưu hình ảnh.");
    }
  }

  if (!newProductImagesUploadResults.length)
    throw new Error("Lỗi khi lưu hình ảnh.");

  const updatedProduct: ProductType = {
    id: originalProduct.product.id,
    created_at: originalProduct.product.created_at,
    brand: formData.brand,
    name: formData.name,
    description: formData.description,
    images: [...updatedProductImages, ...newProductImagesUploadResults],
    price: parseInt(formData.price),
    rate: parseFloat(formData.rate),
    sold_quantity: parseInt(formData.sold_quantity),
    description_id: originalProduct.product.description_id,
    category: formData.category,
    is_deleted: false,
  };

  const updatedProductResponse = await updateProduct({
    updatedProduct: updatedProduct,
    actor: {
      actorId: session.id,
      actorName: session.name,
    },
  });

  // update product_description:
  const editorContent = window.localStorage.getItem("content");
  const cleanedJsonString = editorContent?.replace(/\\/g, "");

  const updatedProductDescription: ProductDescriptionType = {
    id: originalProduct.product_description.id,
    created_at: originalProduct.product_description.created_at,
    content: JSON.parse(
      cleanedJsonString ?? originalProduct.product_description.content
    ),
    writer: session?.name ?? "Không rõ",
  };

  const updateProductDescriptionResponse = await updateProductDescription({
    updatedProductDescription,
  });

  // update product_storage
  for (const productStorage of originalProduct.product_storages) {
    await removeProductStorage(productStorage.id);
  }

  for (const updatedProductStorage of updatedProductStorages) {
    const result = await createProductStorage({
      productStorage: updatedProductStorage,
    });

    if (result.error) {
      throw new Error("Lỗi khi lưu kho.");
    }
  }

  return {
    updatedProductResponse,
    updateProductDescriptionResponse,
  };
}

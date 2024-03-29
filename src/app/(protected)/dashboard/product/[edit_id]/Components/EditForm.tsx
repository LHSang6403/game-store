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
  StorageType,
  ProductWithDescriptionAndStorageType,
} from "@/utils/types/index";
import { useState } from "react";
import ImageFileItem from "@components/File/ImageFileItem";
import { updateProduct } from "@app/_actions/product";
import { updateProductDescription } from "@app/_actions/product_description";
import { updateStorage } from "@app/_actions/storage";
import createSupabaseBrowserClient from "@/supabase-query/client";

const FormSchema = z.object({
  brand: z.string().min(1, { message: "Brand is a compulsory." }),
  name: z.string().min(1, { message: "Name is a compulsory." }),
  description: z.string().min(1, { message: "Description is a compulsory." }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  rate: z
    .string()
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 5,
      {
        message: "Rate must be a number between 0 and 5",
      }
    ),
  sold_quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  category: z.string(),
  storage_address: z.string().min(2, { message: "Address is a compulsory." }),
  storage_quantity: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
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
    product?.images ?? []
  );

  const initState = {
    brand: product.brand ?? product?.brand ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price.toString() ?? "1000000",
    rate: product?.rate.toString() ?? "4",
    sold_quantity: product?.sold_quantity.toString() ?? "0",
    category: product?.category ?? "",
    storage_address: product?.storage[0]?.address ?? "",
    storage_quantity: product?.storage[0]?.quantity.toString() ?? "0",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onBlur",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (session) {
          const update = await updateHandler(
            data,
            session,
            product,
            updatedProductImages,
            files
          );

          if (
            !update.updatedProductResponse.error &&
            !update.updateProductDescriptionResponse.error &&
            !update.updateStorageResponse.error
          ) {
            toast.success("Product updated successfully.");
            router.push("/dashboard/product");
          }
        } else {
          toast.error("Unknown session.");
        }
      },
      {
        loading: "Updating product...",
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
        <div className="mt-0.5 flex h-fit w-full flex-col xl:col-span-2">
          <div className="w-full">
            <h2 className="title mb-1 ml-1 text-sm font-medium">
              Product images
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
              Add more images
            </h2>
            <DropAndDragZone className="mt-1.5 rounded-lg border p-16 sm:p-6" />
          </div>
        </div>
        <div className="col-span-2 -mt-4">
          <h2 className="title mb-1 ml-1 text-sm font-medium">Description</h2>
          <div className="mt-2 h-fit overflow-hidden rounded-md border">
            <Editor editable={true} />
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <Button className="mt-1 w-fit bg-foreground px-7 text-background">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

async function updateHandler(
  data: z.infer<typeof FormSchema>,
  session: CustomerType | StaffType,
  originalProduct: ProductWithDescriptionAndStorageType,
  updatedProductImages: string[],
  newProductImages: File[]
) {
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
      toast.error(`Error uploading image: ${uploadingFile.name}`);
    }
  }

  if (!newProductImagesUploadResults.length)
    throw new Error("No image uploaded.");

  const updatedProduct: ProductType = {
    id: originalProduct.id,
    created_at: originalProduct.created_at,
    brand: data.brand,
    name: data.name,
    description: data.description,
    images: [...updatedProductImages, ...newProductImagesUploadResults],
    price: parseInt(data.price),
    rate: parseFloat(data.rate),
    sold_quantity: parseInt(data.sold_quantity),
    description_id: originalProduct.description_id,
    category: data.category,
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
    writer: session?.name ?? "Anonymous",
  };

  const updateProductDescriptionResponse = await updateProductDescription({
    updatedProductDescription,
  });

  // update storage
  const updatedStorage: StorageType = {
    id: originalProduct.storage[0].id,
    created_at: new Date().toISOString(),
    prod_id: originalProduct.storage[0].prod_id,
    prod_name: originalProduct.storage[0].prod_name,
    address: data.storage_address,
    quantity: parseInt(data.storage_quantity),
  };

  const updateStorageResponse = await updateStorage({ updatedStorage });

  return {
    updatedProductResponse,
    updateProductDescriptionResponse,
    updateStorageResponse,
  };
}

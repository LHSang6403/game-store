import * as z from "zod";
import { toast } from "sonner";
import {
  CustomerType,
  StaffType,
  ProductType,
  ProductDescriptionType,
  ProductWithDescriptionAndStorageType,
  ProductStorageType,
} from "@/utils/types/index";

import { updateProduct } from "@app/_actions/product";
import { updateProductDescription } from "@app/_actions/product_description";
import {
  createProductStorage,
  removeProductStorage,
} from "@app/_actions/product_storage";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { FormSchema } from "../Components/EditForm";

export async function updateHandler({
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
  // update product images:
  const supabase = createSupabaseBrowserClient();
  const newProductImagesUploadResults: string[] = [];

  if (newProductImages.length > 0) {
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
  }

  const updatedProduct: ProductType = {
    id: originalProduct.product.id,
    created_at: originalProduct.product.created_at,
    brand: formData.brand,
    name: formData.name,
    description: formData.description,
    images:
      newProductImagesUploadResults.length > 0
        ? [...updatedProductImages, ...newProductImagesUploadResults]
        : originalProduct.product.images,
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

  if (updatedProductResponse.error) throw new Error("Lỗi khi lưu sản phẩm.");

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

  if (updateProductDescriptionResponse.error)
    throw new Error("Lỗi khi lưu mô tả sản phẩm.");

  if (updatedProductStorages.length > 0) {
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
  }
}

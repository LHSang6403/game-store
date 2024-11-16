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
import { FormSchema } from "@app/(protected)/dashboard/product/_components/ProductForm";
import { JSONContent } from "novel";
import { Files } from "lucide-react";

export async function handleUpdate({
  formData,
  description,
  session,
  originalProduct,
  updatedProductImages,
  newProductImages,
  updatedProductStorages,
}: {
  formData: z.infer<typeof FormSchema>;
  description: JSONContent;
  session: CustomerType | StaffType;
  originalProduct: ProductWithDescriptionAndStorageType;
  updatedProductImages: string[];
  newProductImages: File[];
  updatedProductStorages: ProductStorageType[];
}) {
  // update product images:
  if (updatedProductImages.length === 0 && newProductImages.length === 0)
    throw new Error("Lỗi không có ảnh sản phẩm.");

  const supabase = createSupabaseBrowserClient();
  const newProductImagesUploadResults: string[] = [];

  if (Files.length > 0) {
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
    images: [...updatedProductImages, ...newProductImagesUploadResults],
    price: parseInt(formData.price),
    rate: parseFloat(formData.rate),
    sold_quantity: originalProduct.product.sold_quantity,
    description_id: originalProduct.product.description_id,
    category_id: Number(formData.category_id),
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
  const updatedProductDescription: ProductDescriptionType = {
    id: originalProduct.product_description.id,
    created_at: originalProduct.product_description.created_at,
    content: JSON.stringify(description),
    writer: session?.name ?? "Không rõ",
  };

  const updateProductDescriptionResponse = await updateProductDescription({
    updatedProductDescription,
  });

  if (updateProductDescriptionResponse.error)
    throw new Error("Lỗi khi lưu mô tả sản phẩm.");

  // update product_storage
  if (updatedProductStorages.length > 0) {
    for (const productStorage of originalProduct.product_storages) {
      await removeProductStorage(productStorage.id);
    }

    const productStorages = updatedProductStorages.map((productStorage) => ({
      ...productStorage,
      product_id: updatedProduct.id,
      product_name: updatedProduct.name,
    }));

    for (const updatedProductStorage of productStorages) {
      const result = await createProductStorage({
        productStorage: updatedProductStorage,
      });

      if (result.error) {
        throw new Error("Lỗi khi lưu kho.");
      }
    }
  }

  return { updatedProductResponse };
}

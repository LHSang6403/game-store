import { useQuery } from "@tanstack/react-query";
import { readProductDetailById } from "@app/(main)/product/_actions/product";
import type { ProductWithDescriptionAndStorageType } from "@utils/types/index";

export default function useProductQuery({ id }: { id: string }) {
  const queryKey = ["product", id];

  const queryFn = async () => {
    return await readProductDetailById(id).then(
      (result) => result.data as ProductWithDescriptionAndStorageType
    );
  };

  const staleTime = 1000 * 60 * 60;

  return useQuery({ queryKey, queryFn, staleTime });
}

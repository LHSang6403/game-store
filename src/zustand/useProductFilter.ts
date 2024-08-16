import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_PRICE = 50000000;

export type ProductFilter = {
  brands: string[];
  categories: string[];
  startPrice: number;
  endPrice: number;
  setFilter: (filter: ProductFilter) => void;
  setBrands: (brands: string[]) => void;
  setCategories: (categories: string[]) => void;
  setPrice: (startPrice: number, endPrice: number) => void;
  removeAllFilters: () => void;
};

const useProductFilter = create<ProductFilter>()(
  persist(
    (set) => ({
      brands: [],
      categories: [],
      startPrice: 0,
      endPrice: MAX_PRICE,
      setFilter: (filter: ProductFilter) => set(filter),
      setBrands: (brands: string[]) => set({ brands }),
      setCategories: (categories: string[]) => set({ categories }),
      setPrice: (startPrice: number, endPrice: number) =>
        set({ startPrice, endPrice }),
      removeAllFilters: () =>
        set({ brands: [], categories: [], startPrice: 0, endPrice: MAX_PRICE }),
    }),
    {
      name: "product-filter", // key for localStorage
    }
  )
);

export default useProductFilter;

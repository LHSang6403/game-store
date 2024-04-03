import { create } from "zustand";
import type { ProductWithDescriptionAndStorageType } from "@utils/types/index";
import { generate } from "randomstring";
import { OrderType } from "@utils/types/index";

interface OrderState {
  order: OrderType | null;
  setNewID: () => void;
  setPrices: (shipping_fee: number, insurance_fee: number) => void;
  addProduct: (prod: ProductWithDescriptionAndStorageType) => void;
  removeProduct: (id: string) => void;
  removeAll: () => void;
}

export const useOrder = create<OrderState>((set) => ({
  order: null,
  setNewID: () =>
    set((state: OrderState) => {
      if (state.order) {
        return {
          order: {
            ...state.order,
            id: generate(12),
          },
        };
      } else {
        return state;
      }
    }),
  setPrices: (shipping_fee: number, insurance_fee: number) => {
    set((state: OrderState) => {
      if (state.order) {
        return {
          order: {
            ...state.order,
            shipping_fee: shipping_fee,
            insurance_fee: insurance_fee, // currrently not used
            total_price: state.order.price + shipping_fee,
          },
        };
      } else {
        return state;
      }
    });
  },
  addProduct: (prod: ProductWithDescriptionAndStorageType) =>
    set((state: OrderState) => {
      if (!state.order) {
        return { order: createOrderFromProduct(prod) };
      }

      const updatedOrder = { ...state.order };
      updatedOrder.products.push(prod);
      updatedOrder.price += prod.product.price;

      return {
        order: updatedOrder,
      };
    }),
  removeProduct: (id: string) =>
    set((state: OrderState) => {
      if (state.order) {
        const updatedOrder = { ...state.order };

        const index = updatedOrder.products.findIndex(
          (prod) => prod.product.id === id
        );

        if (index !== -1) {
          updatedOrder.price -= updatedOrder.products[index].product.price;
          updatedOrder.products.splice(index, 1);
        }

        if (updatedOrder.products.length === 0) {
          return { order: null };
        }

        return { order: updatedOrder };
      } else {
        return state;
      }
    }),
  removeAll: () => set(() => ({ order: null })),
}));

function createOrderFromProduct(
  prod: ProductWithDescriptionAndStorageType
): OrderType {
  return {
    id: generate(12),
    created_at: new Date().toISOString(),
    shipment_name: "",
    shipment_label_code: "",
    products: [prod],
    state: "pending",
    customer_id: "",
    customer_name: "Không rõ",
    customer_phone: "",
    price: prod.product.price,
    shipping_fee: 0,
    insurance_fee: 0,
    total_price: 0,
    note: "",
    address: "",
    ward: "",
    district: "",
    province: "",
    pick_address: "",
    pick_ward: "",
    pick_district: "",
    pick_province: "",
    weight: 500,
  };
}

import { create } from "zustand";
import type { OrderType } from "@utils/types";
import type { ProductWithDescriptionAndStorageType } from "@utils/types/index";
import { v4 as uuidv4 } from "uuid";

interface OrderState {
  order: OrderType | null;
  setShipment: (
    shipment_name: "" | "GHTK" | "GHN" | "VNPost" | "NinjaVan" | "J&T" | null,
    shipment_label: string | null
  ) => void;
  addProduct: (prod: ProductWithDescriptionAndStorageType) => void;
  removeProduct: (id: string, price: number) => void;
  removeAll: () => void;
  increaseQuantity: (id: string, price: number) => void;
  decreaseQuantity: (id: string, price: number) => void;
}

export const useOrder = create<OrderState>((set) => ({
  order: null,
  setShipment: (
    name: "" | "GHTK" | "GHN" | "VNPost" | "NinjaVan" | "J&T" | null,
    label: string | null
  ) =>
    set((state: OrderState) => {
      if (state.order) {
        return {
          order: {
            ...state.order,
            shipment_name: name,
            shipment_label: label,
          },
        };
      } else {
        return state;
      }
    }),
  addProduct: (prod: ProductWithDescriptionAndStorageType) =>
    set((state: OrderState) => {
      if (!state.order) {
        // add at the first time
        return { order: createOrderFromProduct(prod) };
      }

      const updatedOrder = createOrderFromProduct(prod);
      const updatedState = {
        ...state,
        order: updateOrderWithExistingProduct(state.order, updatedOrder),
      };
      return updatedState;
    }),
  removeProduct: (id: string, price: number) =>
    set((state: OrderState) => {
      if (state.order) {
        const updatedOrder = { ...state.order };
        const index = updatedOrder.prod_ids.indexOf(id);

        if (index !== -1) {
          updatedOrder.price -= updatedOrder.prod_quantities[index] * price; // error price
          updatedOrder.prod_ids.splice(index, 1);
          updatedOrder.prod_names.splice(index, 1);
          updatedOrder.prod_quantities.splice(index, 1);
        }

        if (updatedOrder.prod_ids?.length === 0) {
          // remove all if no product left
          return { order: null };
        }

        return { order: updatedOrder };
      } else {
        return state;
      }
    }),
  removeAll: () => set(() => ({ order: null })),
  increaseQuantity: (id: string, price: number) =>
    set((state: OrderState) => {
      if (state.order) {
        const updatedOrder = { ...state.order };
        const index = updatedOrder.prod_ids.indexOf(id);

        if (index !== -1) {
          updatedOrder.prod_quantities[index] += 1;
          updatedOrder.price += price;
        }

        return { order: updatedOrder };
      } else {
        return state;
      }
    }),
  decreaseQuantity: (id: string, price: number) =>
    set((state: OrderState) => {
      if (state.order) {
        const updatedOrder = { ...state.order };
        const index = updatedOrder.prod_ids.indexOf(id);

        if (index !== -1) {
          updatedOrder.prod_quantities[index] -= 1;
          updatedOrder.price -= price;
        }

        if (updatedOrder.prod_quantities[index] === 0) {
          updatedOrder.prod_ids.splice(index, 1);
          updatedOrder.prod_names.splice(index, 1);
          updatedOrder.prod_quantities.splice(index, 1);
        }

        if (updatedOrder.prod_ids?.length === 0) {
          return { order: null };
        }

        return { order: updatedOrder };
      } else {
        return state;
      }
    }),
}));

function createOrderFromProduct(
  prod: ProductWithDescriptionAndStorageType
): OrderType {
  return {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    shipment_name: "",
    shipment_label: "",
    prod_ids: [prod.id],
    prod_names: [prod.name],
    prod_quantities: [1],
    state: "pending",
    customer_id: "anonymous",
    customer_name: "anonymous",
    price: prod.price,
    note: "",
    address: "",
  };
}

function updateOrderWithExistingProduct(
  order: OrderType,
  newOrder: OrderType
): OrderType {
  const updatedOrder = { ...order };

  newOrder.prod_ids.forEach((prodId, index) => {
    const existingIndex = updatedOrder.prod_ids.indexOf(prodId);
    if (existingIndex !== -1) {
      updatedOrder.prod_quantities[existingIndex] +=
        newOrder.prod_quantities[index];
    } else {
      updatedOrder.prod_ids.push(prodId);
      updatedOrder.prod_names.push(newOrder.prod_names[index]);
      updatedOrder.prod_quantities.push(newOrder.prod_quantities[index]);
    }
  });
  updatedOrder.price += newOrder.price;
  return updatedOrder;
}

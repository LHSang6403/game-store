import { create } from "zustand";
import type { ProductWithDescriptionAndStorageType } from "@utils/types/index";
import { v4 as uuidv4 } from "uuid";
import type { ShipmentNameType, OrderType } from "@utils/types/index";

interface OrderState {
  order: OrderType | null;
  setShipment: (
    shipment_name: ShipmentNameType,
    shipment_label: string | null
  ) => void;
  setPrices: (shipping_fee: number, insurance_fee: number) => void;
  addProduct: (prod: ProductWithDescriptionAndStorageType) => void;
  removeProduct: (id: string) => void;
  removeAll: () => void;
}

export const useOrder = create<OrderState>((set) => ({
  order: null,
  setShipment: (name: ShipmentNameType, label: string | null) =>
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
  setPrices: (shipping_fee: number, insurance_fee: number) => {
    set((state: OrderState) => {
      if (state.order) {
        return {
          order: {
            ...state.order,
            shipping_fee: shipping_fee,
            insurance_fee: insurance_fee,
            total_price: state.order.price + shipping_fee + insurance_fee,
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
      updatedOrder.price += prod.price;

      return {
        order: updatedOrder,
      };
    }),
  removeProduct: (id: string) =>
    set((state: OrderState) => {
      if (state.order) {
        const updatedOrder = { ...state.order };

        const index = updatedOrder.products.findIndex((prod) => prod.id === id);

        if (index !== -1) {
          updatedOrder.price -= updatedOrder.products[index].price;
          updatedOrder.products.splice(index, 1);
        }

        if (updatedOrder.products.length === 0) {
          return { order: null };
        }

        console.log("---- resultOrder", updatedOrder);

        //Bug: can not update ui ???
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
    id: uuidv4(),
    created_at: new Date().toISOString(),
    shipment_name: "",
    shipment_label: "",
    products: [prod],
    state: "pending",
    customer_id: "anonymous",
    customer_name: "anonymous",
    price: prod.price,
    shipping_fee: 0,
    insurance_fee: 0,
    total_price: 0,
    note: "",
    address: "255 đường 30/4",
    ward: "Phường 3",
    district: "Tp. Tây Ninh",
    province: "Tây Ninh",
    pick_address: "227, Nguyễn Văn Cừ",
    pick_ward: "Phường 4",
    pick_district: "Quận 5",
    pick_province: "TP. Hồ Chí Minh",
    weight: 500, // dynamic after
  };
}

import { create } from "zustand";
import type { ProductWithDescriptionAndStorageType } from "@utils/types/index";
import { v4 as uuidv4 } from "uuid";
import type { ShipmentNameType, OrderType } from "@utils/types/index";
import { getShipmentFees, OrderFeesParams } from "@app/_actions/GHTKShipment";

interface OrderState {
  order: OrderType | null;
  setShipment: (
    shipment_name: ShipmentNameType,
    shipment_label: string | null
  ) => void;
  addProduct: (prod: ProductWithDescriptionAndStorageType) => void;
  removeProduct: (id: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string, price: number) => void;
  decreaseQuantity: (id: string, price: number) => void;
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
  addProduct: (prod: ProductWithDescriptionAndStorageType) =>
    set((state: OrderState) => {
      let updatedOrder: OrderType | null = state.order;
      if (!updatedOrder) updatedOrder = createOrderFromProduct(prod);
      else updatedOrder.products.push(prod);

      const resultOrder = updateOrderPrices(updatedOrder);

      return { ...state, order: resultOrder };
    }),
  removeProduct: (id: string) =>
    set((state: OrderState) => {
      if (state.order) {
        const updatedOrder = { ...state.order };

        // auto get the first index of  products if have same id
        const index = updatedOrder.products.findIndex((prod) => prod.id === id);

        if (index !== -1) {
          updatedOrder.products.splice(index, 1);
        }

        if (updatedOrder.products.length === 0) {
          return { order: null };
        }

        const resultOrder = updateOrderPrices(updatedOrder);
        console.log("---- resultOrder", resultOrder);

        // can not update ui ???
        return { order: resultOrder };
      } else {
        return state;
      }
    }),
  removeAll: () => set(() => ({ order: null })),
  increaseQuantity: (id: string, price: number) =>
    set((state: OrderState) => {
      if (state.order) {
        const updatedOrder = { ...state.order };
        const index = updatedOrder.products.findIndex((prod) => prod.id === id);

        if (index !== -1) {
          updatedOrder.price += price;
        }

        updateOrderPrices(updatedOrder);
        return { order: updatedOrder };
      } else {
        return state;
      }
    }),
  decreaseQuantity: (id: string, price: number) =>
    set((state: OrderState) => {
      if (state.order) {
        const updatedOrder = { ...state.order };
        const index = updatedOrder.products.findIndex((prod) => prod.id === id);

        if (index !== -1) {
          updatedOrder.price -= price;
        }

        updateOrderPrices(updatedOrder);
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
    products: [prod],
    state: "pending",
    customer_id: "anonymous",
    customer_name: "anonymous",
    price: prod.price,
    shipping_fee: 0,
    insurance_fee: 0,
    total_price: prod.price,
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

function updateOrderPrices(order: OrderType) {
  const orderTemp = { ...order };

  // re-calculating total price
  orderTemp.total_price = 0;
  for (const product of order.products) {
    orderTemp.total_price += product.price;
  }
  orderTemp.price = orderTemp.total_price;

  // const params: OrderFeesParams = {
  //   pick_province: order.pick_province,
  //   pick_district: order.pick_district,
  //   pick_ward: order.pick_ward,
  //   pick_address: order.pick_address,
  //   province: order.province,
  //   district: order.district,
  //   ward: order.ward,
  //   address: order.address,
  //   weight: order.weight,
  //   value: order.price,
  //   deliver_option: "xteam",
  // };

  // const calResponse = await getShipmentFees(params);

  // if (calResponse.success && calResponse.fee) {
  //   // being bug here
  //   const shippingFee = calResponse.fee.fee ?? 0;
  //   const insuranceFee = calResponse.fee.insurance_fee ?? 0;

  //   totalPrice += shippingFee + insuranceFee;

  //   order.shipping_fee = shippingFee;
  //   order.insurance_fee = insuranceFee;
  //   order.total_price = totalPrice;

  //   console.log("---- order in update fees", order);
  // }

  return orderTemp;
}

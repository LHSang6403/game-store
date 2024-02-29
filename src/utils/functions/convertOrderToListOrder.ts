import type { OrderType } from "@utils/types";

export default function convertOrderToListOrder(
  order: OrderType | null
): OrderType[] {
  if (!order) return [];
  const {
    id,
    created_at,
    prod_ids,
    prod_names,
    prod_quantities,
    state,
    customer_id,
    customer_name,
    price,
    address,
    note,
  } = order;
  const orderList: OrderType[] = [];
  for (let i = 0; i < prod_ids?.length; i++) {
    const singleOrder: OrderType = {
      id,
      created_at,
      shipment_name: "",
      shipment_label: "",
      prod_ids: [prod_ids[i]],
      prod_names: [prod_names[i]],
      prod_quantities: [prod_quantities[i]],
      state,
      customer_id,
      customer_name,
      price,
      address,
      note,
    };
    orderList.push(singleOrder);
  }
  return orderList;
}

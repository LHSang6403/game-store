export interface StaffType {
  id: string; // p_key
  created_at: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  image: string;
  role: "Seller" | "Writer" | "Manager";
}

export interface CustomerType {
  id: string; // p_key
  created_at: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  level: number;
  image: string;
  address: string;
  ward: string;
  district: string;
  province: string;
}

export interface ProductType {
  id: string; // p_key
  created_at: string;
  brand: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  rate: number;
  sold_quantity: number;
  description_id: string; // f_key
  category: string;
  is_deleted: boolean;
}

export interface ProductDescriptionType {
  id: string; // p_key
  created_at: string;
  content: any;
  writer: string;
}

export interface ProductWithDescriptionAndStorageType {
  product: ProductType;
  product_description: ProductDescriptionType;
  product_storages: ProductStorageType[];
  storages: StorageType[];
}

export type ShipmentNameType = "" | "GHTK" | "GHN" | null;

export type ShipmentState =
  | "pending"
  | "shipping"
  | "delivered"
  | "canceled"
  | "returned";

export interface OrderType {
  id: string;
  created_at: string;
  shipment_name: ShipmentNameType;
  shipment_label_code: string | null;
  products: ProductWithDescriptionAndStorageType[];
  state: ShipmentState;
  customer_id: string; // f_key
  customer_name: string;
  customer_phone: string;
  price: number;
  shipping_fee: number; // api call
  insurance_fee: number; // api call
  total_price: number;
  note: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  pick_address: string;
  pick_ward: string;
  pick_district: string;
  pick_province: string;
  weight: number;
}

export interface BlogType {
  id: string;
  created_at: string;
  title: string;
  description: string;
  content: any;
  thumbnails: string[];
  writer: string;
  is_deleted: boolean;
}

export interface ProductStorageType {
  id: string; // p_key
  created_at: string;
  product_id: string; // f_key
  storage_id: string; // f_key
  quantity: number;
  product_name: string;
  storage_name: string;
}

export interface StorageType {
  id: string; // p_key
  created_at: string;
  name: string;
  address: string;
  ward: string;
  district: string;
  province: string;
}

export interface StorageWithProductStorageType {
  id: string;
  created_at: string;
  name: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  product_storage: ProductStorageType[];
}

export interface LogType {
  id: string;
  created_at: string;
  name: string;
  actor_id: string;
  actor_name: string;
  type: string;
  result: string;
}

export interface FileWithPreview extends File {
  preview: string;
}

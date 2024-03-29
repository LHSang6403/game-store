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
  name: string; // p_key
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
  comments: string[];
}

export interface ProductWithDescriptionAndStorageType {
  id: string;
  created_at: string;
  brand: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  rate: number;
  sold_quantity: number;
  description_id: string;
  category: string;
  is_deleted: boolean;
  product_description: ProductDescriptionType;
  storage: StorageType[];
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
  content: string;
  images: string[];
  writer: string;
  likes: number;
  comments: string[];
}

export interface StorageType {
  id: string; // p_key
  created_at: string;
  address: string;
  prod_id: string; // f_key
  prod_name: string; // f_key
  quantity: number;
}

export interface LogType {
  id: string;
  created_at: string;
  title: string;
  actor: string;
  interface: string;
  result: string;
}

export interface FileWithPreview extends File {
  preview: string;
}

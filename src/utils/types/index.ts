export interface StaffType {
  id: string;
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
  role: StaffRole;
}

export type StaffRole = "Bán hàng" | "Biên tập" | "Quản lý";

export interface CustomerType {
  id: string;
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
}

export interface ProductDescriptionType {
  id: string;
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

export interface ProductWithQuantity {
  product: ProductWithDescriptionAndStorageType;
  quantity: number;
}

export type ShipmentNameType = "" | "GHTK" | "GHN" | null;

export type ShipmentState =
  | "Đang chờ"
  | "Đang giao"
  | "Đã giao"
  | "Đã hủy"
  | "Đã trả hàng";

export interface OrderType {
  id: string;
  created_at: string;
  shipment_name: ShipmentNameType;
  shipment_label_code: string | null;
  products: ProductWithDescriptionAndStorageType[];
  state: ShipmentState;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  price: number;
  shipping_fee: number;
  insurance_fee: number;
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
  pick_storage_id: string;
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
  id: string;
  created_at: string;
  product_id: string;
  storage_id: string;
  quantity: number;
  product_name: string;
  storage_name: string;
}

export interface InsertedProductStorageType {
  product_storage_id: string;
  storage_name: string;
  inserted_quantity: number;
  product_name: string;
}

export interface StorageType {
  id: string;
  created_at: string;
  name: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  area: string;
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

export interface LogActorType {
  actorId: string;
  actorName: string;
}

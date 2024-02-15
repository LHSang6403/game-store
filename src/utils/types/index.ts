export interface Admin {
  id: string;
  created_at: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  image: string;
}

export interface Staff {
  id: string;
  created_at: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  level: number;
  image: string;
}

export interface Writer {
  id: string;
  created_at: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  image: string;
  blog_quantity: string;
}

export interface CustomerType {
  id: string;
  created_at: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  level: number;
  image: string;
}

export interface ProductType {
  id: string;
  created_at: string;
  brand: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  option: string[];
  rate: number;
  sold_quantity: number;
  description_id: string;
  category: string;
}

export interface ProductDescriptionType {
  id: string;
  created_at: string;
  content: string;
  images: string[];
  writer: string;
  comments: string[];
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

export interface OrderType {
  id: string;
  created_at: string;
  prod_id: string;
  prod_name: string;
  state: string;
  customer: string;
  price: number;
}

export interface StorageType {
  id: string;
  created_at: string;
  name: string;
  address: string;
  prod_id: string;
  prod_name: string;
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

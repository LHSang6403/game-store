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

export interface Customer {
  id: string;
  created_at: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  level: number;
  image: string;
}

export interface Product {
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

export interface ProductDescription {
  id: string;
  created_at: string;
  content: string;
  images: string[];
  writer: string;
  comments: string[];
}

export interface Blog {
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

export interface Order {
  id: string;
  created_at: string;
  prod_id: string;
  prod_name: string;
  state: string;
  customer: string;
  price: number;
}

export interface Storage {
  id: string;
  created_at: string;
  name: string;
  address: string;
  prod_id: string;
  prod_name: string;
  quantity: number;
}

export interface Log {
  id: string;
  created_at: string;
  title: string;
  actor: string;
  interface: string;
  result: string;
}

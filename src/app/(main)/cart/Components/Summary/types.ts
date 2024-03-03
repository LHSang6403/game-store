export interface ProductRequest {
  name: string;
  quantity: number;
  weight: number;
}

export interface OrderRequest {
  id: string;
  pick_name: string;
  pick_province: string;
  pick_district: string;
  pick_ward: string;
  pick_address: string;
  pick_tel: string;
  tel: string;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  hamlet: string;
  is_freeship: string;
  pick_money: number;
  note: string;
  value: number;
  pick_option: string;
  email: string;
  return_email: string;
}

export interface OrderFeesParams {
  pick_province: string;
  pick_district: string;
  pick_ward: string;
  pick_address: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  weight: number;
  value: number;
  deliver_option: "xteam";
}

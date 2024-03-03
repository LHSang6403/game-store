import { create } from "zustand";

interface useAddressSelectsState {
  values: {
    address: string;
    province: string;
    provinceId: string;
    district: string;
    districtId: string;
    commune: string;
    communeId: string;
  };
  setAddress: (address: string) => void;
  setProvince: (province: string, provinceId: string) => void;
  setDistrict: (district: string, districtId: string) => void;
  setCommune: (commune: string, communeId: string) => void;
  clearAll: () => void;
}

const useAddressSelects = create<useAddressSelectsState>((set) => ({
  values: {
    address: "",
    province: "",
    provinceId: "",
    district: "",
    districtId: "",
    commune: "",
    communeId: "",
  },
  setAddress: (address: string) =>
    set((state) => ({ values: { ...state.values, address } })),
  setProvince: (province: string, provinceId: string) =>
    set((state) => ({ values: { ...state.values, province, provinceId } })),
  setDistrict: (district: string, districtId: string) =>
    set((state) => ({ values: { ...state.values, district, districtId } })),
  setCommune: (commune: string, communeId: string) =>
    set((state) => ({ values: { ...state.values, commune, communeId } })),
  clearAll: () => {},
}));

export default useAddressSelects;

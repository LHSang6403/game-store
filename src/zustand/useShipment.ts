// import { create } from "zustand";
// import type { OrderRequest } from "@/app/(main)/cart/Components/Summary/types";
// import type { CustomerType, OrderType } from "@/utils/types";
// import { generate } from "randomstring";

// interface ShipmentState {
//   shipment: {
//     name: "" | "GHTK" | "GHN" | null;
//     data: {} | null;
//   };
//   setShipment: (name: string, label: string | null) => void;
//   create: (name: string, label: string | null) => void;
//   cancel: (label: string) => void;
//   getStatus: (label: string) => void;
//   getFees: (params: any) => void;
//   print: (label: string) => void;
// }

// export const useShipment = create<ShipmentState>((set) => ({
//   shipment: {
//     name: "",
//     data: null,
//   },
//   setShipment: (name: string, label: string | null) => {
//     console.log("setShipment", name, label);
//   },
//   create: (name: string, label: string | null) => {
//     console.log("create", name, label);
//   },
//   cancel: (label: string) => {
//     console.log("cancel", label);
//   },
//   getStatus: (label: string) => {
//     console.log("getStatus", label);
//   },
//   getFees: (params: any) => {
//     console.log("getFees", params);
//   },
//   print: (label: string) => {
//     console.log("print", label);
//   },
// }));


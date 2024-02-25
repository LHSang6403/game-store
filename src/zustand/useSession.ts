import { create } from "zustand";
import type { CustomerType, StaffType } from "@utils/types";

interface SessionState<T extends CustomerType  | StaffType> {
  session: T | null;
  setSession: (session: T) => void;
  removeSession: () => void;
}

export const useSession = create<
  SessionState<CustomerType  | StaffType>
>((set) => ({
  session: null,
  setSession: (session: CustomerType  | StaffType | null) =>
    set({ session }),
  removeSession: () => set({ session: null }),
}));

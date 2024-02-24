import { create } from "zustand";
import type { CustomerType, AdminType, StaffType } from "@utils/types";

interface SessionState<T extends CustomerType | AdminType | StaffType> {
  session: T | null;
  setSession: (session: T) => void;
  removeSession: () => void;
}

export const useSession = create<
  SessionState<CustomerType | AdminType | StaffType>
>((set) => ({
  session: null,
  setSession: (session: CustomerType | AdminType | StaffType | null) =>
    set({ session }),
  removeSession: () => set({ session: null }),
}));

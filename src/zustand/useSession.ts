import { create } from "zustand";
import type { CustomerType, StaffType } from "@utils/types";

interface SessionState<T extends CustomerType | StaffType> {
  session: T | null;
  isAdmin: boolean;
  isStaff: boolean;
  isCustomer: boolean;
  isUnknown: boolean;
  setSession: (session: T) => void;
  removeSession: () => void;
}

export const useSession = create<SessionState<CustomerType | StaffType>>(
  (set) => ({
    session: null,
    isAdmin: false,
    isStaff: false,
    isCustomer: false,
    isUnknown: true,
    setSession: (session) => {
      set({
        session: session,
        isAdmin: session && "role" in session && session?.role === "Quản lý",
        isStaff: session && "role" in session,
        isCustomer: session && "level" in session,
        isUnknown: false,
      });
    },
    removeSession: () => {
      set({
        session: null,
        isAdmin: false,
        isStaff: false,
        isCustomer: false,
        isUnknown: true,
      });
    },
  })
);

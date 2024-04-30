import { create } from "zustand";
import type { CustomerType, StaffType } from "@utils/types";
import { persist } from "zustand/middleware";

export interface SessionState {
  session: CustomerType | StaffType | null;
  isAdmin: boolean;
  isStaff: boolean;
  isCustomer: boolean;
  isUnknown: boolean;
  setSession: (session: CustomerType | StaffType) => void;
  removeSession: () => void;
}

export const useSession = create(
  persist(
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
    }),
    {
      name: "session-storage",
    }
  )
);

import { create } from "zustand";
import type {
  CustomerType,
  AdminType,
  StaffType,
  WriterType,
} from "@utils/types";

interface SessionState<
  T extends CustomerType | AdminType | StaffType | WriterType
> {
  session: T | null;
  setSession: (session: T) => void;
  removeSession: () => void;
}

export const useSession = create<
  SessionState<CustomerType | AdminType | StaffType | WriterType>
>((set) => ({
  session: null,
  setSession: (
    session: CustomerType | AdminType | StaffType | WriterType | null
  ) => set({ session }),
  removeSession: () => set({ session: null }),
}));

import { create } from "zustand";

interface useFilesState {
  date: {
    day: number;
    month: number;
    year: number;
  };
  setDay: (day: number) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  clearDate: () => void;
}

const useDateSelect = create<useFilesState>((set) => ({
  date: {
    day: 1,
    month: 1,
    year: new Date().getFullYear(),
  },
  setDay: (day: number) => set((state) => ({ date: { ...state.date, day } })),
  setMonth: (month: number) =>
    set((state) => ({ date: { ...state.date, month } })),
  setYear: (year: number) =>
    set((state) => ({ date: { ...state.date, year } })),
  clearDate: () => set({ date: { day: 0, month: 0, year: 0 } }),
}));

export default useDateSelect;

import { create } from "zustand";

interface useFilesState {
  files: unknown[];
  saveFiles: (newFiles: unknown[]) => void;
  clearFiles: () => void;
}

const useFiles = create<useFilesState>((set) => ({
  files: [],
  saveFiles: (newFiles: unknown[]) => set({ files: newFiles }),
  clearFiles: () => set({ files: [] }),
}));

export default useFiles;

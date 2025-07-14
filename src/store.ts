import { create } from "zustand/react";

export const useLottaryStore = create((set) => ({
  lottaryName: "",
  setLottaryName: (name: string) => set({ lottaryName: name }),
}));

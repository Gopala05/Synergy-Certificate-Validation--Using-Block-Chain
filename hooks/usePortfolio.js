import { create } from "zustand";

export const usePortfolio = create((set) => ({
  page: "Profile",
  setPage: (page) => set({ page }),
  initialize: (page) => {
    set({ page });
  },
}));

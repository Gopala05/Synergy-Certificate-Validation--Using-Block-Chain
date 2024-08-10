import { create } from "zustand";

export const useUpgradeHook = create((set) => ({
  subscription: "bronze",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setSubscription: (subscription) => set({ subscription }),
  initialize: () => {
    const userData = localStorage.getItem("user-info");
    if (userData) {
      const user = JSON.parse(userData);
      set({ subscription: user.subscription || "bronze" });
    }
  },
}));

import { create } from "zustand";

interface Props {
  subscription: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const upgradeHook = create<Props>((set) => ({
  subscription: "bronze",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

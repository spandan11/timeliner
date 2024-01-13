import { create } from "zustand";

type ToggleType = {
  isOpen: boolean;
  toggle: () => void;
};

export const useToggle = create<ToggleType>()((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

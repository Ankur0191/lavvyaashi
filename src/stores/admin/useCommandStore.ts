import { create } from "zustand";

interface CommandState {
  isOpen: boolean;
  toggleCommand: () => void;
  setCommandOpen: (open: boolean) => void;
}

export const useCommandStore = create<CommandState>((set) => ({
  isOpen: false,
  toggleCommand: () => set((state) => ({ isOpen: !state.isOpen })),
  setCommandOpen: (open) => set({ isOpen: open }),
}));

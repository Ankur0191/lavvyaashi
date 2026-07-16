import { create } from "zustand";

interface SidebarState {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: true,
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setSidebarExpanded: (expanded) => set({ isExpanded: expanded }),
}));

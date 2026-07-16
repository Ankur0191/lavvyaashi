import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "./useAuthStore";

interface CartItem {
  id?: string; // Supabase cart_item ID
  productId: string;
  product: any;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  addItem: (product: any, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // Computed
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      addItem: async (product, quantity = 1) => {
        set({ isLoading: true });
        const { items } = get();
        const existingItem = items.find((i) => i.productId === product.id);
        
        let newItems;
        if (existingItem) {
          newItems = items.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          newItems = [...items, { productId: product.id, product, quantity }];
        }
        
        // Sync to Supabase if logged in
        const user = useAuthStore.getState().user;
        if (user) {
          const supabase = createClient();
          if (existingItem) {
            await supabase
              .from("cart_items")
              .update({ quantity: existingItem.quantity + quantity })
              .eq("user_id", user.id)
              .eq("product_id", product.id);
          } else {
            await supabase
              .from("cart_items")
              .insert({ user_id: user.id, product_id: product.id, quantity });
          }
        }

        set({ items: newItems, isLoading: false, isOpen: true });
      },

      removeItem: async (productId) => {
        set({ isLoading: true });
        const user = useAuthStore.getState().user;
        if (user) {
          const supabase = createClient();
          await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", user.id)
            .eq("product_id", productId);
        }
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
          isLoading: false,
        }));
      },

      updateQuantity: async (productId, quantity) => {
        if (quantity < 1) return get().removeItem(productId);
        
        set({ isLoading: true });
        const user = useAuthStore.getState().user;
        if (user) {
          const supabase = createClient();
          await supabase
            .from("cart_items")
            .update({ quantity })
            .eq("user_id", user.id)
            .eq("product_id", productId);
        }
        
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
          isLoading: false,
        }));
      },

      clearCart: async () => {
        set({ isLoading: true });
        const user = useAuthStore.getState().user;
        if (user) {
          const supabase = createClient();
          await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", user.id);
        }
        set({ items: [], isLoading: false });
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "lavvyaashi-cart",
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);

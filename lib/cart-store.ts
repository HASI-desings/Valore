import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  size: string;
  color: string;
  priceRs: number;
  quantity: number;
  imageUrl: string;
  outOfStock?: boolean; // flagged at checkout stock re-check, per security.md
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  flagOutOfStock: (productId: string, size: string, color: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  subtotalRs: () => number;
}

// lib/cart-store.ts is the ONLY source of truth for cart state (rules.md).
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              isDrawerOpen: true,
            };
          }
          return { items: [...state.items, item], isDrawerOpen: true };
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.size === size && i.color === color)
          ),
        })),

      updateQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),

      flagOutOfStock: (productId, size, color) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, outOfStock: true }
              : i
          ),
        })),

      clear: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      subtotalRs: () =>
        get().items.reduce((sum, i) => sum + i.priceRs * i.quantity, 0),
    }),
    { name: "valore-cart" } // localStorage key — cart persists across reload (Phase 4 done-when)
  )
);

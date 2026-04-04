import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Recipe } from "@/types/recipe";

export interface CartItem {
  recipe: Recipe;
  quantity: number;
}

interface StoreState {
  favorites: Recipe[];
  cart: CartItem[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  addToCart: (recipe: Recipe) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  getCartCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],

      addFavorite: (recipe) =>
        set((state) => ({
          favorites: state.favorites.some((f) => f.id === recipe.id)
            ? state.favorites
            : [...state.favorites, recipe],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),

      isFavorite: (id) => get().favorites.some((f) => f.id === id),

      addToCart: (recipe) =>
        set((state) => {
          const existing = state.cart.find((c) => c.recipe.id === recipe.id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.recipe.id === recipe.id
                  ? { ...c, quantity: c.quantity + 1 }
                  : c
              ),
            };
          }
          return { cart: [...state.cart, { recipe, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.recipe.id !== id),
        })),

      updateCartQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { cart: state.cart.filter((c) => c.recipe.id !== id) };
          }
          return {
            cart: state.cart.map((c) =>
              c.recipe.id === id ? { ...c, quantity } : c
            ),
          };
        }),

      getCartCount: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: "foodiehub-storage",
    }
  )
);

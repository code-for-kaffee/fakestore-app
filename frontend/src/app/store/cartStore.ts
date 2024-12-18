import { Product } from '@/types/product';
import { create } from 'zustand';

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;
    const productExists = cart.find((item) => item.id === product.id);
    console.log(productExists)

    if (productExists) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity ? item.quantity + 1 : 1,
              }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, product] });
    }
  },

  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.id !== productId) });
  },

  clearCart: () => set({ cart: [] }),
}));

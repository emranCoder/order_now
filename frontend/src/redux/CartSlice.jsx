import { createSlice } from "@reduxjs/toolkit";

const CartSLice = createSlice({
  name: "toast",
  initialState: {
    size: 0,
    cartProduct: [],
    total: 0,
  },
  reducers: {
    addCart: (state, action) => {
      const { total, size, data } = action.payload;
      state.size = size;
      state.total = total;
      const existingProduct = state.cartProduct.find(
        (item) => item.id === data.id
      );
      if (existingProduct) {
        // If product already exists in cart, increase its frequency
        state = {
          ...state,
          cartProduct: state.cartProduct.map((item) =>
            item.id === data.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If product doesn't exist in cart, add it
        state = {
          ...state,
          cart: [...state.cartProduct, { ...action.payload.data, quantity: 1 }],
        };
      }
    },
    updateCart: (state, action) => {
      state = [
        {
          ...state,
          cartProduct: state.cartProduct.filter(
            (item) => item.id !== action.payload
          ),
        },
      ];
    },
  },
});

export const { addCart, updateCart } = CartSLice.actions;

export default CartSLice.reducer;

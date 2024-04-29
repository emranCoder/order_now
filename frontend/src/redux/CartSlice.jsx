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
      const { total, size, ...data } = action.payload;
      state.size = size;
      state.total = total;
      const istExist = state.cartProduct.find((item) => item.id === data.id);
      if (istExist) {
        state.total += data.price;
        istExist.qty += 1;
      } else {
        state.cartProduct.push({ ...data, qty: 1 });
      }
    },
    decQty: (state, action) => {
      const istExist = state.cartProduct.find(
        (item) => item.id === action.payload
      );
      if (istExist) {
        state.total -= istExist.price > 0 ? istExist.price : 0;
        istExist.qty = istExist.qty > 0 ? istExist.qty - 1 : 0;
      }
    },
    incQty: (state, action) => {
      const istExist = state.cartProduct.find(
        (item) => item.id === action.payload
      );
      if (istExist) {
        state.total += istExist.price > 0 ? istExist.price : 0;
        istExist.qty = istExist.qty > 0 ? istExist.qty + 1 : 0;
      }
    },
  },
});

export const { addCart, decQty, incQty } = CartSLice.actions;

export default CartSLice.reducer;

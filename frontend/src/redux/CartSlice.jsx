import { createSlice } from "@reduxjs/toolkit";

const CartSLice = createSlice({
  name: "toast",
  initialState: {
    size: 0,
    cartProduct: [],
    total: 0,
    subTotal: 0,
    discount: 0,
  },
  reducers: {
    addCart: (state, action) => {
      const { total, size, ...data } = action.payload;
      state.size = size;
      state.total = total;
      state.subTotal += data.price;
      const istExist = state.cartProduct.find((item) => item.id === data.id);
      if (istExist) {
        state.size = size;
        state.total = total;
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
        state.total -= istExist.currentPrice > 0 ? istExist.currentPrice : 0;
        state.subTotal -= istExist.price > 0 ? istExist.price : 0;
        istExist.qty = istExist.qty > 0 ? istExist.qty - 1 : 0;
      }
    },
    incQty: (state, action) => {
      const istExist = state.cartProduct.find(
        (item) => item.id === action.payload
      );
      if (istExist) {
        state.total += istExist.currentPrice > 0 ? istExist.currentPrice : 0;
        state.subTotal += istExist.price > 0 ? istExist.price : 0;
        istExist.qty = istExist.qty > 0 ? istExist.qty + 1 : 0;
      }
    },
    removeProduct: (state, action) => {
      state.size = 0;
      state.total = 0;
      state.subTotal = 0;
      state.cartProduct = state.cartProduct.filter(
        (itm) => itm.id !== action.payload
      );
    },
  },
});

export const { addCart, decQty, incQty, removeProduct } = CartSLice.actions;

export default CartSLice.reducer;

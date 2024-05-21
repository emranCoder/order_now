import { createSlice } from "@reduxjs/toolkit";

const CartSLice = createSlice({
  name: "toast",
  initialState: localStorage.getItem("cartProduct")
    ? JSON.parse(localStorage.getItem("cartProduct"))
    : {
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
      state.discount += state.subTotal - state.total;
      const istExist = state.cartProduct.find((item) => item.id === data.id);
      if (istExist) {
        state.size = size;
        state.total = total;
        istExist.qty += 1;
      } else {
        state.cartProduct.push({ ...data, qty: 1 });
      }
      localStorage.setItem("cartProduct", JSON.stringify(state));
    },
    decQty: (state, action) => {
      const istExist = state.cartProduct.find(
        (item) => item.id === action.payload
      );
      if (istExist) {
        state.size = state.size - 1;
        state.total -= istExist.currentPrice > 0 ? istExist.currentPrice : 0;
        state.subTotal -= istExist.price > 0 ? istExist.price : 0;
        state.discount +=
          state.subTotal - state.total < 1 ? 0 : state.subTotal - state.total;
        istExist.qty = istExist.qty > 0 ? istExist.qty - 1 : 0;
      }
      localStorage.setItem("cartProduct", JSON.stringify(state));
    },
    incQty: (state, action) => {
      const istExist = state.cartProduct.find(
        (item) => item.id === action.payload
      );
      if (istExist) {
        state.size = state.size + 1;
        state.total += istExist.currentPrice > 0 ? istExist.currentPrice : 0;
        state.subTotal += istExist.price > 0 ? istExist.price : 0;
        state.discount += state.subTotal - state.total;
        istExist.qty = istExist.qty > 0 ? istExist.qty + 1 : 0;
      }
      localStorage.setItem("cartProduct", JSON.stringify(state));
    },
    removeProduct: (state, action) => {
      const { id, size, currentPrice, price, ...data } = action.payload;
      state.size = state.size - 1;
      state.total =
        state.total - currentPrice < 0 ? 0 : state.total - currentPrice;
      state.subTotal = state.subTotal - price < 1 ? 0 : state.subTotal - price;
      state.discount =
        state.subTotal - state.total < 1 ? 0 : state.subTotal - state.total;
      state.cartProduct = state.cartProduct.filter((itm) => itm.id !== id);
      localStorage.setItem("cartProduct", JSON.stringify(state));
    },
    couponDiscount: (state, action) => {
      state.discount += (state.total * action.payload) / 100;
      state.total -= (state.total * action.payload) / 100;
    },
  },
});

export const { addCart, decQty, incQty, removeProduct, couponDiscount } =
  CartSLice.actions;

export default CartSLice.reducer;

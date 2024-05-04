import { configureStore } from "@reduxjs/toolkit";
import ToastSlice from "./ToastSlice";
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";
import ProductSlice from "./ProductFetch";

const store = configureStore({
  reducer: {
    toast: ToastSlice,
    user: AuthSlice,
    cart: CartSlice,
    product: ProductSlice,
  },
});

export default store;

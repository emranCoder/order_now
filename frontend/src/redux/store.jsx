import { configureStore } from "@reduxjs/toolkit";
import ToastSlice from "./ToastSlice";
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";

const store = configureStore({
  reducer: {
    toast: ToastSlice,
    user: AuthSlice,
    cart: CartSlice,
  },
});

export default store;

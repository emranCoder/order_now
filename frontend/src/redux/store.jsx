import { configureStore } from "@reduxjs/toolkit";
import ToastSlice from "./ToastSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    toast: ToastSlice,
    user: AuthSlice,
  },
});

export default store;

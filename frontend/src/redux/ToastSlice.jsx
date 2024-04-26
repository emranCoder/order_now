import { createSlice } from "@reduxjs/toolkit";

const ToastSlice = createSlice({
  name: "toast",
  initialState: {
    type: "",
    msg: "",
  },
  reducers: {
    removeToast: (state) => {
      state.type = "";
      state.msg = "";
    },
    addToast: (state, action) => {
      state.type = action.payload.type;
      state.msg = action.payload.msg;
    },
  },
});

export const { addToast, removeToast } = ToastSlice.actions;

export default ToastSlice.reducer;

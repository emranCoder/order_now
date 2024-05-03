import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("auth");
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get(
    `http://localhost:5000/${process.env.API_KEY}/api/auth/user`,
    {
      headers: {
        token: token,
      },
    }
  );
  return response.data.user;
});

const AuthSlice = createSlice({
  name: "toast",
  initialState: {
    isLoading: false,
    user: {},
    err: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = { ...action.payload };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.err = action.error.err;
    });
  },
});

export default AuthSlice.reducer;

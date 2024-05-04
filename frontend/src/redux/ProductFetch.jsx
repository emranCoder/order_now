import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("auth");
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/${process.env.API_KEY}/api/product/all`,
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data.products;
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    product: [],
    err: null,
    category: "",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = [...action.payload];
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.product = [];
      state.err = action.error.err;
      state.category = "";
    });
  },
});

export const { setCategory } = ProductSlice.actions;
export default ProductSlice.reducer;

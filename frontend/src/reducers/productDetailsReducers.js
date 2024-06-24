import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Define the thunk action creator using createAsyncThunk
export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails', // Action type prefix
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/product/${id}`);
      return response.data; // Return data on success
    } catch (error) {
      // Use rejectWithValue to send a custom error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the product slice
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    error: null,
    loading: false, // Add a status field to manage loading states
    
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false; 
        state.product = action.payload.product;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  }
});

export const { clearError } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;

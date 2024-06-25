import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import baseUrl from "../baseurl";

// Define the thunk action creator using createAsyncThunk
export const fetchOrderDetails = createAsyncThunk(
  'product/fetchProductDetails', // Action type prefix
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/order/${id}`);
      return response.data; // Return data on success
    } catch (error) {
      // Use rejectWithValue to send a custom error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the product slice
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    order: {},
    error: null,
    loading: false, // Add a status field to manage loading states
    success: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuccessStatus: (state)=>{
        state.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false; 
        state.order = action.payload.order;
        state.error = null;
        state.success = action.payload.success
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  }
});

export const { clearError, resetSuccessStatus } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;

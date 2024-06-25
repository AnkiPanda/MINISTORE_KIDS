import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../baseurl";

export const addNewReview = createAsyncThunk(
    "review/addNewReview",
    async(reviewData, { rejectWithValue })=>{
        try {
            const config = { headers: { "Content-Type": "application/json" }};
            const response = await axios.put(`${baseUrl}/api/v1/review`, reviewData, config);
            return response.data; // Return data on success
          } catch (error) {
            return rejectWithValue(error.response.data);
          }
    }
)

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/reviews?productId=${productId}&id=${reviewId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "review/getAllReviews",
  async(productId, { rejectWithValue })=>{
    try {
      const response = await axios.get(`${baseUrl}/api/v1/reviews?id=${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
)

// Create the user slice
const reviewSlice = createSlice({
    name: "review",
    initialState: {
      error: null,
      loading: false,
      success: false,
      isUpdated : false,
      reviews: []   
    },
    reducers: {
      clearReviewError: (state) => {
        state.error = null;
      },
      resetSuccessStatus: (state) => {
          state.success = false;
      },
      resetUpdateStatus: (state) => {
        state.isUpdated = false;
    },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addNewReview.pending, (state) => {
          state.loading = true;
          state.success = false;
        })
        .addCase(addNewReview.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.success = action.payload.success;
        })
        .addCase(addNewReview.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(deleteReview.pending, (state) => {
          state.loading = true;
          
        })
        .addCase(deleteReview.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.success = action.payload.success;
        })
        .addCase(deleteReview.rejected, (state, action) => {
          state.loading = false;
          
          state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(getAllReviews.pending, (state) => {
          state.loading = true;
          
        })
        .addCase(getAllReviews.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.reviews = action.payload.reviews;
          
        })
        .addCase(getAllReviews.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ? action.payload.message : action.error.message;
        });
          
    }
  });
  
  
  
  
  
  export const { clearReviewError, resetSuccessStatus, resetUpdateStatus } = reviewSlice.actions;
  
  export default reviewSlice.reducer;
  
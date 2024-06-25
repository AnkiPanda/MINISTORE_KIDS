import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import baseUrl from "../baseurl";

export const forgotPasswordFunc = createAsyncThunk(
    'forgotPassword/forgotPasswordFunc', // Action type prefix
    async (email, { rejectWithValue }) => {
      try {
        const config = { headers: { "Content-Type": "application/json" }};
        const response = await axios.post(`${baseUrl}/api/v1/password/forgot`, email, config);
        return response.data; // Return data on success
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const resetPasswordFunc = createAsyncThunk(
    'forgotPassword/resetPasswordFunc', // Action type prefix
    async ({token, passwords}, { rejectWithValue }) => {
      try {
        const config = { headers: { "Content-Type": "application/json" }};
        const response = await axios.put(`${baseUrl}/api/v1/password/reset/${token}`, passwords, config);
        return response.data; // Return data on success
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
      error: null,
      loading: false   
    },
    reducers: {
      clearError: (state) => {
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      builder 
        .addCase(forgotPasswordFunc.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(forgotPasswordFunc.fulfilled, (state, action) => {
          state.loading = false;
          state.message = action.payload.message;
          state.error = null;
        })
        .addCase(forgotPasswordFunc.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(resetPasswordFunc.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(resetPasswordFunc.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.error = null;
          })
          .addCase(resetPasswordFunc.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
          });         
    }
  });

export const { clearError } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;

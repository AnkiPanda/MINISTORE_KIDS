import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Define the thunk action creator using createAsyncThunk
export const updateProfile = createAsyncThunk(
    'profile/updateProfile', // Action type prefix
    async (userData, { rejectWithValue }) => {
      try {
        const config = { headers: { "Content-Type": "multipart/form-data" }};
        const response = await axios.put(`/api/v1/me/update`, userData, config);
        return response.data; // Return data on success
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const updatePassword = createAsyncThunk(
  'profile/updatePassword', // Action type prefix
  async (passwords, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" }};
      const response = await axios.put(`/api/v1/password/update`, passwords, config);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//admin
export const updateRole = createAsyncThunk(
  'profile/updateRole', // Action type prefix
  async ({id, userData}, { rejectWithValue }) => {
    try {
      
      const config = { headers: { "Content-Type": "application/json" }};
      const response = await axios.put(`/api/v1/admin/user/${id}`, userData, config);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


//admin
export const deleteUser = createAsyncThunk(
  'profile/deleteUser', // Action type prefix
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/admin/user/${id}`);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);








// Create the user slice
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    error: null,
    loading: false,
    isUpdated: false,
    success: false    
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetUpdateStatus: (state) => {
        state.isUpdated = false;
    },
    resetSuccessStatus: (state)=>{
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        //state.user = action.payload.user;
        state.error = null;
        state.isUpdated = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        //state.user = action.payload.user;
        state.error = null;
        state.isUpdated = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        //state.user = action.payload.user;
        state.error = null;
        state.isUpdated = true;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.error = null;
       
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });
        
  }
});





export const { clearError, resetUpdateStatus, resetSuccessStatus } = profileSlice.actions;

export default profileSlice.reducer;

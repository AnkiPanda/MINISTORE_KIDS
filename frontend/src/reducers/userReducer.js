import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Define the thunk action creator using createAsyncThunk
export const loginUser = createAsyncThunk(
  'user/loginUser', // Action type prefix
  async ({email, password}, { rejectWithValue }) => {
    try {
    const config = { headers: { "Content-Type" : "application/json"}}
      const response = await axios.post(`/api/v1/login`, { email, password }, config);
      return response.data; // Return data on success
    } catch (error) {
      // Use rejectWithValue to send a custom error payload
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
    'user/registerUser', // Action type prefix
    async (userData, { rejectWithValue }) => {
      try {
        const config = { headers: { "Content-Type": "multipart/form-data" }};
        const response = await axios.post(`/api/v1/register`, userData, config);
        return response.data; // Return data on success
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const loadUser = createAsyncThunk(
    'user/loadUser', // Action type prefix
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/api/v1/me`);
        return response.data; // Return data on success
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser', // Action type prefix
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/logout`);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsersForAdmin = createAsyncThunk(
  'user/getAllUsersForAdmin', // Action type prefix
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/admin/users`);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    error: null,
    loading: false,
    message:"",
    isAuthenticated: false,
    users: []    
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true; 
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; 
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {};
        state.message = action.payload.message;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getAllUsersForAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.error = null;  
      })
      .addCase(getAllUsersForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });


  }
});





export const { clearError } = userSlice.actions;

export default userSlice.reducer;

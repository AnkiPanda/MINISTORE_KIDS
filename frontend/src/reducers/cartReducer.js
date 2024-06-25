import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import baseUrl from "../baseurl";

export const addToCart = createAsyncThunk(
    'cart/addToCart', // Action type prefix
    async ({id, quantity}, { rejectWithValue }) => {
        try {
        const cartItem = {
            product : id,
            quantity
        }
        const config = { headers: { "Content-Type": "application/json" }};
        const response = await axios.put(`${baseUrl}/api/v1/cart/add`, cartItem, config);
        return response.data; 
        
        // Return data on success
    }catch (error) {
        // Use rejectWithValue to send a custom error payload
        return rejectWithValue(error.response.data);
      }
      
    }
);

export const loadCart = createAsyncThunk(
  'cart/loadCart', // Action type prefix
  async (_, { rejectWithValue }) => {
      try {
      const response = await axios.get(`${baseUrl}/api/v1/cart/me`);
      return response.data; 
      
      // Return data on success
  }catch (error) {
      // Use rejectWithValue to send a custom error payload
      return rejectWithValue(error.response.data);
    }
    
  }
);
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart', // Action type prefix
  async (id, { rejectWithValue }) => {
      try {
      const cartItem = {
          product : id
      }
      const config = { headers: { "Content-Type": "application/json" }};
      const response = await axios.put(`${baseUrl}/api/v1/cart/delete`, cartItem, config);
      return response.data; 
      
      // Return data on success
  }catch (error) {
      // Use rejectWithValue to send a custom error payload
      return rejectWithValue(error.response.data);
    }
    
  }
);

export const removeAllCartItems = createAsyncThunk(
  'cart/removeAllCartItems',
  async(_,{rejectWithValue})=>{
    try {
      const response = await axios.put(`${baseUrl}/api/v1/cart/remove`)
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems : [],
        cartLoading : false,
        cartError: null,
        cartUpdated : false,
        successCart: false
    },
    reducers: {
        clearCartError: (state) => {
          state.cartError = null;
        },
        resetUpdateCartStatus: (state) => {
            state.cartUpdated = false;
        },
        resetSuccessCartStatus: (state)=>{
          state.successCart = false
        }

    },
    
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.cartLoading = true;
            state.cartUpdated = false;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.cartItems = action.payload.cartItems;
            state.cartError = null;
            state.cartUpdated = true;
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.cartLoading = false;
            state.cartUpdated = false;
            state.cartError = action.payload ? action.payload.message : action.error.message;
          })
          .addCase(loadCart.pending, (state) => {
            state.cartLoading = true;
          })
          .addCase(loadCart.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.cartItems = action.payload.cartItems;
            state.cartError = null;
            
          })
          .addCase(loadCart.rejected, (state, action) => {
            state.cartLoading = false;
            state.cartError = action.payload ? action.payload.message : action.error.message;
          })
          .addCase(removeItemFromCart.pending, (state) => {
            state.cartLoading = true;
          })
          .addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.successCart = action.payload.success;
            state.cartError = null;
            
          })
          .addCase(removeItemFromCart.rejected, (state, action) => {
            state.cartLoading = false;
            state.cartError = action.payload ? action.payload.message : action.error.message;
          })
          .addCase(removeAllCartItems.pending, (state) => {
            state.cartLoading = true;
          })
          .addCase(removeAllCartItems.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.cartItems = action.payload.cartItems;
            state.cartError = null;
            
          })
          .addCase(removeAllCartItems.rejected, (state, action) => {
            state.cartLoading = false;
            state.cartError = action.payload ? action.payload.message : action.error.message;
          });
        }
  });

  export const { clearCartError, resetUpdateCartStatus, resetSuccessCartStatus } = cartSlice.actions;

export default cartSlice.reducer;


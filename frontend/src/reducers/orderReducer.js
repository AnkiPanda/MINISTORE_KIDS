import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../baseurl";

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async(order,{rejectWithValue})=>{
        try {
            const config = { headers: { "Content-Type": "application/json" }};
            const response = await axios.post(`${baseUrl}/api/v1/order/new`,order,config);
            return response.data; // Return data on success
          } catch (error) {
            // Use rejectWithValue to send a custom error payload
            return rejectWithValue(error.response.data);
          }  
    }
)

export const fetchMyOrders = createAsyncThunk(
    'order/fetchMyOrders', // Action type prefix
    async (_, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${baseUrl}/api/v1/orders/me`);
        return response.data; 
        
        // Return data on success
    }catch (error) {
        // Use rejectWithValue to send a custom error payload
        return rejectWithValue(error.response.data);
      }
      
    }
  );

  
  export const fetchAllOrdersForAdmin = createAsyncThunk(
    'order/fetchAllOrdersForAdmin', // Action type prefix
    async (_, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${baseUrl}/api/v1/admin/orders`);
        return response.data; 
        
        // Return data on success
    }catch (error) {
        // Use rejectWithValue to send a custom error payload
        return rejectWithValue(error.response.data);
      }
      
    }
  );


  // admin
  export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async({id,status},{rejectWithValue})=>{
        try {
            const config = { headers: { "Content-Type": "application/json" }};
            const response = await axios.put(`${baseUrl}/api/v1/admin/order/${id}`,{status},config);
            return response.data; // Return data on success
          } catch (error) {
            // Use rejectWithValue to send a custom error payload
            return rejectWithValue(error.response.data);
          }  
    }
)

 // admin
 export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async(id,{rejectWithValue})=>{
        try {
            const response = await axios.delete(`${baseUrl}/api/v1/admin/order/${id}`);
            return response.data; // Return data on success
          } catch (error) {
            // Use rejectWithValue to send a custom error payload
            return rejectWithValue(error.response.data);
          }  
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        loading: false,
        error: null,
        success: false,
        isUpdated: false,
        totalAmount: 0
    },
    reducers: {
        clearError: (state) => {
          state.error = null;
        },
        resetOrderState: (state)=>{
            state.success = false
        },
        resetUpdateState: (state)=>{
            state.isUpdated = false
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createOrder.pending, (state)=>{
            state.loading = true;
        })
        .addCase(createOrder.fulfilled, (state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(fetchMyOrders.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchMyOrders.fulfilled, (state,action)=>{
            state.loading = false;
            // state.success = true;
            state.orders = action.payload.orders
            state.error = null;
        })
        .addCase(fetchMyOrders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(fetchAllOrdersForAdmin.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchAllOrdersForAdmin.fulfilled, (state,action)=>{
            state.loading = false;
            state.orders = action.payload.orders;
            state.totalAmount = action.payload.totalAmount;
            state.error = null;
        })
        .addCase(fetchAllOrdersForAdmin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(updateOrderStatus.pending, (state)=>{
            state.loading = true;
            
        })
        .addCase(updateOrderStatus.fulfilled, (state,action)=>{
            state.loading = false;
            state.isUpdated = true;
            state.error = null;
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(deleteOrder.pending, (state)=>{
            state.loading = true;
            
        })
        .addCase(deleteOrder.fulfilled, (state,action)=>{
            state.loading = false;
            state.success = action.payload.success;
            state.error = null;
        })
        .addCase(deleteOrder.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        });

    }

})

export const {clearError, resetOrderState, resetUpdateState} = orderSlice.actions;

export default orderSlice.reducer


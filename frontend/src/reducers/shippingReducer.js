import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import baseUrl from "../baseurl";

export const addShippingInfo = createAsyncThunk(
    'shipping/addShippingInfo', // Action type prefix
    async (shippingDetails, { rejectWithValue }) => {
        try {
        const config = { headers: { "Content-Type": "application/json" }};
        const response = await axios.post(`${baseUrl}/api/v1/shipping/add`, shippingDetails, config);
        return response.data; 
        
        // Return data on success
    }catch (error) {
        // Use rejectWithValue to send a custom error payload
        return rejectWithValue(error.response.data);
      }
      
    }
);

export const getShippingInfo = createAsyncThunk(
    "shipping/getShippingInfo",
    async(_, { rejectWithValue })=>{
        try {
            const response = await axios.get(`${baseUrl}/api/v1/shipping/me`)
            return response.data
            
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)
export const deleteShippingInfo = createAsyncThunk(
    "shipping/deleteShippingInfo",
    async(id, { rejectWithValue })=>{
        try {
            
            const config = { headers: { "Content-Type": "application/json" }};
            const response = await axios.delete(`${baseUrl}/api/v1/shipping/delete/${id}` , config);
            return response.data; 
            
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)
export const updateShippingInfo = createAsyncThunk(
    'shipping/updateShippingInfo', // Action type prefix
    async ({id, shippingDetails}, { rejectWithValue }) => {
        try {
        const config = { headers: { "Content-Type": "application/json" }};
        const response = await axios.put(`${baseUrl}/api/v1/shipping/update/${id}`, shippingDetails, config);
        return response.data; 
        
        // Return data on success
    }catch (error) {
        // Use rejectWithValue to send a custom error payload
        return rejectWithValue(error.response.data);
      }
      
    }
);

const shippingSlice = createSlice({
    name: "shipping",
    initialState: {
        shippingInfo: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearError: (state)=>{
            state.error = null
        },
        resetSuccess: (state)=>{
            state.success = false
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getShippingInfo.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getShippingInfo.fulfilled,(state,action)=>{
            state.loading = false;
            state.shippingInfo = action.payload.shippingInfo;
            state.error = null
        })
        .addCase(getShippingInfo.rejected,(state,action)=>{
            state.error = action.payload ? action.payload.message : action.error.message
        })
        .addCase(addShippingInfo.pending,(state)=>{
            state.loading = true;
        })
        .addCase(addShippingInfo.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = action.payload.success;
            state.error = null
        })
        .addCase(addShippingInfo.rejected,(state,action)=>{
            state.error = action.payload ? action.payload.message : action.error.message
        })
        .addCase(deleteShippingInfo.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteShippingInfo.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = action.payload.success;
            state.error = null
        })
        .addCase(deleteShippingInfo.rejected,(state,action)=>{
            state.error = action.payload ? action.payload.message : action.error.message
        })
        .addCase(updateShippingInfo.pending,(state)=>{
            state.loading = true;
        })
        .addCase(updateShippingInfo.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = action.payload.success;
            state.error = null
        })
        .addCase(updateShippingInfo.rejected,(state,action)=>{
            state.error = action.payload ? action.payload.message : action.error.message
        });
    }
})

export const {clearError,resetSuccess} = shippingSlice.actions

export default  shippingSlice.reducer


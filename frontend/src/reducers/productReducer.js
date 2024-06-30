import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import baseUrl from "../baseurl";

// Define the thunk action creator using createAsyncThunk
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts', // Action type prefix
  async ({ keyword = "", currentPage = 1 , price=[0,50000], category,ratings=[0,5]}, { rejectWithValue }) => {
    try {
      let link = `${baseUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings[0]}&ratings[lte]=${ratings[1]}`
      if(category){
        link = `${baseUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings[0]}&ratings[lte]=${ratings[1]}&category=${category}`
   
      }
      const response = await axios.get(link);
      return response.data; // Return data on success
    } catch (error) {
      // Use rejectWithValue to send a custom error payload
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllProductsForAdmin = createAsyncThunk(
  "product/fetchAllProducts",
  async(_, { rejectWithValue })=>{
    try {
      const response = await axios.get(`${baseUrl}/api/v1/admin/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const createNewProduct = createAsyncThunk(
  'prodcut/createNewProduct', // Action type prefix
  async (productData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" }};
      const response = await axios.post(`${baseUrl}/api/v1/admin/product/new`, productData, config);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'prodcut/updateProduct', // Action type prefix
  async ({id, productData}, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" }};
      const response = await axios.put(`${baseUrl}/api/v1/admin/product/${id}`, productData, config);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'prodcut/deleteProduct', // Action type prefix
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/admin/product/${id}`);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create the product slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: null,
    loading: false, // Add a status field to manage loading states
    productCount: 0,
    resultPerPage: 0,
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
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false; 
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filterProductsCount = action.payload.filterProductsCount;
        state.error = null;

      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchAllProductsForAdmin.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchAllProductsForAdmin.fulfilled, (state, action) => {
        state.loading = false; 
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.error = null;

      })
      .addCase(fetchAllProductsForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true; 
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false; 
        state.error = null;
        state.success = action.payload.success

      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true; 
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false; 
        state.error = null;
        state.success = action.payload.success

      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true; 
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false; 
        state.error = null;
        state.success = action.payload.success

      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  }
});

export const { clearError, resetSuccessStatus } = productSlice.actions;

export default productSlice.reducer;

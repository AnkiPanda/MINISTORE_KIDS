import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import productDetailsReducers from './reducers/productDetailsReducers';
import userReducer from './reducers/userReducer';
import profileReducer from './reducers/profileReducer';
import forgotPasswordReducer from './reducers/forgotPasswordReducer';
import cartReducer from './reducers/cartReducer';
import shippingReducer from './reducers/shippingReducer';
import orderReducer from './reducers/orderReducer';
import orderDetailsReducer from './reducers/orderDetailsReducer';
import reviewReducer from './reducers/reviewReducer';

// Define a custom state serializer function
const serializeState = state => ({
  product: state.product,
  productDetails: state.productDetails,
  user: state.user,
  forgotPassword : state.forgotPassword,
  cart: state.cart,
  shipping: state.shipping,
  order: state.order,
  orderDetails: state.orderDetails,
  review: state.review
});

const rootReducer = combineReducers({
  product: productReducer,
  productDetails: productDetailsReducers,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  shipping: shippingReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  review: reviewReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: {
    serialize: serializeState // Specify the state serializer function
  }
});

export default store;

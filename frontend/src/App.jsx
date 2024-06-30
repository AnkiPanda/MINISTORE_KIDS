import './App.css';
import Footer from './components/layout/Footer/Footer.jsx';
import Header from './components/layout/Header/Header.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import MetaData from './components/layout/MetaData.jsx';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Products from './components/Product/Products.jsx';
import Contact from './components/Contact/Contact.jsx';
import About from './components/About/About.jsx';
import LoginSignup from './components/User/LoginSignup.jsx';
import { useEffect } from 'react';
import store from "./store.js"
import { loadUser } from './reducers/userReducer.js';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.jsx';
import ProtectedRoute from './components/Route/ProtectedRoute.jsx';
import UpdateProfile from './components/User/UpdateProfile.jsx';
import UpdatePassword from './components/User/UpdatePassword.jsx';
import ForgotPassword from './components/User/ForgotPassword.jsx';
import ResetPassword from './components/User/ResetPassword.jsx';
import Cart from './components/Cart/Cart.jsx';
import Shipping from './components/Cart/Shipping.jsx';
import ConfirmOrder from './components/Cart/ConfirmOrder.jsx';
import Payment from './components/Cart/Payment.jsx';
import OrderSuccess from './components/Cart/OrderSuccess.jsx';
import MyOrders from './components/Order/MyOrders.jsx';
import OrderDetails from './components/Order/OrderDetails.jsx';
import Dashboard from './components/Admin/Dashboard.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
//import UserOptions from './components/layout/Header/UserOptions.jsx';

function App() {

   const {isAuthenticated,user} = useSelector(state=>state.user)

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  
  
  

  return (
    <Router>
      <MetaData title="MiniStore." />
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/account/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
        <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
        <Route path="/paymentsuccess" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/order/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

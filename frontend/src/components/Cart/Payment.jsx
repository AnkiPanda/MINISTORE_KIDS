import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from "react-router-dom"
import { clearError, createOrder, resetOrderState } from '../../reducers/orderReducer'
import Loader from "../layout/Loader/Loader.jsx"
import { removeAllCartItems } from '../../reducers/cartReducer.js'
import "./Payment.css"
import { ToastContainer, toast } from 'react-toastify';


const Payment = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loading, error, success} = useSelector(state=>state.order)
  const seachQuery = useSearchParams()[0]

  const referenceNum = seachQuery.get("reference")

  const orderItems = JSON.parse(localStorage.getItem("cartItems"))

  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"))

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

  const itemPrice = orderInfo.subTotal;
  const taxPrice = orderInfo.gst;
  const shippingPrice = orderInfo.shippingCharge;
  const totalPrice = orderInfo.totalPrice;
  const paymentInfo = {
    id: referenceNum,
    status: "succeeded"
  }
  const orderStatus = "Order Placed"
  

  const order = {
    orderItems,
    shippingInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    orderStatus
  }

  

  useEffect(() => {
    if (!success) {
      dispatch(createOrder(order));
    }
    if(error){
      toast.error(error,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
        dispatch(clearError())
    }
    
    if(success){
      dispatch(removeAllCartItems())
      navigate("/order/success")
      //dispatch(resetOrderState());
    }
  }, [success])
  
  return (
    <Fragment>
        <MetaData title="Payment -- MiniStore"/>
        <CheckoutSteps activeStep={2}/>
        <Fragment>{loading ? <Loader/>: 
        <Fragment>
          <div className='waitBox'>Your order is getting placed. Please Do not refresh the page.</div>
          </Fragment>}</Fragment>
          <ToastContainer/>
    </Fragment>
  )
}

export default Payment

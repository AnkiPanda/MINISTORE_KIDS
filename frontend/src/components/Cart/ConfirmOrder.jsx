import React, { Fragment, useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import MetaData from '../layout/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import "./ConfirmOrder.css";
import logo from '../../../MiniStore.svg'
import { useDispatch, useSelector } from 'react-redux';

const ConfirmOrder = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const payBtn = useRef(null)

    const {user} = useSelector(state=>state.user)
 

    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"))
    const cartItems = JSON.parse(localStorage.getItem("cartItems"))
    
    const subTotal = cartItems.reduce(
        (acc,item)=>  acc + item.quantity*item.price
        , 0)
    
    const shippingCharge = subTotal <= 1000 ? 200 : 0

    const gst = subTotal * 0.18

    const totalPrice = subTotal + shippingCharge + gst
    
    const proceedToPayment = async()=>{
        const data = {
            subTotal,
            shippingCharge,
            gst,
            totalPrice,
          };
      
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        payBtn.current.disabled = true;

            const { data: { key } } = await axios.get("/api/v1/payment/getkey")
            try {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
            };

            const { data: { order } } = await axios.post("/api/v1/payment/process", {"amount" : totalPrice},config)

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "MiniStore",
                description: "Via RazorPay",
                image: `${logo}`,
                order_id: order.id,
                callback_url: "http://localhost:4000/api/v1/paymentverification",
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#FF574A"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();   
        } catch (error) {
              console.log(error.response.data)  
        } 
    }

  return (
    <Fragment>
        <MetaData title="Confirm Order & Pay -- MiniStore"/>
        <CheckoutSteps activeStep={1}/>
        <div className='confirmOrderContainer'>
            <div className="orderInfo">
                <div className="shippingInfo">
                    <h2>Shipping Information</h2>
                    <p>{shippingInfo.shippingName}</p>
                    <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pinCode}</p>
                    <p>Country - {shippingInfo.country}</p>
                    <p>Phone No. - {shippingInfo.phoneNo}</p>
                </div>
                <div className="orderItems">
                    <h2>Your Cart Items :</h2>
                    {cartItems.map((item)=>(
                        <div key={item.product} className="cartContent">
                            <div>
                            <img src={item.image} alt="" />
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div>
                            <div>
                            <p>{item.quantity} x ₹{item.price} = ₹{item.quantity*item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="orderSummary"> 
            <h2>Order Summary</h2>
            <div>
                <p>Subtotal:</p>
                <p>₹{subTotal.toFixed(2)}</p>
            </div>
            <div>
            <p>Shipping Charges:</p>
            <p>₹{shippingCharge.toFixed(2)}</p>
            </div>
            <div>
            <p>GST (18%):</p>
            <p>₹{gst.toFixed(2)}</p>
            </div>
            <div>
            <p><b>Total:</b></p>
            <p>₹{totalPrice.toFixed(2)}</p>
            </div>
            <button ref={payBtn} onClick={proceedToPayment}>Proceed to Pay</button>
            </div>
                       
         </div>
    </Fragment>
  )
}

export default ConfirmOrder

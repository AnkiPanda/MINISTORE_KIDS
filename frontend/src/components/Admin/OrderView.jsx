import React from 'react'
import "./OrderView.css"
import { Link } from 'react-router-dom';

const OrderView = ({showOrderView, closeViewModal, order}) => {

    if(!showOrderView){
        return null;
    }
    return (
        <div className="modal-overlay" onClick={closeViewModal}>
        <div className="modal-content-order-view" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeViewModal}>x</button>
            <div className="orderDetailsContent">
            <div className="orderInfo">
                <div className="shippingInfo">
                    <h2>Shipping Information</h2>
                    <p>{order.shippingInfo.shippingName}</p>
                    <p>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pinCode}</p>
                    <p>Country - {order.shippingInfo.country}</p>
                    <p>Phone No. - {order.shippingInfo.phoneNo}</p>
                </div>
                <div className="orderItems">
                    <h2>Order Items :</h2>
                    {order.orderItems.map((item)=>(
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
                <p>₹{order.itemPrice.toFixed(2)}</p>
            </div>
            <div>
            <p>Shipping Charges:</p>
            <p>₹{order.shippingPrice.toFixed(2)}</p>
            </div>
            <div>
            <p>GST (18%):</p>
            <p>₹{order.taxPrice.toFixed(2)}</p>
            </div>
            <div>
            <p><b>Total:</b></p>
            <p>₹{order.totalPrice.toFixed(2)}</p>
            </div>
           <div className='paymentDiv'>
           <p className='greenColor'>Payment Status:</p>
           <p className='greenColor'>PAID</p>
           </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default OrderView
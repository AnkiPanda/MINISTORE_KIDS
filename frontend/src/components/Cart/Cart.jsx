import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCartError, loadCart, removeItemFromCart, resetSuccessCartStatus, resetUpdateCartStatus } from '../../reducers/cartReducer';
import './Cart.css'
import CartItemCard from './CartItemCard';
import Swal from 'sweetalert2';
import Loader from '../layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import emptyCart from "../../images/empty-cart.png"
import { Link } from 'react-router-dom';
import { loadUser } from '../../reducers/userReducer';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartItems, cartLoading, cartError, cartUpdated, successCart } = useSelector(state=>state.cart)

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id))
  };
  const decreaseQuantity = (product,quantity)=>{
      if(quantity<=1){
        dispatch(removeItemFromCart(product))
        return;
      }
      const newQty = quantity - 1;
      dispatch(addToCart({"id":product,"quantity":newQty}))

  }
  const increaseQuantity = (product,quantity,stock)=>{
      if(stock <= quantity){
        Swal.fire({
          text: "Sorry, we have limited quantity available for this item!",
          icon: "warning"
        });
        return;
      }
      const newQty = quantity + 1;
      dispatch(addToCart({"id":product,"quantity":newQty}))
  }
  const checkoutHandler = ()=>{
  localStorage.setItem("cartItems",JSON.stringify(cartItems))
   navigate("/shipping");
  }


  useEffect(() => {
    if(cartError){
      toast.error(cartError,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
        dispatch(clearCartError())
    }
    
    if(cartUpdated){
      dispatch(resetUpdateCartStatus())
      
    }
    if(successCart){
      Swal.fire({
        text: "One Item has been removed from cart!"
      });
      dispatch(resetSuccessCartStatus())
    }
    dispatch(loadCart())
  }, [dispatch,cartUpdated,successCart,cartError])
  

  return (
    <Fragment>{cartLoading ? <Loader/>: (cartItems.length === 0 ? 
      <Fragment>
      <MetaData title="CART -- MiniStore."/>
      <div className="emptyCart">
          <img src={emptyCart} alt="" />
          <p>No Product in Your Cart</p>
          <Link to="/products">Click here to View Products</Link>
        </div>
        </Fragment> :
    <Fragment>
     <MetaData title="CART -- MiniStore."/>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
             
          </div>
          {cartItems.map((item)=>(
            <div className="cartContainer">
              <CartItemCard key={item.product} item={item} deleteCartItems={deleteCartItems}/>
              <div className='cartInput'>
              <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
              <div>

              </div>
              
            </div>
          ))}
               <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
    </Fragment>)}
    <ToastContainer/>
   
    </Fragment>
  )
}

export default Cart

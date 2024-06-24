import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyOrders, clearError } from '../../reducers/orderReducer'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { toast, ToastContainer } from 'react-toastify'
import "./MyOrders.css"
import { Link, useNavigate } from 'react-router-dom'

const MyOrders = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, orders } = useSelector(state=>state.order)

    useEffect(() => {
      dispatch(fetchMyOrders())
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

    }, [dispatch,error])
    
  return (
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>
            <MetaData title="My Orders -- MiniStore"/>
       {orders.length != 0 ? (    <div className='myOrders'>
                <h2>My Orders</h2>
            <div className='myOrderDiv'>
               {orders.map((order)=>(
                <div key={order._id}>
                    <div>
                    <p>Order ID : {order._id}</p>
                    <p>{order.orderStatus}</p>
                    </div>
                    <div>
                    <div className='productImageDiv'>{order.orderItems.slice(0, 4).map((item, index) => (
                                                <img key={index} src={item.image} alt={item.name} onClick={()=>navigate(`/product/${item.product}`)}/>
                      ))}
                      {order.orderItems.length > 4 && (
                          <span onClick={()=>navigate(`/order/${order._id}`)}>+{order.orderItems.length - 4}</span>
                      )}</div>
                    <div className='detailsPart'>
                        <p>₹{order.totalPrice.toFixed(2)}</p>
                   <Link to={`/order/${order._id}`}> {'View Order Details ->'} </Link> 
                   </div>
                    </div>
                </div>
               ))}
            </div>
            </div>) :
            (
              <div className='emptyOrder'>
               
                <p>You haven't placed any order yet!</p>
                <Link to="/products">Click here to View Products</Link>
              </div>
            )}
            </Fragment>}
            <ToastContainer/>
    </Fragment>
  )
}

export default MyOrders

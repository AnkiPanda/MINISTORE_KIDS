import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { fetchOrderDetails, resetSuccessStatus } from '../../reducers/orderDetailsReducer';
import "./OrderDetails.css";
import { Stepper } from 'stepper-react';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, error, loading} = useSelector((state) => state.orderDetails);

  const stepArray = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const steps = [
    { bottomLabel: 'Order Placed' },
    { bottomLabel: 'Packed' },
    { bottomLabel: 'Shipped' },
    { bottomLabel: 'Out for Delivery' },
    { bottomLabel: 'Delivered' }
  ];

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        order && (
          <Fragment>
            <MetaData title="Order Details -- MiniStore" />
            <div className="orderDetailsContainer">
              <div className="oderIdSection">
                <p>Order ID - {order._id}</p>
              </div>
              <div className="shippingDiv">
                <h4> Shipping Details : </h4>
                <div>
                  <p>
                    <b>Name: </b> <span>{order.shippingInfo?.shippingName}</span>
                  </p>
                  <p>
                    <b>Address: </b> <span>{order.shippingInfo?.address}, {order.shippingInfo?.city}, {order.shippingInfo?.state}-{order.shippingInfo?.pinCode}</span>
                  </p>
                  <p>
                    <b>Phone No: </b> <span>{order.shippingInfo?.phoneNo}</span>
                  </p>
                </div>
              </div>
              <div className="orderStatusContainer">
                <h4>Order Status :</h4>
                <div>
                  <Stepper
                    steps={steps}
                    activeStep={stepArray.indexOf(order.orderStatus) + 1}
                    containerWidth={10}
                    heightforMobileStepper="5rem"
                    bottomLabelFontSize="1rem"
                  />
                </div>
              </div>
              <div className="paymentInfo">
                <h4>Payment Information :</h4>
                <div>
                  <p>
                    <b>Amount : </b>
                    <span>₹{order.totalPrice?.toFixed(2)}</span>
                  </p>
                  <p>
                    <b>Status : </b> <span>PAID</span>
                  </p>
                </div>
              </div>
              <div className="orderItmesDiv">
                <h4>Order Items :</h4>
                {order.orderItems?.map((item) => (
                  <div key={item.product} className="orderContent">
                    <div>
                      <img src={item.image} alt="" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <p>
                        {item.quantity} x ₹{item.price} = <b>₹{item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default OrderDetails;

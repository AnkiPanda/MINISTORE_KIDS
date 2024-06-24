import React, { Fragment } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
// import { Typography } from "@mui/core";
import { Link } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const OrderSuccess = () => {
  return (
    <Fragment><CheckoutSteps activeStep={2}/>
    <div className="orderSuccess">
      <CheckCircleIcon />
      <p>Your Order has been Placed successfully </p>
      <Link to="/orders">View Orders</Link>
    </div>
    </Fragment>
  );
};

export default OrderSuccess;
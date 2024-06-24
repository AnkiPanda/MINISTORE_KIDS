import React, { Fragment, useEffect } from 'react';
import './DashboardSummary.css';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsForAdmin } from '../../reducers/productReducer';
import { fetchAllOrdersForAdmin } from '../../reducers/orderReducer';
import { getAllUsersForAdmin } from '../../reducers/userReducer';

// Register the required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const DashboardSummary = () => {
  const dispatch = useDispatch();

  const { products, productCount } = useSelector(state => state.product);
  const { orders, totalAmount } = useSelector(state => state.order);
  const { users } = useSelector(state => state.user);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(fetchAllProductsForAdmin());
    dispatch(fetchAllOrdersForAdmin());
    dispatch(getAllUsersForAdmin());
  }, [dispatch]);

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Fragment>
      <div className="summaryContainer">
        <div className="totalAmountDiv">
          <p>Total Amount</p>
          <p>₹{totalAmount && totalAmount.toFixed(2)}</p>
        </div>
        <div className="otherTotalDiv">
          <div>
            <p>Products</p>
            <p>{productCount}</p>
          </div>
          <div>
            <p>Orders</p>
            <p>{orders ? orders.length : 0}</p>
          </div>
          <div>
            <p>Users</p>
            <p>{users ? users.length : 0}</p>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardSummary;

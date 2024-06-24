import React from 'react'
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <ul>
            {/* <li>
                <Link to="/">MiniStore.</Link>
            </li> */}
            <li>
                <Link to="/admin/dashboard"> 
            <p><DashboardIcon/> Dashboard</p>
            </Link>
            </li>
        <li>
            <Link to="/admin/products"> 
            <p><AddIcon/> Products</p>
            </Link>
            </li>
        <li> 
            <Link to="/admin/orders">
        <p>
          <ListAltIcon/>
          Orders
        </p>
      </Link>
      </li>
      <li>
        <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      </li>
      <li>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      </li>
        </ul>
  </div>
  )
}

export default Sidebar

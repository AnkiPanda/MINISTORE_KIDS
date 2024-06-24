import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./ProtectedRoute.css"

const ProtectedRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return (
      <div className='notAuthenticateDiv'>
        <p>Please Log In to access this !</p>
        <Link to="/login">{'Click here to Log In ->'}</Link>
        </div>
    );
  }
  if(isAdmin === true && user.role !== "admin"){
    return (
      <div className='notAuthenticateDiv'>
        <p>You do not have access of Admin!</p>
        
        </div>
    );
  }

  return children;
};

export default ProtectedRoute;

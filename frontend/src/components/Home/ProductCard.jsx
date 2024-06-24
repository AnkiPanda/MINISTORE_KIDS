import React from 'react';
import { Link } from 'react-router-dom';
//import ReactStars from "react-rating-stars-component";
//import ReactStars from 'react-stars'
import StarRatings from 'react-star-ratings';

const Product = ({ product }) => {
  // const options = {
  //   count: 5,
  //   size: window.innerWidth < 600 ? 15 : 25,
  //   activeColor: "tomato",
  //   isHalf: true,
  //   value: product.ratings,
  //   edit: false
  // };

  return (
   
      <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
        <StarRatings
          rating={product.ratings}
          starRatedColor="tomato"
          numberOfStars={5}
          name='rating'
          starDimension={window.innerWidth < 600 ? '15px' : '25px'}
          starSpacing="2px"
        />
         <span className='my-1 mx-2'> ({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    
  );
};

export default Product;

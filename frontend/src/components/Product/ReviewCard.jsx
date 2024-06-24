import React from 'react'
import StarRatings from 'react-star-ratings';
import profileImg from "../../images/profile.png"
const ReviewCard = ({review}) => {
   
  return (
    <div className='reviewCard'>
      <img src={profileImg} alt="User" />
      <p>{review.name}</p>
      <StarRatings
          rating={review.rating}
          starRatedColor="tomato"
          numberOfStars={5}
          name='rating'
          starDimension={window.innerWidth < 600 ? '15px' : '25px'}
          starSpacing="2px"
        />
      <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard

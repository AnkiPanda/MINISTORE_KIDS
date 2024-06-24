import React from 'react'
import "./ReviewModal.css"
import StarRatings from 'react-star-ratings';

const ReviewModal = ({showModal, onClose, reviewSubmit,rating,setRating, comment, setComment}) => {
    if (!showModal) {
        return null;
    }
  return (
    <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-review" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>x</button>
                <h2>Submit Review</h2>
                <form className='reviewForm' onSubmit={reviewSubmit}>
                <StarRatings
                    rating={rating}
                    changeRating={setRating}
                    starRatedColor="tomato"
                    numberOfStars={5}
                    name='rating'
                    starDimension={window.innerWidth < 600 ? '20px' : '30px'}
                    starSpacing="2px"
                />
                <textarea 
                placeholder="Write your review here" 
                className="review-textarea"
                rows="7"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                 />
                 <input type="submit" value="Submit" className="submitReview" />
                </form>
            </div>
     </div>       
  )
}

export default ReviewModal

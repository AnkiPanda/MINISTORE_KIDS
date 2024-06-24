import React, { Fragment,useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchProductDetails } from '../../reducers/productDetailsReducers';
import StarRatings from 'react-star-ratings';
import "../Product/ProductDetails.css"
import ReviewCard from './ReviewCard';
import Loader from "../layout/Loader/Loader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../layout/MetaData';
import Swal from 'sweetalert2';
import { addToCart, clearCartError, resetUpdateCartStatus } from '../../reducers/cartReducer';
import { loadUser } from '../../reducers/userReducer';
import ReviewModal from './ReviewModal';
import { addNewReview, clearReviewError, resetSuccessStatus } from '../../reducers/reviewReducer';

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
   

    const {product, loading, error} = useSelector(state => state.productDetails)
    const {cartLoading, cartError, cartUpdated} = useSelector(state => state.cart)
    const { success, error: reviewError } = useSelector((state) => state.review);
    const [quantity, setQuantity] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(0)
    const [ comment,setComment ] = useState("")
    const increaseQuantity = ()=>{
        if(product.stock <= quantity){ 
            Swal.fire({
                text: "Sorry, we have limited quantity available for this item!",
                icon: "warning"
              });
            return;
        }
        const qty = quantity + 1
        setQuantity(qty)
    }
    const decreaseQuantity = ()=>{
        if(quantity <= 1)
            return
        const qty = quantity - 1
        setQuantity(qty)
    }
    const addToCartHandler = async (e)=>{
        e.preventDefault()
        dispatch(addToCart({id,quantity}))
        
        
    }
    useEffect(() => {
    if (error) {
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
        if (reviewError) {
            toast.error(reviewError,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
                dispatch(clearReviewError())
        } 
        if (cartError) {
            if(cartError === "Please Login to access this resource"){
                Swal.fire({
                    text: "Please Login to add items to cart",
                    icon: "warning"
                  });
                  navigate('/login')
            }
            else{
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
            }  
                dispatch(clearCartError())
        }
        if(cartUpdated){
            Swal.fire({
                text: "Item added to cart",
                icon: "success"
              });
            setQuantity(1)
            dispatch(resetUpdateCartStatus())
            
        }
        if(success){
            Swal.fire({
                text: "One Review added",
                icon: "success"
              });
              dispatch(resetSuccessStatus())
        }
        dispatch(fetchProductDetails(id))
      }, [dispatch,id,error,cartError,cartUpdated,reviewError,success])
    
      const onCloseHandler = ()=>{
        setShowModal(false)
        const element = document.querySelector('.control-next.control-arrow');

        // Apply CSS styles
        element.classList.remove("control-disabled");
      }
      const openModal = () =>{
        setShowModal(true)
        const element = document.querySelector('.control-next.control-arrow');

        // Apply CSS styles
        element.classList.add('control-disabled');
      }
      const reviewSubmit = (e)=>{
        e.preventDefault()
        const reviewData = {
            rating,
            comment,
            "productId" : id
        }
        dispatch(addNewReview(reviewData))
        setShowModal(false)
        
      }
   
  return (
<Fragment>
    {loading || cartLoading ? <Loader/> :
   (product && <Fragment>
        <MetaData title={`${product.name} -- MiniStore.`}/>
    <div className='ProductDetails'>
        <div className=''>
        <Carousel showArrows={true}>
            {product.images && 
                product.images.map((item,i)=>(
                    <img className="CarouselImage" src={item.url} key={item.url} alt={`${i} Slide`} />
                ))}
            </Carousel>
        </div>
        <div className=''>
            <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>
            </div>
            <div className="detailsBlock-2">
            <StarRatings
          rating={product.ratings}
          starRatedColor="tomato"
          numberOfStars={5}
          name='rating'
          starDimension={window.innerWidth < 600 ? '15px' : '25px'}
          starSpacing="2px"
        />
        <span className=''> ({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
            <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
               
                </div>
                <button onClick={addToCartHandler} disabled={product.Stock < 1 ? true : false}>Add to Cart</button>
            </div>
            <p>
                  Status: 
                  &nbsp;<b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
            </div>  
            <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
            </div>
            <button onClick={openModal} className="submitReview">
                Submit Review
              </button>
        </div>
    </div>
    <h3 className='reviewsHeading'>REVIEWS</h3>
     {product.reviews && product.reviews[0] ? (
        <div className="reviews">
            {product.reviews &&
            product.reviews.map((review)=>(
                <ReviewCard key={review._id} review={review}/>
            ))}
        </div>
     ): (
        <p className="noReviews">No Reviews Yet</p>
     )}
    <ReviewModal showModal={showModal} onClose={onCloseHandler} reviewSubmit={reviewSubmit} rating={rating} setRating={setRating} setComment={setComment} comment={comment}/>
    </Fragment>)}
    <ToastContainer />
    </Fragment>
  )
}

export default ProductDetails

import React, { Fragment, useEffect } from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faScroll } from '@fortawesome/free-solid-svg-icons';
//import { CgMouse } from 'react-icons/cg'
import mouse from "../../images/mouse.png"
import Button from 'react-bootstrap/Button';
import "../Home/Home.css"
import shopping from "../../images/shopping.jpeg"
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchProducts } from '../../reducers/productReducer';
import Loader from '../layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import banner from "../../images/banner2.png"
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import toyImage from "../../images/1.png"
import babyClothImage from "../../images/2.png"
import kidsImage from "../../images/3.png"
import summerImage from "../../images/4.png"
// import schoolImage from "../../images/Kids.png"



const Home = () => {

  

  const {products,error,loading,productCount} = useSelector(state=> state.product)
  // Logging for debugging purposes
  console.log("Products: ", products);
  console.log("Error: ", error);
  console.log("Loading: ", loading);

  const dispatch = useDispatch()
  const { keyword } = useParams()
  // console.log(location)
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
        dispatch(clearError)
      }
    dispatch(fetchProducts({keyword,"currentPage":1}))
  }, [dispatch,error])
  
  return (
    <Fragment>
      {loading ? <Loader/> : <Fragment>
        <MetaData title="HOME -- MiniStore."/>
        {/* <div className="banner" style={{"backgroundImage":`url(${banner})`}}>
           
        </div> */}
        <Carousel indicators={false}>
           <Carousel.Item id="" interval={1500} keyboard={true}>
           <img 
               className="d-block w-100"
               id=""
               src={kidsImage}
               alt='kidsImage'
             />
           </Carousel.Item> 
           <Carousel.Item id="" interval={1500} keyboard={true}>
           <img 
               className="d-block w-100"
               id=""
               src={babyClothImage}
               alt='babyClothImage'
             />
           </Carousel.Item> 
           <Carousel.Item id="" interval={1500} keyboard={true}>
           <img 
               className="d-block w-100"
               id=""
               src={toyImage}
               alt='toyImage'
             />
           </Carousel.Item> 
           <Carousel.Item id="" interval={1500} keyboard={true}>
           <img 
               className="d-block w-100"
               id=""
               src={summerImage}
               alt='summerImage'
             />
           </Carousel.Item> 
           {/* <Carousel.Item id="" interval={1500} keyboard={true}>
           <img 
               className="d-block w-100"
               id=""
               src={schoolImage}
               alt='schoolImage'
             />
           </Carousel.Item>  */}
        </Carousel>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="featuredProduct" id="container">
       
          {products && products.map(product => (
            <ProductCard key={product._id} product={product}/>
          ))}
         
        </div>
        
       
    </Fragment>}
    <ToastContainer />
    </Fragment>
  )
}

export default Home

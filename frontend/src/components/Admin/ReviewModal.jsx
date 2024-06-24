import React, { useEffect, useState } from 'react'
import "./ReviewModal.css"
import DataTable from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { clearReviewError, deleteReview, getAllReviews, resetSuccessStatus } from '../../reducers/reviewReducer';
import Loader from '../layout/Loader/Loader';
import { fetchAllProductsForAdmin } from '../../reducers/productReducer';

const ReviewModal = ({showReviewModal,closeReviewModal,productId}) => {

    if(!showReviewModal){
        return null;
    }
    const dispatch = useDispatch();
    const { loading, success, error, reviews } = useSelector(state=>state.review)
    useEffect(() => {
      dispatch(getAllReviews(productId))
        if(error){
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
          console.log(error)
        dispatch(clearReviewError())
        }
        if(success){
            dispatch(resetSuccessStatus())   
        }
        
    }, [dispatch,error,success])
    // useEffect(() => {
    //   dispatch(getAllReviews(productId))
    // }, [dispatch])
    
    
    const columns = [
        
        {
          name: 'Review ID',
          selector: row => row._id,
          sortable: true,
        },
        {
          name: 'Rating',
          selector: row => row.rating.toFixed(2),
          sortable: true,
        },
        {
            name: 'Review',
            selector: row => row.comment,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
              <div>
               <IconButton
                  color="error"
                  onClick={()=>deleteReviewHandler(row._id)}
                >
                  <DeleteIcon />
                </IconButton>
               
              </div>
            ),
        },
    ]
    const deleteReviewHandler = (reviewId)=>{
        dispatch(deleteReview({reviewId,productId}))
        
    }
  return (
    <div className="modal-overlay" onClick={closeReviewModal}>
    <div className="modal-content-review-modal" onClick={(e) => e.stopPropagation()}>
     {loading? <Loader/> :   <div><button className="close-button" onClick={closeReviewModal}>x</button>
        <div className='reviewTableContainer'>
        <DataTable
                    title="Reviews"
                    columns={columns}
                    data={reviews}
                    pagination
                    highlightOnHover
                />
        </div>
        <ToastContainer/>
        </div>}

    </div>
     
    </div>
  )
}

export default ReviewModal

import React, { Fragment, useEffect, useState } from 'react'
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../reducers/userReducer";
import gmail from "../../images/mail.png"
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { clearError, forgotPasswordFunc } from '../../reducers/forgotPasswordReducer';
import "../User/ForgotPassword.css"



const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { message, loading, error } = useSelector(state=>state.forgotPassword)
    
    const updateEmailSubmit = (e)=>{
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("email",email)
        dispatch(forgotPasswordFunc(myForm))
    }

    useEffect(() => {
        
        if(error && error!=="Please Login to access this resource"){
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
        if(message){
          Swal.fire({
              title: "Mail Sent",
              text: message,
              icon: "success"
            });
        }
      }, [dispatch,error,message,navigate])
      
  return (
    
    <Fragment>
    {loading ? <Loader/> : <Fragment>
    <MetaData title="Forgot Password"/>
    <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>
        <form className='forgotPasswordForm' onSubmit={updateEmailSubmit}>
            <div className="forgotPasswordEmail">
                
                 <img src={gmail} alt="gmail" />
                    <input type="email" name="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
            
            <input type="submit" value="Send" className="forgotPasswordBtn" />

            </form>
            </div>
            </div></Fragment>}
            <ToastContainer/>
</Fragment>
  )
}

export default ForgotPassword

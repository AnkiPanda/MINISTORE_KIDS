import React, { Fragment, useState, useEffect } from "react";
import "../User/ResetPassword.css"
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../reducers/userReducer";
import MetaData from "../layout/MetaData";
import unlock from "../../images/open-lock.png"
import lock from "../../images/padlock.png"
import key from "../../images/key.png"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { resetPasswordFunc, clearError } from "../../reducers/forgotPasswordReducer";

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()
    const {error, loading, success} = useSelector(state=>state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword)
        dispatch(resetPasswordFunc({token, "passwords" :myForm} ))
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
        if(success){
          Swal.fire({
              title: "Success",
              text: "Password Reset Successfully",
              icon: "success"
            });
            
            navigate('/login')
            
        }
      }, [dispatch,error,success,navigate])
      

    

  return (
    <Fragment>
        <MetaData title="Reset Password"/>
        <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Reset Password</h2>
            <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>
            <div className="password">
                    <img src={unlock} alt="unlock" />
                    <input type="password"  placeholder='New Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="confirmPassword">
                    <img src={lock} alt="lock" />
                    <input type="password"  placeholder='Confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Reset" className="resetPasswordBtn" />

     
                </form>
                </div>
                </div>
      
    </Fragment>
  )
}

export default ResetPassword

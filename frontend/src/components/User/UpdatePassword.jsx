import React, { Fragment, useState, useEffect } from "react";
import "../User/UpdatePassword.css"
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../reducers/userReducer";
import MetaData from "../layout/MetaData";
import unlock from "../../images/open-lock.png"
import lock from "../../images/padlock.png"
import key from "../../images/key.png"
import { clearError, resetUpdateStatus, updatePassword } from "../../reducers/profileReducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const UpdatePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error, loading, isUpdated} = useSelector(state=>state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword)
        dispatch(updatePassword(myForm))
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
        if(isUpdated){
          Swal.fire({
              title: "Updated",
              text: "Password Updated Successfully",
              icon: "success"
            });
            dispatch(loadUser())
            navigate('/account')
            dispatch(resetUpdateStatus())
        }
      }, [dispatch,error,isUpdated,navigate])
      

    

  return (
    <Fragment>
        <MetaData title="Update Password"/>
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
                <h2 className="updatePasswordHeading">Update Password</h2>
            <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
            <div className="oldPassword">
                    <img src={key} alt="key" />
                    <input type="password"  placeholder='Old Password' required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
            </div>
            <div className="newPassword">
                    <img src={unlock} alt="unlock" />
                    <input type="password"  placeholder='New Password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            </div>
            <div className="confirmPassword">
                    <img src={lock} alt="lock" />
                    <input type="password"  placeholder='Confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Update" className="updatePasswordBtn" />

     
                </form>
                </div>
                </div>
      
    </Fragment>
  )
}

export default UpdatePassword

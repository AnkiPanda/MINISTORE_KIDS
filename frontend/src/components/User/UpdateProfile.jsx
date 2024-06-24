import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../reducers/userReducer";
import profile from "../../images/profile.png"
import gmail from "../../images/mail.png"
import userLogo from "../../images/happiness.png"
import MetaData from "../layout/MetaData";
import { clearError, resetUpdateStatus, updateProfile } from "../../reducers/profileReducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state=>state.user)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState(profile)

    const {error,isUpdated,loading} = useSelector(state=>state.profile)

    const updateSubmit=(e)=>{
        e.preventDefault()

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar)
        dispatch(updateProfile(myForm))
    }
    const updateDataChange=(e)=>{
        console.log(e.target.value)
        
            const reader = new FileReader()

            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])      
    }
    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            if(user.avatar.url!=""){
            setAvatarPreview(user.avatar.url)
            }
        }
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
              text: "Profile Updated Successfully",
              icon: "success"
            });
            dispatch(loadUser())
            navigate('/account')
            dispatch(resetUpdateStatus())
        }
      }, [dispatch,error,isUpdated,navigate,user])
      


  return (
    <Fragment>
        {loading ? <Loader/> : <Fragment>
        <MetaData title="Update Profile"/>
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
            <form className='updateProfileForm' onSubmit={updateSubmit} encType='multipart/form-data'>
                <div className="updateProfileName">
                    
                    <img src={userLogo} alt="userLogo" />
                       <input type="text" name="name" placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
                   </div>
                <div className="updateProfileEmail">
                    
                     <img src={gmail} alt="gmail" />
                        <input type="email" name="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" accept="image/*" onChange={updateDataChange} />
            </div>
                <input type="submit" value="Update" className="updateProfileBtn" />

                </form>
                </div>
                </div></Fragment>}
                <ToastContainer/>
    </Fragment>
  )
}

export default UpdateProfile

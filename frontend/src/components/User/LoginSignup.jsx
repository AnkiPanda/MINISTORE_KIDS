import React, { Fragment, useEffect, useRef, useState } from 'react'
import "../User/LoginSignup.css"
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import gmail from "../../images/mail.png"
import unlock from "../../images/open-lock.png"
import userLogo from "../../images/happiness.png"
import profile from "../../images/profile.png"
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser, registerUser } from '../../reducers/userReducer'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const LoginSignup = () => {

    const navigate = useNavigate();

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const dispatch = useDispatch()

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    
    const {error,loading,isAuthenticated} = useSelector(state=> state.user)
     
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });

    const { name, email, password} = user;

    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState(profile)

    const loginSubmit = (e)=>{
        e.preventDefault()
        dispatch(loginUser({"email":loginEmail,"password": loginPassword}))
       
    }
    useEffect(() => {
      if(error && error!=="Please Login to access this resource" && error != "Json Web Token is expired, try again."){
        if (!toast.isActive(13, "loginPage")) {
            console.log("first time running")
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                toastId: 13                      
            })
        }
        // toast.error(error,{
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored"
        // });
        dispatch(clearError())
      }
      if(isAuthenticated){
        Swal.fire({
            title: "Logged In",
            text: "Logged In Successfully",
            icon: "success"
          });
        navigate('/account')
      }
    }, [dispatch,error,isAuthenticated,navigate])
    
    const registerSubmit=(e)=>{
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar)
        dispatch(registerUser(myForm))
    }
    const registerDataChange=(e)=>{
        console.log(e.target.value)
        if(e.target.name == "avatar"){
            const reader = new FileReader()

            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUser({...user, [e.target.name]:e.target.value})
        }
    }

    const switchTabs = (e,tab)=>{
        if(tab === "login"){
            switcherTab.current.classList.add('shiftToNeutral')
            switcherTab.current.classList.remove('shiftToRight')

            // registerTab.current.classList.remove('shiftToNeutralForm')
            // loginTab.current.classList.remove('shiftToLeft')
            registerTab.current.classList.add('d-none')
            loginTab.current.classList.remove('d-none')

        }
        if(tab == "register"){
            switcherTab.current.classList.add('shiftToRight')
            switcherTab.current.classList.remove('shiftToNeutral')

            // registerTab.current.classList.add('shiftToNeutralForm')
            // loginTab.current.classList.add('shiftToLeft')
            registerTab.current.classList.remove('d-none')
            loginTab.current.classList.add('d-none')

        }
    }

    

  return (
    <Fragment>{loading ? <Loader/> : 
    <Fragment>
        <div className="loginSignupContainer">
            <div className="loginSignupBox">
                <div>
                <div className="login_signup_toggle">
                    <p onClick={(e)=> switchTabs(e, "login")}>LOGIN</p>
                    <p onClick={(e)=> switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                     {/* <div className='inputIcon'>  </div>  */}
                     <img src={gmail} alt="gmail" />
                        <input type="email"  placeholder='Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                    </div>
                    <div className="loginPassword">
                        {/* <LockOpenIcon/> */}
                        {/* <div className='inputIcon'> </div> */}
                        <img src={unlock} alt="unlock" />
                        <input type="password"  placeholder='Password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="submit" value="Login" className='loginBtn'/>
                </form>
                <form className='signupForm d-none' ref={registerTab} onSubmit={registerSubmit} encType='multipart/form-data'>
                <div className="signupName">
                    
                    <img src={userLogo} alt="userLogo" />
                       <input type="text" name="name" placeholder='Name' required value={name} onChange={registerDataChange}/>
                   </div>
                <div className="signupEmail">
                    
                     <img src={gmail} alt="gmail" />
                        <input type="email" name="email" placeholder='Email' required value={email} onChange={registerDataChange}/>
                    </div>
                    <div className="signupPassword">
                      
                        <img src={unlock} alt="unlock" />
                        <input type="password" name='password' placeholder='Password' required value={password} onChange={registerDataChange}/>
                    </div>
                <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
            </div>
                <input type="submit" value="Register" className="signUpBtn" />

                </form>
            </div>
        </div>
       
    </Fragment>}
    <ToastContainer containerId={"loginPage"}/>
    </Fragment>
  )
}

export default LoginSignup

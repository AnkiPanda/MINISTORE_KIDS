import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import "../User/Profile.css"
import profile from "../../images/profile.png"

const Profile = () => {

    const {user, loading, isAuthenticated} = useSelector(state=>state.user)

    const navigate = useNavigate()
    // useEffect(() => {
    //   if(!isAuthenticated){
    //     navigate('/login')
    //   }
    // }, [navigate,isAuthenticated])
    
  return (
    <Fragment>
    {loading ? <Loader/> : isAuthenticated && <Fragment>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className="profileContainer">
            <div>
                <h2>My Profile</h2>
                <img src={user.avatar.url!==""? user.avatar.url : profile} alt={user.name} />
                <Link to="/account/update">Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined on</h4>
                    {/* <p>2024-05-27</p> */}
                    <p>{String(user.createdAt).slice(0,10)}</p>
                </div>
                <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change Password</Link>
                </div>
            </div>
        </div>
    </Fragment> }
    </Fragment>
  )
}

export default Profile

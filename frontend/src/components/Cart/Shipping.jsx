import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addShippingInfo, clearError, deleteShippingInfo, getShippingInfo, resetSuccess, updateShippingInfo } from '../../reducers/shippingReducer';
import "./Shipping.css"
import editIcon from "../../images/edit.png"
import deleteIcon from "../../images/delete.png"
import ShippingModal from './ShippingModal';
import Loader from '../layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import MetaData from '../layout/MetaData';


const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {loading, error, shippingInfo,success} = useSelector(state=>state.shipping)
    const [indexValue, setIndexValue] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [ shippingId, setShippingId ] = useState(null)
    const [shippingDetails, setShippingDetails] = useState({
      shippingName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      phoneNo: ""
    });
    console.log(Country)
    console.log(State)
    useEffect(() => {
      dispatch(getShippingInfo())
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
          dispatch(clearError())
      }
      if (success) {
        // Close the modal and reset form when loading finishes without error
        onCloseHandler();
        dispatch(resetSuccess())
      }
    }, [dispatch,success,error])
    
    const openModal = (e)=>{
        e.preventDefault();
        setShowModal(true)
    }
    const onCloseHandler = ()=>{
      setShowModal(false)
      setShippingDetails({
        shippingName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: ""
      })
      setShippingId(null)
    }
    const registerDataChange=(e)=>{
      console.log(e.target.value)
      setShippingDetails({...shippingDetails, [e.target.name]:e.target.value})
    }
    const addressSubmit =(e)=>{
      e.preventDefault();
      if(shippingId){
          dispatch(updateShippingInfo({"id":shippingId,shippingDetails}))
      }
      else{
        dispatch(addShippingInfo(shippingDetails))
      }
      
    }
    const openEditForm = (info)=>{
      setShippingDetails({
        shippingName: info.shippingName,
        address: info.address,
        city: info.city,
        state: info.state,
        country: info.country,
        pinCode: info.pinCode,
        phoneNo: info.phoneNo
      })
      setShippingId(info._id)
      setShowModal(true)
    }
    const deleteAddress = (id)=>{
        dispatch(deleteShippingInfo(id))
    }
    const proceedToNext = ()=>{
      localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo[indexValue]))
      navigate('/order/confirm')
    }
    
  return (
    <Fragment>
  {loading ? <Loader/>:   <Fragment>
    <MetaData title="Shipping -- MiniStore."/>
    <CheckoutSteps activeStep={0}/>
    {shippingInfo.length === 0 ? <Fragment>
      <div className="emptyShippingContainer">
        <div>No Shipping Information Added</div>
        <div onClick={openModal}>+ Add Address</div>
      </div>
    </Fragment> :
    <Fragment>
       <div className='shippingContainer'>
       <h2>Shipping Information</h2>
        <div className='shippingHeader'>
            
            <div>
                <div>Saved Address</div>
                <div onClick={openModal}>+ Add New Address</div>
            </div>
        </div>
        {shippingInfo.map((info,i)=>(
            <div className='infoContainer' key={i}>
                <div>
                
                <input className="check-input" type="radio" name="shipping" id={`shipping_check_${i}`} value={i} onChange={(e)=>setIndexValue(parseInt(e.target.value))} checked={indexValue===i}/>
                
                </div>
                <div>
                  <div>
                <h4>{info.shippingName}</h4>
                <div>
                <img src={editIcon} alt="edit" onClick={()=>openEditForm(info)}/>
                <img src={deleteIcon} alt="delete" onClick={()=>deleteAddress(info._id)}/>
                </div>
                </div>
                <p>{info.address}, {info.city}, {State.getStateByCode(info.state).name} - {info.pinCode}</p>
                <p>Country : {Country.getCountryByCode(info.country).name}</p>
                <p>Phone No. - {info.phoneNo}</p>
                </div>
            </div>
        ))}
        <div className='proceedBtn'>
            <button onClick={proceedToNext}>Continue</button>
        </div>
       </div>
        </Fragment>}
        <ShippingModal showModal={showModal} onClose={onCloseHandler} shippingDetails={shippingDetails} registerDataChange={registerDataChange} addressSubmit={addressSubmit} shippingId={shippingId}/>
    </Fragment>}
     <ToastContainer/>
    </Fragment>
  )
}

export default Shipping

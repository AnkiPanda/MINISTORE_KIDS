import React from 'react'
import "./OrderStatusEdit.css"
import Select from 'react-select';


const OrderStatusEdit = ({showOrderEdit,closeEditModal,orderStatus,setOrderStatus,orderId,updateOrderStatusHandler}) => {

  if(!showOrderEdit){
    return null;
  }
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'tomato' : state.isFocused ? '#f0f0f0' : 'white',
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
      cursor: 'pointer', 
      '&:hover': {
        backgroundColor: '#f0f0f0',
        color: 'black',
      },
    }),
    control: (provided) => ({
      ...provided,
      borderColor: 'tomato',
      '&:hover': {
        borderColor: 'tomato',
      },
      boxShadow: 'none',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  const status = [
    { value: 'Order Placed', label: 'Order Placed' },
    { value: 'Packed', label: 'Packed' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Out for Delivery', label: 'Out for Delivery' },
    { value: 'Delivered', label: 'Delivered' }
  ];



// Find the selected role object from the roles array
const selectedStatus = status.find(r => r.value === orderStatus);
  return (
    <div className="modal-overlay" onClick={closeEditModal}>
    <div className="modal-content-order-edit" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeEditModal}>x</button>
        <form className='updateOrderStatusForm' onSubmit={()=>updateOrderStatusHandler(orderId)}>
                    <div className="">
                        <label htmlFor="">Update Order Status</label>
                        <Select
                        value={selectedStatus}
                        onChange={(e)=>setOrderStatus(e.value)}
                        options={status}
                        placeholder="Select Role"
                        styles={customStyles}
                        className='role-select'
                    />
                    </div>
                    <input type="submit" value="Update" className="updateOrderStatusBtn" />
                    </form>
    </div>
    </div>
  )
}

export default OrderStatusEdit
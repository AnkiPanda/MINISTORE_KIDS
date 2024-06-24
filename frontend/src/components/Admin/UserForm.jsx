import React from 'react'
import "./UserForm.css"
import Select from 'react-select';
import profile from "../../images/profile.png"

const UserForm = ({showModal, closeModal, userDetails, roleSubmit, role, setRole}) => {


    if(!showModal){
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
  
      const roles = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
      ];


    
    // Find the selected role object from the roles array
    const selectedRole = roles.find(r => r.value === role);

  return (
     <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content-user-form" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal}>x</button>
                <div className='userDetailsDiv'>
                    <h2>User Details</h2>
                    <div>
                    <img src={userDetails.avatar.url != "" ? userDetails.avatar.url : profile} alt="" />
                    <p>{userDetails.name}</p>
                    <p>{userDetails.email}</p>
                    </div>
                </div>
                <form className='updateRoleForm' onSubmit={roleSubmit}>
                    <div className="role">
                        <label htmlFor="">Update Role</label>
                        <Select
                        value={selectedRole}
                        onChange={(e)=>setRole(e.value)}
                        options={roles}
                        placeholder="Select Role"
                        styles={customStyles}
                        className='role-select'
                    />
                    </div>
                    <input type="submit" value="Update" className="updateRoleBtn" />
                    </form>
            </div>
        </div>
  )
}

export default UserForm

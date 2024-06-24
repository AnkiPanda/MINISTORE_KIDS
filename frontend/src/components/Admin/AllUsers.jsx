import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getAllUsersForAdmin } from '../../reducers/userReducer';
import UserForm from './UserForm';
import { deleteUser, resetSuccessStatus, resetUpdateStatus, updateRole } from '../../reducers/profileReducer';
import Loader from '../layout/Loader/Loader';
import profile from "../../images/profile.png"
import Swal from 'sweetalert2';
import "./AllUsers.css"


const AllUsers = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user);
    const {loading, isUpdated, success} = useSelector(state => state.profile);
    const [filterText, setFilterText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [userDetails, setUserDetails] = useState(null)
    const [role, setRole] = useState('')

    
    useEffect(() => {
        dispatch(getAllUsersForAdmin());
        if(isUpdated){
          Swal.fire({
            title: "Updated",
            text: "Role updated Successfully",
            icon: "success"
          });
            dispatch(resetUpdateStatus())
        }
        if(success){
          Swal.fire({
            title: "Deleted",
            text: "User Deleted Successfully",
            icon: "success"
          });
            dispatch(resetSuccessStatus())
        }
    }, [dispatch,isUpdated,success]);

   

    

    useEffect(() => {
        setFilteredUsers(
            users.filter(user => 
                user._id.toLowerCase().includes(filterText.toLowerCase()) ||
                user.name.toLowerCase().includes(filterText.toLowerCase()) ||
                user.email.toLowerCase().includes(filterText.toLowerCase()) ||
                user.role.toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [filterText, users]);

    const openModal = (data)=>{
        console.log(data)
        setUserDetails(data)
        setRole(data.role)
        setShowModal(true)
    }
    const closeModal = ()=>{
        setShowModal(false)
    }
    const roleSubmit = ()=>{
        const userData = {
            name: userDetails.name,
            email: userDetails.email,
            role: role
        }
        dispatch(updateRole({"id":userDetails._id, userData}))
        setShowModal(false)
    }
    const deleteUserHandler = (id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Delete this User!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUser(id))
          
        }
      })
       
    }

    const columns = [
        {
            name: 'Avatar',
            selector: row => (
                <img src={row.avatar.url!=""? row.avatar.url : profile} alt={row.avatar.url} style={{width:"5vmax",padding:"1vmax"}}/>
            )
        },
        {
          name: 'User ID',
          selector: row => row._id,
          sortable: true,
        },
        {
          name: 'Name',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Email',
          selector: row => row.email,
          sortable: true,
        },
        {
          name: 'Role',
          selector: row => row.role,
          sortable: true,
          
        },
        
        {
          name: 'Actions',
          cell: row => (
            <div>

                <IconButton
                color="primary"
              onClick={()=>openModal(row)}>
                <EditIcon />
              </IconButton>
             
             <IconButton
                color="error"
                onClick={()=>deleteUserHandler(row._id)}
              >
                <DeleteIcon />
              </IconButton>
             
            </div>
          ),
        },
      ];

    return (
        <Fragment>
        {loading ? <Loader/>:
        <Fragment>
            <div className="allUsersDiv">
                <div className="userDetailsHeader">
                    <div>
                      <SearchIcon/>
                    <input
                        id="search"
                        type="search"
                        placeholder="Search Users"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        variant="outlined"
                        size="small"
                        style={{ marginLeft: 'auto' }}
                    />
                    </div>
                   
                </div>
                <DataTable
                    title="User List"
                    columns={columns}
                    data={filteredUsers}
                    pagination
                    highlightOnHover
                />
            </div>
            <UserForm showModal={showModal} closeModal={closeModal} userDetails={userDetails} roleSubmit={roleSubmit} role={role} setRole={setRole}/>
        </Fragment>}
        </Fragment>
    );
}

export default AllUsers

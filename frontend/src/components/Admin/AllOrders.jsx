import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { deleteOrder, fetchAllOrdersForAdmin, resetOrderState, resetUpdateState, updateOrderStatus } from '../../reducers/orderReducer';
import "./AllOrders.css"
import OrderView from './OrderView';
import OrderStatusEdit from './OrderStatusEdit';
import Loader from '../layout/Loader/Loader';
import Swal from 'sweetalert2';

const AllOrders = () => {
    const dispatch = useDispatch();
    const { orders, success, loading, isUpdated } = useSelector(state => state.order);

    const [filterText, setFilterText] = useState('');
   // const [filteredOrders, setFilteredOrders] = useState([]);
    const [showOrderView, setShowOrderView] = useState(false)
    const [showOrderEdit, setShowOrderEdit] = useState(false)
    const [ order, setOrder ] = useState(null)
    const [ orderStatus, setOrderStatus ] = useState("")
    const [orderId, setOrderId ] = useState("")

    
    useEffect(() => {
        dispatch(fetchAllOrdersForAdmin());
        if(isUpdated){
          dispatch(resetUpdateState())
        }
        if(success){
          Swal.fire({
            title: "Deleted",
            text: "Order Deleted Successfully",
            icon: "success"
          });
          dispatch(resetOrderState())
        }
    }, [dispatch,isUpdated,success]);

    const rows = [];

    orders &&
        orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    // useEffect(() => {
    //     setFilteredOrders(
    //         rows.filter(ord => 
    //           ord.id.toLowerCase().includes(filterText.toLowerCase()) ||
    //           ord.status.toLowerCase().includes(filterText.toLowerCase()) ||
    //           ord.amount.toString().toLowerCase().includes(filterText.toLowerCase()) ||
    //           ord.itemsQty.toString().toLowerCase().includes(filterText.toLowerCase())
    //         )
    //     );
    // }, [filterText, rows]);
    const filteredOrders = useMemo(() => rows.filter(ord => 
      ord.id.toLowerCase().includes(filterText.toLowerCase()) ||
      ord.status.toLowerCase().includes(filterText.toLowerCase()) ||
      ord.amount.toString().toLowerCase().includes(filterText.toLowerCase()) ||
      ord.itemsQty.toString().toLowerCase().includes(filterText.toLowerCase())
  ), [filterText, rows])

    const columns = [
        {
          name: 'Order ID',
          selector: row => row.id,
          sortable: true,
        },
        {
          name: 'Status',
          selector: row => row.status,
          sortable: true,
          conditionalCellStyles: [
            {
                when: row => row.status === 'Delivered',
                style: {
                    color: 'green',
                    fontWeight: 'bold',
                },
            },
            {
                when: row => row.status !== 'Delivered',
                style: {
                    color: 'red',
                    fontWeight: 'bold',
                },
            },
        ],
        },
        {
          name: 'Item Quantity',
          selector: row => row.itemsQty,
          sortable: true,
        },
        {
          name: 'Amount',
          selector: row => row.amount,
          sortable: true,
          cell: row => `₹${row.amount}`, // Add currency symbol
          style: {
            textAlign: 'right'
          }
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <IconButton
                color="primary"
                onClick={()=>openEditModal(row.id,row.status)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={()=>openViewModal(row.id)}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={()=>deleteOrderHandler(row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ),
          width: '180px',
          style: {
            textAlign: 'center'
          }
        }
      ];
      const openViewModal = (id)=>{
        const currentOrder = orders.find((o)=> o._id === id)
        setOrder(currentOrder)
        setShowOrderView(true)
      }
      const closeViewModal = ()=>{
        setShowOrderView(false)
      }
      const openEditModal = (id,status)=>{
        setOrderStatus(status)
        setOrderId(id)
        setShowOrderEdit(true)
      }
      const closeEditModal = ()=>{
        setShowOrderEdit(false)
      }
      const updateOrderStatusHandler = (id)=>{
        dispatch(updateOrderStatus({id,"status":orderStatus}))
        setShowOrderEdit(false)
      }
      const deleteOrderHandler = (id)=>{
        Swal.fire({
          title: "Are you sure?",
          text: "You want to Delete this Order!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteOrder(id))
            
          }
        })
        
      }

    return (
      <Fragment>
        {loading ? <Loader/> : 
        <Fragment>
            <div className="allOrdersDiv">
                <div className="orderDetailsHeader">
                    <div>
                      <SearchIcon/>
                    <input
                        id="search"
                        type="search"
                        placeholder="Search Orders"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                    />
                    </div>
                   
                </div>
                <DataTable
                    title="Order List"
                    columns={columns}
                    data={filteredOrders}
                    pagination
                    highlightOnHover
                />
            </div>
            <OrderView showOrderView={showOrderView} closeViewModal={closeViewModal} order={order}/>
            <OrderStatusEdit showOrderEdit={showOrderEdit} orderStatus={orderStatus} setOrderStatus={setOrderStatus} orderId={orderId} closeEditModal={closeEditModal} updateOrderStatusHandler={updateOrderStatusHandler}/>
        </Fragment>}
        </Fragment>
    );
}

export default AllOrders

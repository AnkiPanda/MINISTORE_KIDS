import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import DashboardTab from './DashboardTab.jsx'
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <Fragment>
        <MetaData title="Admin Dashboard -- MiniStore"/>
        <div className="dashboard">
       
           {/* <h2 className='dashboardHeading'>Admin Dashboard</h2> */}
           <div className='dashboardContent'>
           <DashboardTab/>
           </div>
           
        </div>
    </Fragment>
  )
}

export default Dashboard

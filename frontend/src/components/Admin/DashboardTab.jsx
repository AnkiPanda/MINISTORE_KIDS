import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DashboardSummary from './DashboardSummary';
import "./DashboardTab.css"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AllProducts from './AllProducts';
import AllOrders from './AllOrders';
import AllUsers from './AllUsers';

const DashboardTab = () => {
    const [value, setValue] = React.useState('Summary');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    // const theme = useTheme();
    const isSmallScreen = window.innerWidth < 600 ? true : false;
  
    return (
      <Box sx={{ width: '95%', typography: 'body1', margin: "auto", minHeight: "70vh", border:1, borderColor:"divider"}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} 
            aria-label="lab API tabs example"
           
            variant={isSmallScreen ? 'scrollable' : 'standard'}
            scrollButtons={isSmallScreen ? 'auto' : false}
            >
              <Tab label="Summary" value="Summary" />
              <Tab label="Products" value="Products" />
              <Tab label="Orders" value="Orders" />
              <Tab label="Users" value="Users" />
              
            </TabList>
          </Box>
          <TabPanel value="Summary">
            <DashboardSummary/>
          </TabPanel>
          <TabPanel value="Products">
            <AllProducts/>
          </TabPanel>
          <TabPanel value="Orders">
            <AllOrders/>
          </TabPanel>
          <TabPanel value="Users">
            <AllUsers/>
          </TabPanel>
         
        </TabContext>
      </Box>
    );
}

export default DashboardTab

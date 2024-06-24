import React from 'react'
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css"


const CheckoutSteps = ({activeStep}) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order & Pay</Typography>,
      icon: <AccountBalanceIcon />,
    },
    {
      label: <Typography>Order Placed</Typography>,
      icon: <LibraryAddCheckIcon/>,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };

   
  return (
    <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    
    // <Stepper activeStep={activeStep} styleConfig={{
    //     activeBgColor: 'tomato',
    //     completedBgColor: '#b95442',
    //     inactiveBgColor: 'lightgray',
    //     activeTextColor: 'white',
    //     completedTextColor: 'white',
    //     inactiveTextColor: 'black',
    // }}
    // >
    //             {steps.map((step, index) => (
    //                 <Step key={index} label={step.label} />
    //             ))}
    // </Stepper>
  )
}

export default CheckoutSteps

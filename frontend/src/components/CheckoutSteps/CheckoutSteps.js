import React from "react";
import {
  Box,
  Stack,
  Stepper,
  Step,
  Typography,
  StepLabel,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon></LocalShippingIcon>,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddIcon></LibraryAddIcon>,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon></AccountBalanceIcon>,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{ boxSizing: "border-box" }}
      >
        {steps.map((item, index) => {
          return (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep > index ? true : false}
            >
              <StepLabel
                icon={item.icon}
                sx={{ color: activeStep >= index ? "#1976d2" : null }}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;

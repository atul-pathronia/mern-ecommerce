import React, { useEffect, useState, useRef } from "react";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "./PaymentPage.css";
import { redirect, useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { nilCartIfOrderSuccessful } from "../../actions/cartAction";
import { api } from "../../config";

const PaymentPage = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const {
    user,
    erorr: userError,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo?.subTotal,
    taxPrice: orderInfo?.tax,
    shippingCharges: orderInfo?.shippingPrice,
    totalPrice: orderInfo?.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${api.endpoint}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        enqueueSnackbar(result.error.message, { variant: "error" });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          dispatch(nilCartIfOrderSuccessful());
          // navigate("/login?/process/payment?redirect=success");
          navigate("/success");
          sessionStorage.clear();
          enqueueSnackbar("Order Successfully Placed", {
            variant: "success",
          });
        } else {
          return enqueueSnackbar(
            "There is some issue while processing payment",
            {
              variant: "error",
            }
          );
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (userError) {
      navigate("/");
      enqueueSnackbar("You cannot access this page without login. ", {
        variant: "error",
      });
      dispatch(clearErrors());
    } else if (!orderInfo) {
      enqueueSnackbar("There is no order", {
        variant: "error",
      });
      navigate("/");
    }
  }, [error, userError]);

  return (
    // <Elements stripe={loadStripe(stripeApiKey)}>
    <Box>
      <MetaData title={`Urbane Man | Payment Page`}></MetaData>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <CheckoutSteps activeStep={2}></CheckoutSteps>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.2rem",
            color: "primary.main",
          }}
        >
          Enter Payment Info
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: { xs: "90%", sm: "325px", md: "350x" },
          }}
          //   display:"fle"
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.5rem",
              border: "1px solid #eee",
              padding: "1rem",
            }}
          >
            <CreditCardIcon></CreditCardIcon>
            <CardNumberElement className="paymentInput"></CardNumberElement>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.5rem",
              border: "1px solid #eee",
              padding: "1rem",
            }}
          >
            <EventIcon></EventIcon>
            <CardExpiryElement className="paymentInput"></CardExpiryElement>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.5rem",
              border: "1px solid #eee",
              padding: "1rem",
            }}
          >
            <VpnKeyIcon></VpnKeyIcon>
            <CardCvcElement className="paymentInput"></CardCvcElement>
          </Stack>
          <Button
            fullWidth
            variant="contained"
            ref={payBtn}
            type="submit"
            // sx={{ maxWidth: 0 }}
            onClick={paymentHandler}
          >
            {`Pay - ₹${orderInfo && Math.round(orderInfo.totalPrice)}`}
          </Button>
        </Box>
      </Box>
    </Box>
    // </Elements>
  );
};

export default PaymentPage;

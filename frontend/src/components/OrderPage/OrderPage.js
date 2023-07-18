import React, { useEffect } from "react";
import MetaData from "../MetaData";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import "./orderPage.css";

const OrderPage = ({ isAuthenticated }) => {
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subTotal > 1000 ? 0 : 200;

  const tax = subTotal * 0.18;

  const totalPrice = subTotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pinCode}, ${shippingInfo.state}, ${shippingInfo.country}
  `;

  const proceedToPayment = (e) => {
    e.preventDefault();
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/login?redirect=process/payment");
  };

  useEffect(() => {
    if (subTotal === 0) {
      navigate("/");
    }
  }, []);

  //   console.log(user);

  return (
    <Box>
      <MetaData title={`Urbane Man | Order Page`}></MetaData>
      <CheckoutSteps activeStep={1}></CheckoutSteps>
      <Box
        sx={{
          maxWidth: "90%",
          margin: "1rem auto",
          display: "flex",
          gap: "1rem",
          flexDirection: {
            xs: "column",
            md: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
      >
        {/* ORDER DETAILS */}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            width: "100%",
            flex: 1.5,
            borderRight: { md: "1px solid #1976d2", xs: "none" },
            borderBottom: { xs: "1px solid #1976d2", md: "none" },
            padding: "2rem",
          }}
        >
          {/* SHIPPING DETAILS */}
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Shipping Info
            </Typography>
            <Stack sx={{ flexDirection: "row", display: "flex" }}>
              <Typography>Name:</Typography>
              {user && <Typography>{user.name}</Typography>}
            </Stack>
            <Stack sx={{ flexDirection: "row", display: "flex" }}>
              <Typography>Phone:</Typography>
              <Typography>{shippingInfo.phoneNo}</Typography>
            </Stack>
            <Stack>
              <Typography>Address:</Typography>
              <Typography>{address}</Typography>
            </Stack>
          </Box>

          {/* CART DETAILS */}
          <Box sx={{ display: "flex", gap: ".5rem", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Your Cart Items
            </Typography>
            {cartItems.map((cartItem) => {
              return (
                <Box
                  key={cartItem.product}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <Stack
                    sx={{ display: "flex", flexDirection: "row", gap: ".5rem" }}
                  >
                    <img
                      src={cartItem.images}
                      alt={cartItem.name}
                      className="productImg"
                    />
                    <Link to={`/product/${cartItem._id}`}>
                      <Typography sx={{ color: "black", cursor: "pointer" }}>
                        {cartItem.name}
                      </Typography>
                    </Link>
                  </Stack>
                  <Stack>
                    <Typography>
                      {cartItem.quantity} X {cartItem.price} ={" "}
                      <b>₹{cartItem.price * cartItem.quantity}</b>
                    </Typography>
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* ORDER TOTAL BOX */}
        <Box sx={{ padding: "0 2rem", flex: 1, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              gap: ".3rem",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ textAlign: "center", color: "gray", fontSize: "1.5rem" }}
            >
              Order Summary
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>SubTotal:</Typography>
              <Typography>₹{subTotal}</Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Shipping charges:</Typography>
              <Typography>₹{shippingCharges}</Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>GST:</Typography>
              <Typography>₹{Math.round(tax)}</Typography>
            </Stack>
          </Box>
          <Box>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Total:</Typography>
              <Typography>₹{Math.round(totalPrice)}</Typography>
            </Stack>
          </Box>
          <Button
            disabled={subTotal === 0 ? true : false}
            variant="contained"
            fullWidth
            onClick={proceedToPayment}
          >
            Proceed to Payment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderPage;

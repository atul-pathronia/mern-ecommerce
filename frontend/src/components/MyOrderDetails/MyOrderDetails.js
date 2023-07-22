import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { myOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import { useSnackbar } from "notistack";

const MyOrderDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, loading } = useSelector((state) => state.orderDetails);
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      navigate("/");
      enqueueSnackbar("Unauthorized access. ", {
        variant: "error",
      });
      dispatch(clearErrors());
    }
    dispatch(myOrderDetails(id));
  }, [error]);

  //   const address = `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.state}, ${order?.shippingInfo.country}
  //   `;

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <Box
      sx={{
        maxWidth: "90%",
        margin: "1rem auto",
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <MetaData title={`Urbane Man | Order Details`}></MetaData>
      <Typography
        sx={{ fontSize: "1.5rem", color: "primary.main", textAlign: "center" }}
      >
        Order Id: {order && order._id}
      </Typography>
      <Stack>
        {
          <Typography sx={{ fontSize: "1.2rem" }}>
            Name: {order && order?.user?.name}
          </Typography>
        }
        <Typography sx={{ fontSize: "1.2rem" }}>
          Phone No:{order && order?.shippingInfo?.phoneNo}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          Address: {order?.shippingInfo?.address},{order?.shippingInfo?.city},
          {order?.shippingInfo?.pinCode},{order?.shippingInfo?.state},
          {order?.shippingInfo?.country}
        </Typography>
      </Stack>

      <Stack>
        <Typography>
          Payment Status:
          <Typography
            component="span"
            sx={{
              color:
                order?.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {order?.paymentInfo && order.paymentInfo.status === "succeeded"
              ? "Paid"
              : "Failed"}
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          Amount:₹{order?.totalPrice}
        </Typography>
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: "1.2rem" }}>
          Order Status: {order?.orderStatus}
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", gap: ".5rem", flexDirection: "column" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Your Order Items
        </Typography>
        {order?.orderItems?.map((orderItem) => {
          return (
            <Box
              key={orderItem?.product}
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
                  src={orderItem?.images}
                  alt={orderItem?.name}
                  className="productImg"
                />
                <Link to={`/product/${orderItem?.product}`}>
                  <Typography sx={{ color: "black", cursor: "pointer" }}>
                    {orderItem?.name}
                  </Typography>
                </Link>
              </Stack>
              <Stack>
                <Typography>
                  {orderItem?.quantity} X {orderItem?.price} ={" "}
                  <b>₹{orderItem?.price * orderItem?.quantity}</b>
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MyOrderDetails;

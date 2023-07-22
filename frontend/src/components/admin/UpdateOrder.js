import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  adminUpdateOrder,
  myOrderDetails,
  adminGetAllOrders,
} from "../../actions/orderAction";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Loader from "../Loader/Loader";
import { ADMIN_UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const UpdateOrder = ({ setshowOrders, setShowUpdateOrder }) => {
  const [status, setStatus] = useState("");
  const { isUpdated } = useSelector((state) => state.adminSingleOrder);
  const { loading, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleProcessOrder = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(adminUpdateOrder(order._id, myForm));
  };

  useEffect(() => {
    if (isUpdated) {
      enqueueSnackbar("Order Updated Successfully", { variant: "success" });
      dispatch(myOrderDetails(order._id));
      dispatch({ type: ADMIN_UPDATE_ORDER_RESET });
    }
  }, [dispatch, enqueueSnackbar, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Box
          sx={{
            width: "100%",
            gap: "1rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              margin: "1rem",
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              borderRight: { md: "1px solid #1976d2", xs: "none" },
              borderBottom: { xs: "1px solid #1976d2", md: "none" },
              padding: "1rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                color: "primary.main",
                textAlign: "center",
              }}
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
                Address: {order?.shippingInfo?.address},
                {order?.shippingInfo?.city},{order?.shippingInfo?.pinCode},
                {order?.shippingInfo?.state},{order?.shippingInfo?.country}
              </Typography>
            </Stack>

            <Stack>
              <Typography>
                Payment Status:
                <Typography
                  component="span"
                  sx={{
                    color:
                      order?.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {order?.paymentInfo &&
                  order.paymentInfo.status === "succeeded"
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

            <Box
              sx={{ display: "flex", gap: ".5rem", flexDirection: "column" }}
            >
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
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: ".5rem",
                      }}
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

          {/* PROCESS ORDER SECTION */}
          {order.orderStatus !== "Delivered" && (
            <Box
              component="form"
              encType="multipart/form-data"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "1rem",
                width: { xs: "95%", sm: "90%", md: "40%" },
                margin: "1rem auto",
              }}
            >
              <Paper sx={{ padding: "1rem", width: "100%" }}>
                <Stack gap="1rem">
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.5rem",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <InputLabel>
                      <AccountTreeIcon></AccountTreeIcon>
                    </InputLabel>
                    <Select
                      value={status}
                      required
                      size="small"
                      sx={{ width: "100%" }}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="">Select Category</MenuItem>
                      {order && order.orderStatus === "Processing" && (
                        <MenuItem value="Shipped">Shipped</MenuItem>
                      )}
                      {order && order.orderStatus === "Shipped" && (
                        // <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      )}
                    </Select>
                  </Stack>

                  <Stack></Stack>

                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                    onClick={handleProcessOrder}
                  >
                    {loading ? <CircularProgress /> : "Process Order"}
                  </Button>
                </Stack>
              </Paper>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default UpdateOrder;

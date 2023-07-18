import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductsAdmin } from "../../actions/productActions";
import { adminGetAllOrders } from "../../actions/orderAction";
import { adminGetAllUsers } from "../../actions/userAction";

const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.adminAllOrders);
  const { users } = useSelector((state) => state.adminAllUsers);

  const dispatch = useDispatch();

  let outOfStock = 0;

  products &&
    products.forEach((product) => {
      if (product.stock === 0) outOfStock += 1;
    });

  useEffect(() => {
    dispatch(getProductsAdmin());
    dispatch(adminGetAllOrders());
    dispatch(adminGetAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.map((order) => {
      totalAmount += order.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Earned Amount"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#1976d2"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#4caf50", "#1976d2"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1.2rem",
      }}
      name="dashboard"
    >
      <Typography component="h1" textAlign="center" sx={{ fontSize: "1.5rem" }}>
        Dashboard
      </Typography>
      <Stack
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          width: "100%",
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          Total Amount <br />₹{totalAmount}
        </Typography>
      </Stack>
      <Box sx={{ display: "flex" }}>
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          {/* <Link to="/products"> */}
          <Typography
            sx={{
              backgroundColor: "primary.main",
              height: "10vmax",
              width: "10vmax",
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              justifyContent: "center",
              borderRadius: "100%",
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            Products
            <br></br>
            {products?.length}
          </Typography>
          {/* </Link> */}
          {/* <Link to="/myaccount/admin/orders"> */}
          <Typography
            sx={{
              backgroundColor: "primary.light",
              height: "10vmax",
              width: "10vmax",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "100%",
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            Orders
            <br />
            {orders && orders.length}
          </Typography>
          {/* </Link> */}
          {/* <Link to="/myaccount/admin/users"> */}
          <Typography
            sx={{
              textAlign: "center",
              backgroundColor: "primary.dark",
              height: "10vmax",
              width: "10vmax",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "100%",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Users
            <br />
            {users && users.length}
          </Typography>
          {/* </Link> */}
        </Stack>
      </Box>
      <Stack
        sx={{ width: { xs: "100%", sm: "90%", md: "80%" }, margin: "0 auto" }}
      >
        <Line data={lineState} className="chartWidth"></Line>
      </Stack>
      <Stack
        sx={{ width: { xs: "100%", sm: "90%", md: "80%" }, margin: "0 auto" }}
      >
        <Doughnut data={doughnutState} className="chartWidth"></Doughnut>
      </Stack>
    </Box>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Box, Typography } from "@mui/material";
import Dashboard from "./Dashboard";
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct.js";
import OrderList from "./OrderList";
import UpdateOrder from "./UpdateOrder";
import AllUsersList from "./AllUsersList";
import UpdateUser from "./UpdateUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminControl = () => {
  const navigate = useNavigate();
  const [showDashboard, setShowDashboard] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showOrders, setshowOrders] = useState(false);
  const [showUpdateOrder, setShowUpdateOrder] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const toggleTabs = (e) => {
    e.preventDefault();
    if (e.target.textContent === "Dashboard") {
      setShowDashboard(true);
      setShowAllProducts(false);
      setShowCreateProduct(false);
      setshowOrders(false);
      setShowUsers(false);
      setShowReviews(false);
      setShowUpdateProduct(false);
      setShowUpdateOrder(false);
    }
    if (e.target.textContent === "Users") {
      setShowDashboard(false);
      setShowAllProducts(false);
      setShowCreateProduct(false);
      setshowOrders(false);
      setShowUsers(true);
      setShowReviews(false);
      setShowUpdateProduct(false);
      setShowUpdateOrder(false);
    }
    if (e.target.textContent === "All") {
      setShowDashboard(false);
      setShowAllProducts(true);
      setShowCreateProduct(false);
      setshowOrders(false);
      setShowUsers(false);
      setShowReviews(false);
      setShowUpdateProduct(false);
      setShowUpdateOrder(false);
    }
    if (e.target.textContent === "Create") {
      setShowDashboard(false);
      setShowAllProducts(false);
      setShowCreateProduct(true);
      setshowOrders(false);
      setShowUsers(false);
      setShowReviews(false);
      setShowUpdateProduct(false);
      setShowUpdateOrder(false);
    }
    if (e.target.textContent === "Orders") {
      setShowDashboard(false);
      setShowAllProducts(false);
      setShowCreateProduct(false);
      setshowOrders(true);
      setShowUsers(false);
      setShowReviews(false);
      setShowUpdateProduct(false);
      setShowUpdateOrder(false);
    }
    if (e.target.textContent === "Reviews") {
      setShowDashboard(false);
      setShowAllProducts(false);
      setShowCreateProduct(false);
      setshowOrders(false);
      setShowUsers(false);
      setShowReviews(true);
      setShowUpdateProduct(false);
      setShowUpdateOrder(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* SIDEBAR */}
      <Box sx={{ flex: 1, border: "1px solid #eee" }} onClick={toggleTabs}>
        <Sidebar></Sidebar>
      </Box>
      <Box
        sx={{
          flex: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "1.2rem",
          border: "1px solid #eee",
        }}
      >
        {showDashboard && <Dashboard></Dashboard>}
        {showAllProducts && (
          <ProductList
            setShowCreateProduct={setShowCreateProduct}
            setShowAllProducts={setShowAllProducts}
            setShowUpdateProduct={setShowUpdateProduct}
          ></ProductList>
        )}
        {showCreateProduct && (
          <CreateProduct
            setShowCreateProduct={setShowCreateProduct}
            setShowDashboard={setShowDashboard}
          />
        )}
        {showUpdateProduct && (
          <UpdateProduct
            setShowUpdateProduct={setShowUpdateProduct}
            setShowAllProducts={setShowAllProducts}
          />
        )}
        {showOrders && (
          <OrderList
            setshowOrders={setshowOrders}
            setShowUpdateOrder={setShowUpdateOrder}
          />
        )}
        {showUpdateOrder && (
          <UpdateOrder
            setshowOrders={setshowOrders}
            setShowUpdateOrder={setShowUpdateOrder}
          />
        )}
        {showUsers && (
          <AllUsersList
            setShowUpdateUser={setShowUpdateUser}
            setShowUsers={setShowUsers}
          />
        )}
        {showUpdateUser && (
          <UpdateUser
            setShowUpdateUser={setShowUpdateUser}
            setShowUsers={setShowUsers}
          ></UpdateUser>
        )}
        {showReviews && <Typography>Reviews</Typography>}
      </Box>
    </Box>
  );
};

export default AdminControl;

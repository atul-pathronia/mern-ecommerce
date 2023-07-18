import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { myOrders, clearErrors } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";
import MetaData from "../MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { useSnackbar } from "notistack";
import "./MyOrders.css";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, orders, error } = useSelector((state) => state.myOrders);

  const columns = [
    { field: "date", headerName: "Order Date", minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        console.log(params);

        return (
          <Link to={`/order/${params.id}`} className="viewOrder">
            View Order
          </Link>
        );
      },
    },
    { field: "id", headerName: "Order ID", minWidth: 250 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      // cellClassName: (params) => {
      //   return params.row.status === "Delivered" ? "greenColor" : "redColor";
      // },
      // cellClassName: "redColor",
    },
    { field: "itemsQty", headerName: "Items Qty", minWidth: 150 },
    { field: "amount", headerName: "Amount", minWidth: 150 },
  ];
  const rows = [];

  orders &&
    orders.map((item, index) => {
      let date = new Date(item.createdAt);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      let orderDate = year + "-" + month + "-" + dt;
      // console.log(Date.now(item.createdAt));
      rows.push({
        date: orderDate,
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (!isAuthenticated) {
      navigate("/");
    }
    dispatch(myOrders());
  }, [error]);

  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <MetaData title={`Urbane Man | ${user?.name}'s Orders`}></MetaData>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
            autoHeight
          ></DataGrid>
        </Box>
      )}
    </Box>
  );
};

export default MyOrders;

import React, { Fragment, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import {
  adminGetAllOrders,
  adminDeleteOrder,
  myOrderDetails,
  clearErrors,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { ADMIN_DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = ({ setshowOrders, setShowUpdateOrder }) => {
  const {
    loading,
    error: orderUpdateError,
    orders,
  } = useSelector((state) => state.adminAllOrders);
  const { isDeleted } = useSelector((state) => state.adminSingleOrder);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const deleteOrder = (id) => {
    dispatch(adminDeleteOrder(id));
  };

  const toggleOrderProcessScreen = (id) => {
    setshowOrders(false);
    dispatch(myOrderDetails(id));
    setShowUpdateOrder(true);
  };

  const columns = [
    { field: "date", headerName: "Order Date", minWidth: 150, flex: 1 },
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      // cellClassName: (params) => {
      //   return params.row.status === "Delivered" ? "greenColor" : "redColor";
      // },
      // cellClassName: "redColor",
    },
    { field: "itemsQty", headerName: "Items Qty", minWidth: 150, flex: 1 },
    { field: "amount", headerName: "Amount", minWidth: 150, flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => toggleOrderProcessScreen(params.id)}>
              {/* <Link to={`/admin/product/${params.id}`} className="viewOrder"> */}
              <EditIcon></EditIcon>
              {/* </Link> */}
            </Button>
            <Button onClick={() => deleteOrder(params.id)}>
              <DeleteIcon></DeleteIcon>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.map((item) => {
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

      let orderDate = `${dt}-${month}-${year}`;
      rows.push({
        date: orderDate,
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  useEffect(() => {
    if (orderUpdateError) {
      enqueueSnackbar(orderUpdateError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar("Order Deleted Successfully", { variant: "success" });
      dispatch({ type: ADMIN_DELETE_ORDER_RESET });
    }
    dispatch(adminGetAllOrders());
  }, [dispatch, enqueueSnackbar, isDeleted, orderUpdateError]);

  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
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

export default OrderList;

import React, { Fragment, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import {
  getProductsAdmin,
  clearErrors,
  deleteProductAdmin,
  getProductDetails,
} from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { ADMIN_DELETE_PRODUCT_RESET } from "../../constants/productConstant";

export let productId = undefined;

const ProductList = ({
  setShowAllProducts,
  setShowCreateProduct,
  setShowUpdateProduct,
}) => {
  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const deleteProduct = (id) => {
    dispatch(deleteProductAdmin(id));
  };

  const toggleEditProductScreen = (id) => {
    setShowAllProducts(false);
    setShowUpdateProduct(true);
    dispatch(getProductDetails(id));
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => toggleEditProductScreen(params.id)}>
              {/* <Link to={`/admin/product/${params.id}`} className="viewOrder"> */}
              <EditIcon></EditIcon>
              {/* </Link> */}
            </Button>
            <Button onClick={() => deleteProduct(params.id)}>
              <DeleteIcon></DeleteIcon>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.map((product) => {
      rows.push({
        id: product._id,
        stock: product.stock,
        price: product.price,
        name: product.name,
      });
    });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (deleteError) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
      dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
    }
    dispatch(getProductsAdmin());
  }, [dispatch, isDeleted, deleteError, error, enqueueSnackbar]);

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

export default ProductList;

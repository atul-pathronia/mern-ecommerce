import React, { useEffect } from "react";
import { Box, Stack, Button, Grid } from "@mui/material";
import MetaData from "../MetaData";
import Product from "../Product/Product";
import { getProducts, clearErrors } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useSnackbar } from "notistack";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { enqueueSnackbar } = useSnackbar();

  // console.log(loading, error, products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <MetaData title={`Urbane Man | Fashion Quest Begin`}></MetaData>
      <Box className="banner">
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            height: "100vh",
          }}
        >
          <h1>BE A URBANE MAN</h1>
          <h2>Fashion quest begins here</h2>
          <Button variant="contained">Shop Now</Button>
        </Stack>
      </Box>
      <h3 className="featured-product-heading">Featured Products</h3>
      <Grid
        container
        direction="row"
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {products &&
          products.map((product) => {
            return (
              <Grid item md={3} sm={4} xs={6} key={product._id}>
                <Product product={product}></Product>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Home;

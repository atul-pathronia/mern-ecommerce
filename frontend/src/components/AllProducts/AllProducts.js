import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productActions";
import { useSnackbar } from "notistack";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Pagination,
  Slider,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import MetaData from "../MetaData";
import "./AllProducts.css";

const categories = ["T-shirts", "Shirts", "Jeans", "Pants", "Shoes"];

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    products,
    loading,
    error,
    resultPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { pathname } = useLocation();
  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    rating,
    error,
    enqueueSnackbar,
  ]);

  let count = filteredProductsCount;

  // Reset Filter Button Fuction
  const resetFilters = (e) => {
    e.preventDefault();
    setPrice([0, 25000]);
    setCategory("");
    setRating(0);
  };

  const changePage = (event, value) => {
    setCurrentPage(value);
  };

  const changePrice = (event, newPrice) => {
    setPrice(newPrice);
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: "2rem",
        padding: "1rem",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <MetaData title={`Urbane Man | All Products`}></MetaData>
      {/* Left Box */}
      <Box sx={{ width: { xs: "100%", md: "10%" } }}>
        <Typography
          sx={{
            fontSize: "1.5rem",
            textDecoration: "underline",
            marginBottom: "1rem",
            color: "primary.main",
            textAlign: "center",
          }}
        >
          Filters
        </Typography>
        <Box
          sx={{
            flexDirection: { xs: "row", md: "column" },
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "space-between", md: "flex-start" },
            gap: "1rem",
          }}
        >
          <Stack sx={{ width: { md: "100%", xs: "50%" } }}>
            <Typography sx={{ fontWeight: "Bold" }}>Price</Typography>
            <Slider
              // size="small"
              value={price}
              onChange={changePrice}
              // aria-label="Small"
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              // step={100}
              min={0}
              max={25000}
            />
          </Stack>
          <Stack sx={{ width: { md: "100%", xs: "50%" } }}>
            <Typography sx={{ fontWeight: "Bold" }}>Categories</Typography>
            <Select
              value={category}
              selected={true}
              size="small"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem selected={true}>Select Category</MenuItem>
              {categories.map((category) => {
                return (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>

          <Stack sx={{ width: { md: "100%", xs: "50%" } }}>
            {/* <fieldset> */}
            <Typography sx={{ fontWeight: "Bold" }}>Ratings Above</Typography>
            <Slider
              valuer={rating}
              onChange={(e, newRating) => {
                setRating(newRating);
              }}
              min={0}
              max={5}
              // marks={1}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
            ></Slider>
            {/* </fieldset> */}
          </Stack>

          <Stack sx={{ width: { md: "100%", xs: "50%" } }}>
            <Button
              onClick={resetFilters}
              // sx={{ size: "small", variant: "contained" }}
              size="small"
              variant="contained"
            >
              Reset Filters
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Right Box */}
      <Box sx={{ width: { xs: "100%", md: "90%" } }}>
        {products?.length ? (
          <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "1.5rem",
                margin: "0 auto",
                textDecoration: "underline",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {pathname === "/products" ? "All Products" : "Products"}
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: "1.5rem",
              margin: "0 auto",
              textDecoration: "underline",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            No Products Found
          </Typography>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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

          {resultPerPage < count && (
            <Stack
              sx={{
                // marginTop: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.ceil(productsCount / resultPerPage)}
                color="primary"
                size="small"
                showFirstButton
                showLastButton
                page={currentPage}
                onChange={changePage}
              />
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllProducts;

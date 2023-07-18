import React, { useState, Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ReviewCard from "../ReviewCard/ReviewCard";
import Loader from "../Loader/Loader";
import { useSnackbar } from "notistack";
import { addItemsToCart } from "../../actions/cartAction";
import "./productDetails.css";
import MetaData from "../MetaData";
import { newReview } from "../../actions/reviewAction";
import { NEW_REVIEW_RESET } from "../../constants/reviewConstant";
import { myOrders } from "../../actions/orderAction";

const ProductDetails = () => {
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    product,
    loading,
    error: productError,
  } = useSelector((state) => state.product);
  const { error: userError, user } = useSelector((state) => state.user);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReivew
  );
  const { orders, error: orderError } = useSelector((state) => state.myOrders);

  const increaseQty = (e) => {
    e.preventDefault();
    if (quantity >= product.stock) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQty = (e) => {
    e.preventDefault();
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItemsToCart(id, quantity));
    enqueueSnackbar("Items added to cart", { variant: "success" });
  };

  const checkProductOrderedOrNot = () => {
    const found = orders
      .map((orderItem) => {
        return orderItem.orderItems;
      })
      .flat()
      .find((item) => {
        return item.product === id;
      });

    if (!found) {
      enqueueSnackbar("Sorry you have not bought this product yet", {
        variant: "warning",
      });
    }
    return found;
  };

  const hadleReviewSubmit = async (e) => {
    e.preventDefault();
    if (orderError) {
      setRating(0);
      setComment("");
      return enqueueSnackbar(orderError, { variant: "warning" });
    }

    const found = await checkProductOrderedOrNot();
    if (!found) return;

    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("review", comment);
    myForm.set("product", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  const submitReviewToggle = async () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (success) {
      enqueueSnackbar("Review Submitted Successfully", {
        variant: "success",
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    if (productError) {
      enqueueSnackbar(productError, {
        variant: "error",
      });
      navigate("/");
      dispatch(clearErrors());
    }
    if (reviewError) {
      enqueueSnackbar(reviewError, {
        variant: "error",
      });
      dispatch(clearErrors());
    }

    if (userError) {
      enqueueSnackbar(userError, {
        variant: "error",
      });
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
    if (user) {
      dispatch(myOrders());
    }
  }, [dispatch, success, id, enqueueSnackbar]);

  const options = {
    size: "large",
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <MetaData title={`Urbane Man | ${product && product.name}`}></MetaData>
      <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            maxWidth: { md: "90%", sm: "95%", xs: "100%" },
            maxHeight: "100%",
            // margin: "0 auto",
            flexDirection: { sm: "row", xs: "column" },
            // alignItems: "center",
            gap: { md: "2rem", sm: "1rem", xs: ".5rem" },
          }}
        >
          {/* Left Box */}
          <Box
            sx={{
              width: { md: "50%", xs: "100%" },
              // width: "100%",
              backgroundColor: "#f7f7f7",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Carousel>
                {product &&
                  product.images &&
                  product.images.map((image, i) => {
                    return (
                      <img
                        src={image.url}
                        key={image.url}
                        alt={`${i} slide}`}
                      />
                    );
                  })}
              </Carousel>
            </Box>
          </Box>

          {/* Rigth Box */}
          <Box
            sx={{
              width: { md: "50%", xs: "100%" },
              // backgroundColor: "green",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1rem",
              padding: ".5rem 1rem 0.5re, 0.2rem",
            }}
            className="rightBox"
          >
            {/* Name and product id */}
            <Stack sx={{ display: "flex", gap: "0.25rem" }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.2rem",
                }}
              >
                {product && product.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "lightgrey",
                  marginBottom: 0,
                }}
              >
                Product #{product && product._id}
              </Typography>
              <Typography>
                Status:
                <Typography
                  component="span"
                  sx={{
                    color: product && product.stock < 1 ? "red" : "Green",
                    fontWeight: "Bold",
                  }}
                >
                  {product && product.stock < 1 ? "Out Of Stock" : "In Stock"}
                </Typography>
              </Typography>
            </Stack>

            {/* Ratings */}
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "0.2rem",
                borderTop: "1px solid grey",
                borderBottom: "1px solid grey",
                paddingTop: ".5rem",
                paddingBottom: ".5rem",
              }}
            >
              <Rating {...options}></Rating>
              <Typography sx={{ color: "#111", fontSize: "0.9rem" }}>
                ({product && product?.reviews?.length} reviews)
              </Typography>
            </Stack>

            {/* Price and description */}
            <Stack sx={{ display: "flex", gap: "0.3rem" }}>
              <Typography
                component="h1"
                sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
              >
                ₹{product && product.price}
              </Typography>
              <Typography
                sx={{ lineHeight: "1", fontWeight: "Bold", color: "gray" }}
              >
                Description: <br />
                <Typography
                  component="span"
                  sx={{ fontSize: "1rem", color: "black" }}
                >
                  {product && product.description}
                </Typography>
              </Typography>
            </Stack>

            {/* Add to cart */}
            <Box sx={{ width: "100%" }}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.1rem",
                }}
              >
                <Button variant="contained" size="small" onClick={decreaseQty}>
                  <RemoveIcon />
                </Button>
                <TextField
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  size="small"
                  disabled
                  value={quantity}
                ></TextField>
                <Button variant="contained" size="small" onClick={increaseQty}>
                  <AddIcon></AddIcon>
                </Button>
              </Stack>
              <Button
                variant="contained"
                size="small"
                sx={{ marginTop: "0.5rem", width: { xs: "100%" } }}
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </Box>
            <Button
              onClick={submitReviewToggle}
              variant="contained"
              size="small"
            >
              Submit a review
            </Button>
          </Box>
        </Box>

        {/* REVIEWS */}
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>Submit Review</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            ></Rating>
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              maxRows={4}
            />
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={submitReviewToggle}
              size="small"
              vairant="outlined"
              sx={{ display: "inline-block" }}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ display: "inline-block" }}
              onClick={hadleReviewSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{
            width: { md: "90%", sm: "95%", xs: "100%" },
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography
            component="h3"
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              textDecorationLine: "underline",
              color: "primary.main",
            }}
          >
            Reviews
          </Typography>

          {product && product.reviews && product.reviews[0] ? (
            <>
              <Grid
                container
                direction="row"
                rowSpacing={5}
                columnSpacing={{ xs: 1, sm: 2, md: 5 }}
              >
                {product.reviews.map((review) => {
                  return (
                    <Grid item md={3} sm={4} xs={6} key={review._id}>
                      <ReviewCard
                        review={review}
                        product={product}
                      ></ReviewCard>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          ) : (
            <Typography sx={{ textAlign: "center", fontSize: "2rem" }}>
              No reviews
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;

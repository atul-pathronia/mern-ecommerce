import React, { useEffect, Fragment, useState } from "react";
import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  getAllReviewsOfSingleUser,
  updateSingleReviewsOfUser,
  getSingleReviewsOfUser,
} from "../../actions/reviewAction";
import Loader from "../Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";
import { MY_REVIEW_UPDATE_RESET } from "../../constants/reviewConstant";
// import {} from "../../constants/reviewConstant";

const AllReviewsList = () => {
  const [rating, setRating] = useState("");
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const {
    loading,
    allReviews,
    error: allReviewsError,
  } = useSelector((state) => state.getAllReviewsOfUser);
  const {
    loading: singleReviewLoading,
    singleReview,
    error: singleReviewErorr,
    isUpdated,
  } = useSelector((state) => state.updateMyReview);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (singleReview) {
      setRating(singleReview.rating);
      setReview(singleReview.review);
    }

    if (isUpdated) {
      enqueueSnackbar("Review submitted successfully", { variant: "success" });
      dispatch({ type: MY_REVIEW_UPDATE_RESET });
    }
    dispatch(getAllReviewsOfSingleUser());
  }, [
    allReviewsError,
    singleReviewErorr,
    dispatch,
    singleReview,
    isUpdated,
    enqueueSnackbar,
  ]);

  const editReview = (id) => {
    setOpen(!open);
    dispatch(getSingleReviewsOfUser(id));
  };

  const submitEditReview = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("review", review);
    myForm.set("product", singleReview.product);
    dispatch(updateSingleReviewsOfUser(singleReview._id, myForm));
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 150, flex: 1 },
    {
      field: "review",
      headerName: "Review",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "product",
      headerName: "Product Id",
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
            <Button onClick={() => editReview(params.id)}>
              {/* <Link to={`/admin/product/${params.id}`} className="viewOrder"> */}
              <EditIcon></EditIcon>
              {/* </Link> */}
            </Button>
            {/* <Button>
              <DeleteIcon></DeleteIcon>
            </Button> */}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  allReviews &&
    allReviews.map((review) => {
      return rows.push({
        id: review?._id,
        review: review?.review,
        rating: review?.rating,
        product: review?.product,
      });
    });

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

      <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
        {/* REVIEWS */}
        {singleReviewLoading ? (
          <Loader></Loader>
        ) : (
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={editReview}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            <DialogTitle sx={{ textAlign: "center" }}>
              Submit Review
            </DialogTitle>
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
                value={review}
                onChange={(e) => setReview(e.target.value)}
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
                onClick={() => setOpen(false)}
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
                onClick={submitEditReview}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default AllReviewsList;

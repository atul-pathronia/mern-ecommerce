import React, { useEffect } from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { clearErrors } from "../../actions/userAction";
import MetaData from "../MetaData";
import { useSnackbar } from "notistack";

const SuccessPage = () => {
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      navigate("/");
      enqueueSnackbar("Unauthorized access. ", {
        variant: "error",
      });
      dispatch(clearErrors());
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1.2rem",
            height: "50vh",
          }}
        >
          <MetaData title={`Urbane Man | Order Successful`}></MetaData>
          <CheckCircleIcon
            sx={{ fontSize: "3rem", color: "primary.main" }}
          ></CheckCircleIcon>
          <Typography>Your order has been placed successfully</Typography>
          <Button variant="contained">
            <Link to="/myaccount">View Orders</Link>
          </Button>
        </Box>
      )}
    </>
  );
};

export default SuccessPage;

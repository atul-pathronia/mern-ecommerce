import React, { useEffect } from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MetaData from "../MetaData";

const SuccessPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
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
  );
};

export default SuccessPage;

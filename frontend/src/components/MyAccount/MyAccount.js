import React, { useEffect } from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import Profile from "../Profile/Profile";
import MyOrders from "../MyOrders/MyOrders";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AllReviewsList from "../MyReviews/AllReviewsList";
import Loader from "../Loader/Loader";
import { useSnackbar } from "notistack";
import MetaData from "../MetaData";

const MyAccount = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showdashboard, setShowDashboard] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { error, user, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error]);

  const toggleTabs = (e) => {
    if (e.target.name === "profile") {
      setShowProfile(true);
      setShowOrders(false);
      setShowReviews(false);
      setShowDashboard(false);
    }
    if (e.target.name === "orders") {
      setShowOrders(true);
      setShowProfile(false);
      setShowDashboard(false);
      setShowReviews(false);
    }
    if (e.target.name === "reviews") {
      setShowOrders(false);
      setShowProfile(false);
      setShowDashboard(false);
      setShowReviews(true);
    }
    if (e.target.name === "dashboard") {
      setShowDashboard(true);
      setShowProfile(false);
      setShowOrders(false);
      setShowReviews(false);
    }
  };

  return (
    <>
      <MetaData title={`Urbane Man | My Account`}></MetaData>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100", sm: "95%", md: "90%" },
            margin: "0 auto",
            gap: "1rem",
            // backgroundColor: "grey",
            padding: "1rem",
          }}
        >
          {/* LEFT BOX */}
          <Box>
            <Stack
              sx={{
                display: "flex",
                gap: "1rem",
                flexDirection: { xs: "row", sm: "column" },
              }}
              onClick={toggleTabs}
            >
              <Button
                size="small"
                name="profile"
                variant={showProfile ? "contained" : null}
                startIcon={<PersonIcon></PersonIcon>}
              >
                Profile
              </Button>
              <Button
                size="small"
                name="orders"
                variant={showOrders ? "contained" : null}
                startIcon={<ShoppingBasketIcon />}
              >
                My Orders
              </Button>
              <Button
                size="small"
                name="reviews"
                variant={showReviews ? "contained" : null}
                startIcon={<ShoppingBasketIcon />}
              >
                My Reviews
              </Button>
              {user.role === "admin" && (
                <Button
                  size="small"
                  variant={showdashboard ? "contained" : null}
                  name="dashboard"
                  startIcon={<DashboardIcon />}
                >
                  DashBoard
                </Button>
              )}
            </Stack>
          </Box>
          {/* RIGHT bOX */}
          <Box sx={{ flexGrow: 1 }}>
            {showProfile && <Profile user={user}></Profile>}
            {showOrders && <MyOrders />}
            {showReviews && <AllReviewsList />}
            {showdashboard && (
              <Link to="admin/control">
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    color: "primary.main",
                  }}
                >
                  Visit Dashboard
                </Typography>
              </Link>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyAccount;

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate, Link } from "react-router-dom";
import Search from "../Search/Search";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { logoutUser } from "../../actions/userAction";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { useSnackbar } from "notistack";

const Header = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isAuthenticated } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginAndMyAccount = (e) => {
    if (isAuthenticated) {
      navigate("/myaccount");
    } else {
      navigate("/login");
    }
  };

  const toggleSignUpAndLogout = (e) => {
    if (isAuthenticated) {
      dispatch(logoutUser());
      enqueueSnackbar("Logout Successfully", { variant: "success" });
      navigate("/");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {}, [cartItems]);

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          {/* logo name */}
          <Link to="/" className="logo">
            <CheckroomIcon></CheckroomIcon>
            <Typography
              sx={{
                fontSize: "1.2rem",
                marginTop: "4px",
                display: { xs: "none", lg: "block" },
              }}
            >
              Urbane Man
            </Typography>
          </Link>
          <Box
            className={`menu ${isMenuOpen ? "menuOpen" : ""}`}
            sx={{
              marginLeft: "auto",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
            onClick={toggleMenu}
          >
            <Typography>
              <Link to="/">Home</Link>
            </Typography>
            <Typography>
              <Link to="/products">Products</Link>
            </Typography>
            <Typography>
              <Link to="/about">About Us</Link>
            </Typography>
            <Typography>
              <Link to="/contactus">Contact Us</Link>
            </Typography>
          </Box>
          <Search></Search>
          <Stack
            sx={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {window.location.pathname === "/login" ? (
              <>
                <Button
                  size="small"
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    color: "#1976d2",
                    "&:hover": { backgroundColor: "#3084d5", color: "white" },
                  }}
                  onClick={toggleSignUpAndLogout}
                >
                  {isAuthenticated ? "Logout" : "Signup"}
                </Button>
              </>
            ) : window.location.pathname === "/register" ? (
              <>
                <Button
                  size="small"
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    color: "#1976d2",
                    "&:hover": { backgroundColor: "#3084d5", color: "white" },
                  }}
                  onClick={toggleLoginAndMyAccount}
                >
                  {isAuthenticated ? "My Account" : "Login"}
                </Button>
              </>
            ) : window.location.pathname === "/myaccount" ? (
              <>
                <Button
                  size="small"
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    color: "#1976d2",
                    "&:hover": { backgroundColor: "#3084d5", color: "white" },
                  }}
                  onClick={toggleSignUpAndLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    color: "#1976d2",
                    "&:hover": { backgroundColor: "#3084d5", color: "white" },
                  }}
                  onClick={toggleSignUpAndLogout}
                >
                  {isAuthenticated ? "Logout" : "Signup"}
                </Button>
                <Button
                  size="small"
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    color: "#1976d2",
                    "&:hover": { backgroundColor: "#3084d5", color: "white" },
                  }}
                  onClick={toggleLoginAndMyAccount}
                >
                  {isAuthenticated ? "My Account" : "Login"}
                </Button>{" "}
              </>
            )}
            {/* <Typography sx={{ display: "flex" }}> */}
            <Link to="/cart" className="cartAlign">
              <AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon>
              <Typography component="span">
                {cartItems.length > 0 && cartItems.length}
              </Typography>
            </Link>
            {/* </Typography> */}
          </Stack>
          <Stack
            sx={{ display: "flex", flexDirection: "row", zIndex: 99999 }}
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <CloseOutlinedIcon
                sx={{ display: { md: "none" } }}
              ></CloseOutlinedIcon>
            ) : (
              <MenuOutlinedIcon
                sx={{ display: { md: "none" } }}
              ></MenuOutlinedIcon>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;

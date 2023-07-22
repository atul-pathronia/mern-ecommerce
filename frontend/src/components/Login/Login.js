import {
  InputAdornment,
  Paper,
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";

const Login = ({ getStripeApiKey }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector((state) => {
    return state.user;
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const redirect = window.location.search
    ? `/${window.location.search.split("=")[1]}`
    : "/myaccount";

  // console.log(window.location.search);

  // console.log(redirect);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      enqueueSnackbar("Log in Successful", { variant: "success" });
      navigate(redirect);
      getStripeApiKey();
    }
  }, [error, isAuthenticated]);

  return (
    <Box
      sx={{
        backgroundColor: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0",
      }}
    >
      <MetaData title={`Urbane Man | Login`}></MetaData>
      <Box component="form">
        <Paper sx={{ padding: "1rem" }}>
          <Stack gap="1rem">
            <TextField
              sx={{ outline: "none" }}
              // size="small"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="text"
              autoComplete="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon></MailOutlineIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              label="Password"
              type="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon></LockIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography component="span" sx={{ fontSize: "0.7rem" }}>
                No Account?
                <Link to="/register">
                  <Typography
                    component="span"
                    sx={{ color: "primary.main", fontSize: "0.7rem" }}
                  >
                    &nbsp;Signup
                  </Typography>
                </Link>
              </Typography>
              <Link to="/me/password/forgot">
                <Typography
                  component="span"
                  sx={{ color: "primary.main", fontSize: "0.7rem" }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
            <Button
              variant="contained"
              type="submit"
              onClick={handleLogin}
              disabled={loading ? true : false}
            >
              {loading ? <CircularProgress /> : "Submit"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;

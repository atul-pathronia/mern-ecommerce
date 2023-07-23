import { useState, useEffect } from "react";
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
import MetaData from "../MetaData";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import UserImage from "../../images/UserImage.png";
import Loader from "../Loader/Loader";
import { useSnackbar } from "notistack";

import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const { enqueueSnackbar } = useSnackbar();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerError, registerLoading, isAuthenticated } = useSelector(
    (state) => {
      return state.user;
    }
  );

  const handleSignup = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    // console.log("avatar", email, password);
  };

  useEffect(() => {
    if (registerError) {
      enqueueSnackbar(registerError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      enqueueSnackbar("Log in Successful", { variant: "success" });
      navigate("/myaccount");
    }
  }, [registerError, dispatch, isAuthenticated]);

  const handleOnChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

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
      <MetaData title={`Urbane Man | Register`}></MetaData>
      <Box component="form" encType="multipart/form-data">
        <Paper sx={{ padding: "1rem" }}>
          <Stack gap="1rem">
            <TextField
              sx={{ outline: "none" }}
              // size="small"
              variant="outlined"
              label="Name"
              name="name"
              value={name}
              onChange={handleOnChange}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Face5OutlinedIcon></Face5OutlinedIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              sx={{ outline: "none" }}
              // size="small"
              variant="outlined"
              label="Email"
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon></MailOutlineIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              variant="outlined"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleOnChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon></LockIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Stack
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <img
                src={!avatarPreview ? UserImage : avatarPreview}
                alt="Avatar Preview"
                className="userAvatar"
              />
              <TextField
                variant="outlined"
                // label="avatar"
                name="avatar"
                type="file"
                accept="image/"
                onChange={handleOnChange}
              ></TextField>
            </Stack>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography component="span" sx={{ fontSize: "0.8rem" }}>
                Already have an account?
                <Link to="/login">
                  <Typography
                    component="span"
                    sx={{ color: "primary.main", fontSize: "0.8rem" }}
                  >
                    &nbsp;Login
                  </Typography>
                </Link>
              </Typography>
              {/* <Link to="/password/forgot">
                <Typography
                  component="span"
                  sx={{ color: "primary.main", fontSize: "0.7rem" }}
                >
                  Forgot Password?
                </Typography>
              </Link> */}
            </Box>
            <Button
              variant="contained"
              type="submit"
              disabled={registerLoading ? true : false}
              onClick={handleSignup}
            >
              {registerLoading ? (
                <CircularProgress></CircularProgress>
              ) : (
                "Submit"
              )}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;

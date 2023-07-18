import { useState, useEffect } from "react";
import MetaData from "../MetaData";
import {
  InputAdornment,
  Paper,
  Box,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateUserProfile,
} from "../../actions/userAction";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import UserImage from "../../images/UserImage.png";
import Loader from "../Loader/Loader";
import { useSnackbar } from "notistack";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isUpdated,
    error: userProfileUpdateError,
    loading,
  } = useSelector((state) => {
    return state.profile;
  });
  const {
    user,
    error: userError,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateUserProfile(myForm));
  };

  const handleOnChange = (e) => {
    // if (e.target.name === "avatar") {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    // } else {
    //   setUser({ ...user, [e.target.name]: e.target.value });
    // }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar && user.avatar.url && user.avatar.url);
      setAvatarPreview(user.avatar && user.avatar.url && user.avatar.url);
    }
    if (userError) {
      enqueueSnackbar(userError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (userProfileUpdateError) {
      enqueueSnackbar(userProfileUpdateError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      enqueueSnackbar("Profile Update Successfully", { variant: "success" });
      dispatch(loadUser());
      navigate("/myaccount");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [
    userError,
    userProfileUpdateError,
    dispatch,
    isUpdated,
    user,
    enqueueSnackbar,
  ]);

  return (
    <>
      <MetaData title={`Urbane Man | Update Profile`}></MetaData>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Box
          sx={{
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 0",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "2rem",
              fontWeight: "bold",
              borderBottom: "5px solid #1976d2",
              //   textDecoration: "underline",
            }}
          >
            Update Profile
          </Typography>
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon></MailOutlineIcon>
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
                <Button
                  variant="contained"
                  type="submit"
                  //   disabled={loading ? true : false}
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdateProfile;

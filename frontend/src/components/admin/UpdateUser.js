import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  Paper,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import { adminUpdateSingleUser, clearErrors } from "../../actions/userAction";
import { ADMIN_USER_DETAILS__UPDATE_RESET } from "../../constants/userConstant";
import Loader from "../Loader/Loader";

const UpdateUser = ({ setShowUsers, setShowUpdateUser }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    loading,
    error: getSingleUserError,
    user,
    userFetched,
  } = useSelector((state) => state.adminSingleUser);

  const {
    error: updateError,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userFetched) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (getSingleUserError) {
      enqueueSnackbar(getSingleUserError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (updateError) {
      enqueueSnackbar(updateError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      enqueueSnackbar("User Updated successfully", { variant: "success" });
      dispatch({ type: ADMIN_USER_DETAILS__UPDATE_RESET });
      setShowUpdateUser(false);
      setShowUsers(true);
    }
  }, [
    enqueueSnackbar,
    setShowUpdateUser,
    setShowUsers,
    user.email,
    user.name,
    user.role,
    dispatch,
    isUpdated,
    updateError,
    getSingleUserError,
    userFetched,
  ]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(adminUpdateSingleUser(user._id, myForm));
  };

  if (updateLoading) {
    return <Loader></Loader>;
  }

  return (
    <Box sx={{ backgroundColor: "#f7f7f7", width: "100%", padding: "1rem" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeigh: "bold",
          marginBottom: "1rem",
        }}
      >
        User Update Screen
      </Typography>
      <Box
        component="form"
        encType="multipart/form-data"
        sx={{
          width: { xs: "95%", sm: "90%", md: "40%" },
          margin: "0 auto",
        }}
      >
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
                    <SpellcheckIcon></SpellcheckIcon>
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
              placeholder="Price"
              name="price"
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
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                width: "100%",
              }}
            >
              <InputLabel>
                <VerifiedUserIcon></VerifiedUserIcon>
              </InputLabel>
              <Select
                value={role}
                required
                size="small"
                sx={{ width: "100%" }}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="user" key={user}>
                  User
                </MenuItem>
                <MenuItem value="admin" key={user}>
                  Admin
                </MenuItem>
              </Select>
            </Stack>

            <Button
              variant="contained"
              type="submit"
              disabled={updateLoading ? true : false}
              onClick={handleUpdateUser}
            >
              {loading ? <CircularProgress /> : "Update User"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default UpdateUser;

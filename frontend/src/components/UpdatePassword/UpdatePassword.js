import React, { useEffect, useState } from "react";
import MetaData from "../MetaData";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import {
  Button,
  InputAdornment,
  TextField,
  Stack,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import {
  updateUserPassword,
  clearErrors,
  loadUser,
} from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isUpdated } = useSelector((state) => state.profile);
  const { error: userError, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (userError) {
      enqueueSnackbar("You cannot access this page without login. ", {
        variant: "error",
      });
      dispatch(clearErrors());
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (isUpdated) {
      enqueueSnackbar("Password updated successfullly", { variant: "success" });
      navigate("/myaccount");
      // dispatch(loadUser());
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [error, dispatch, isUpdated, userError]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    console.log(myForm);
    dispatch(updateUserPassword(myForm));
  };

  return (
    <>
      <MetaData title={`Urbane Man | Update Password`}></MetaData>
      {/* {loading ? (
        <Loader></Loader>
      ) : ( */}
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
          Update Password
        </Typography>
        <Box component="form" encType="multipart/form-data">
          <Paper sx={{ padding: "1rem" }}>
            <Stack gap="1rem">
              <TextField
                sx={{ outline: "none" }}
                // size="small"
                variant="outlined"
                label="Old Password"
                name="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon></LockOpenIcon>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                sx={{ outline: "none" }}
                // size="small"
                variant="outlined"
                label="New Password"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon></LockIcon>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                sx={{ outline: "none" }}
                // size="small"
                variant="outlined"
                label="Confirm New Password"
                type="password"
                name="confirmNewPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon></LockIcon>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <Button
                variant="contained"
                type="submit"
                disabled={loading ? true : false}
                onClick={handleUpdatePassword}
              >
                {loading ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  "Update Password"
                )}
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
      {/* )} */}
    </>
  );
};

export default UpdatePassword;

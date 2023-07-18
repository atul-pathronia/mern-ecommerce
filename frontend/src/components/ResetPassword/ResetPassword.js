import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import MetaData from "../MetaData";
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
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useParams } from "react-router-dom";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  console.log(token);
  const { loading, error, status } = useSelector((state) => state.forgotPass);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (status) {
      enqueueSnackbar("Password reset successfully", { variant: "success" });
      navigate("/login");
    }
  }, [error, status]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  return (
    <>
      <MetaData title={`Urbane Man | Reset Password`}></MetaData>
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
            Reset Password
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
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
                  Reset Password
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ResetPassword;

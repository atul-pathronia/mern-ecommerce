import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import Loader from "../Loader/Loader";
import { useSnackbar } from "notistack";
import MetaData from "../MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, loading, message } = useSelector((state) => state.forgotPass);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
    }
  }, [error, message]);

  return (
    <>
      <MetaData title={`Urbane Man | Forgot Password`}></MetaData>
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
            gap: "2rem",
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
            Forgot Password
          </Typography>
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
                  placeholder="Enter your registered email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon></MailOutlineIcon>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleForgotPassword}
                  disabled={loading ? true : false}
                >
                  Submit
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;

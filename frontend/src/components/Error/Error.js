import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DangerousIcon from "@mui/icons-material/Dangerous";
import MetaData from "../MetaData";

const Error = () => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MetaData title={`Urbane Man | Not Found`}></MetaData>
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DangerousIcon sx={{ fontSize: "4rem", color: "red" }}></DangerousIcon>
        <Typography sx={{ fontSize: "2rem" }}>No Page Found</Typography>
        <Link to="/">
          <Button variant="contained">Back to Home</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Error;

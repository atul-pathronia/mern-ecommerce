import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import "./Profile.css";
import UserImage from "../../images/UserImage.png";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Stack sx={{ display: "flex", gap: "1rem" }}>
            <Typography
              sx={{
                textAlign: "center",
                color: "primary.main",
                fontSize: "1.5rem",
              }}
            >
              My Profile
            </Typography>
            <img
              className="userProfile"
              src={user.avatar && user.avatar.url && user.avatar.url}
              alt={user.name}
            />
            <Button
              variant="contained"
              sx={{
                width: "max-content",
                marginRight: ".5rem",
                marginLeft: "auto",
                position: { xs: "absolute", sm: "relative" },
                left: { xs: ".5rem" },
                bottom: { xs: 0 },
              }}
            >
              <Link to="/me/update">Edit Profile</Link>
            </Button>
          </Stack>
          <Stack sx={{ display: "flex", gap: "1rem" }}>
            <Box>
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                Full Name:{" "}
              </Typography>
              <Typography component="span">{user.name}</Typography>
            </Box>
            <Box>
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                Email:{" "}
              </Typography>
              <Typography component="span">{user.email}</Typography>
            </Box>
            <Box>
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                Joined on:{" "}
              </Typography>
              <Typography component="span">
                {user.createdAt
                  ? String(user.createdAt).substring(0, 10)
                  : "25-04-1990"}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  marginRight: ".5rem",
                  marginLeft: "auto",
                  display: "block",
                }}
              >
                <Link to="/me/password/update">Change Password</Link>
              </Button>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Profile;

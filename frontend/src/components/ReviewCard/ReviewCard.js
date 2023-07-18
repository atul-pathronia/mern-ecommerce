import React from "react";
import ReactStar from "react-rating-stars-component";
import { Box, Card, Stack, Typography, Rating } from "@mui/material";
import userImage from "../../images/UserImage.png";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Box sx={{ marginBottom: "1rem" }}>
      <Card
        sx={{
          padding: ".2rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <img
          className="userImg"
          // src={user}
          alt="user"
        />
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {review?.user?.name}
        </Typography>
        {/* <Stack sx={{ margin: "0 auto" }}> */}
        <Rating {...options}></Rating>
        {/* </Stack> */}
        <Typography sx={{ fontSize: ".8rem", textAlign: "center" }}>
          {review.review}
        </Typography>
      </Card>
    </Box>
  );
};

export default ReviewCard;

import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import "./Product.css";

const Product = ({ product }) => {
  //   console.log(product);

  const options = {
    size: "large",
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link to={`/product/${product._id}`} className="productCard">
      <img src={product.images[0].url} alt={product.name} />
      <Stack sx={{ marginLeft: "0.2rem" }}>
        <Typography
          sx={{
            fontWeight: "Bold",
            color: "grey",
            textTransform: "capitalize",
          }}
        >
          {product.name}
        </Typography>
        <Stack
          sx={{
            gap: { md: "0.5rem", sm: 0 },
            display: "flex",
            flexWrap: "wrap",
            flexDirection: { md: "row", sm: "column" },
            alignItems: { md: "flex-end", sm: "flex-start" },
          }}
        >
          <Rating {...options}></Rating>
          <Typography sx={{ color: "#111" }}>
            ({product.numOfReviews} reviews)
          </Typography>
        </Stack>
        <Typography sx={{ color: "#1976d2", marginTop: "0.25rem" }}>
          ₹{product.price}
        </Typography>
      </Stack>
    </Link>
  );
};

export default Product;

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./CartItem.css";

const CartItem = ({ item, deleteItemsFromCart }) => {
  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "0.5rem",
        }}
      >
        <img src={item.images} className="productImg" alt={item.name} />
        <Box>
          <Link to={`/product/${item._id}`}>
            <Typography sx={{ color: "gray" }}>{item.name}</Typography>
          </Link>
          <Typography sx={{ fontSize: "0.7rem" }}>
            Price: ₹{item.price}
          </Typography>
          <Typography
            sx={{ color: "red", fontSize: "0.8rem", cursor: "pointer" }}
            onClick={() => deleteItemsFromCart(item.product)}
          >
            Remove
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CartItem;

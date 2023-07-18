import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseCartQuantity = (id, quantity, stock) => {
    const newQauntity = quantity + 1;
    if (newQauntity > stock) return;
    dispatch(addItemsToCart(id, newQauntity));
  };

  const decreaseCartQuantity = (id, quantity) => {
    const newQauntity = quantity - 1;
    if (newQauntity < 1) return;
    dispatch(addItemsToCart(id, newQauntity));
  };

  const deleteItemsFromCart = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <MetaData title={`Urbane Man | Cart`}></MetaData>
      {cartItems.length === 0 ? (
        <Box
          sx={{
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            width: { xs: "100%", sm: "95%", md: "90%" },
            margin: "0 auto",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <RemoveShoppingCartIcon
              sx={{ fontSize: "3rem" }}
            ></RemoveShoppingCartIcon>
            <Typography sx={{ color: "red", fontSize: "1.5rem" }}>
              No products in cart
            </Typography>
            <Link to="/products">
              <Button variant="contained" sx={{ marginTop: "0.5rem" }}>
                View Products
              </Button>
            </Link>
          </Stack>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              minHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: { xs: "100%", sm: "95%", md: "90%" },
              margin: "0 auto",
            }}
          >
            {/* HEADER */}
            <Stack
              sx={{
                backgroundColor: "primary.main",
                display: "flex",
                flexDirection: "row",
                color: "white",
                padding: "1rem",
                gap: "1rem",
              }}
            >
              <Typography sx={{ flex: { md: 2, sm: 1.5, xs: 1 } }}>
                Product
              </Typography>
              <Typography
                sx={{ flex: { md: 0.5, sm: 1.5, xs: 1 }, textAlign: "center" }}
              >
                Quantity
              </Typography>
              <Typography
                sx={{ flex: { md: 0.5, sm: 1.5, xs: 1 }, textAlign: "right" }}
              >
                Subtotal
              </Typography>
            </Stack>

            {/* CART ITEMS */}
            <Stack
              sx={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                padding: "1rem",
              }}
            >
              {cartItems &&
                cartItems.map((item) => {
                  // console.log(cartItems);
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      key={item.product}
                    >
                      <Box
                        sx={{
                          flex: { md: 2, sm: 1.5, xs: 1 },
                        }}
                      >
                        <CartItem
                          item={item}
                          deleteItemsFromCart={deleteItemsFromCart}
                        ></CartItem>
                      </Box>
                      <Stack
                        sx={{
                          flex: { md: 0.5, sm: 1.5, xs: 1 },
                          display: "flex",
                          gap: ".5rem",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ minWidth: 0 }}
                          onClick={() =>
                            decreaseCartQuantity(item.product, item.quantity)
                          }
                        >
                          -
                        </Button>
                        <input
                          className="inputHeight"
                          type="number"
                          value={item.quantity}
                          readOnly
                        />
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ minWidth: 0 }}
                          onClick={() =>
                            increaseCartQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                        >
                          +
                        </Button>
                      </Stack>
                      <Stack
                        sx={{
                          flex: { md: 0.5, sm: 1.5, xs: 1 },
                          textAlign: "right",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          ₹{item.price * item.quantity}
                        </Typography>
                      </Stack>
                    </Box>
                  );
                })}
            </Stack>

            {/* UNDERLINE*/}
            <Box sx={{ display: "flex" }}>
              <Stack sx={{ flex: 2 }}></Stack>
              <Stack
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  flex: 1,
                }}
              ></Stack>
            </Box>

            {/* GROSS TOTAL */}
            <Box>
              <Box sx={{ display: "flex" }}>
                <Stack sx={{ flex: 2 }}></Stack>
                <Stack
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingRight: "1rem",
                      gap: "1rem",
                      paddingLeft: { xs: 0, sm: "0.5rem", md: "1rem" },
                    }}
                  >
                    <Typography>Gross Total</Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      ₹
                      {cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}
                    </Typography>
                  </Stack>
                  <Button variant="contained" onClick={handleCheckout}>
                    Checkout
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Cart;

import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  ORDERED_PLACED_CART_NIL,
} from "../constants/cartConstant";
import axios from "axios";
import { api } from "../config";

// ADD ITEM TO CART
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${api.endpoint}/products/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.data.product._id,
      name: data.data.product.name,
      price: data.data.product.price,
      images: data.data.product.images[0].url,
      stock: data.data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE ITEM FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// NIL THE CART ONCE ORDER IS SUCCESSFUL
export const nilCartIfOrderSuccessful = () => async (dispatch, getState) => {
  dispatch({ type: ORDERED_PLACED_CART_NIL });
  localStorage.removeItem("cartItems");
};

// ADD SHIPPING INFO TO LOCAL STORAGE
export const addShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
  localStorage.setItem(
    "shippingInfo",
    JSON.stringify(getState().cart.shippingInfo)
  );
};

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_DETAILS_REQUEST,
  MY_ORDER_DETAILS_SUCCESS,
  MY_ORDER_DETAILS_FAIL,
  ADMIN_ALL_ORDER_REQUEST,
  ADMIN_ALL_ORDER_SUCCESS,
  ADMIN_ALL_ORDER_FAIL,
  ADMIN_UPDATE_ORDER_REQUEST,
  ADMIN_UPDATE_ORDER_SUCCESS,
  ADMIN_UPDATE_ORDER_FAIL,
  ADMIN_DELETE_ORDER_REQUEST,
  ADMIN_DELETE_ORDER_SUCCESS,
  ADMIN_DELETE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstant";
import axios from "axios";

// CREATE ORDER
export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: ORDER_CREATE_REQUEST });

  try {
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/order/new",
      order,
      config
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data.message });
  }
};

// GET MY ORDERS OF SINGLE USER
export const myOrders = () => async (dispatch) => {
  dispatch({ type: MY_ORDER_REQUEST });

  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/order/account/me"
    );
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.data.orders });
  } catch (error) {
    dispatch({ type: MY_ORDER_FAIL, payload: error?.response?.data?.message });
  }
};

// ADMIN ROLE - GET ALL ORDERS OF STORE
export const adminGetAllOrders = () => async (dispatch) => {
  dispatch({ type: ADMIN_ALL_ORDER_REQUEST });

  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/order/admin/orders"
    );

    dispatch({ type: ADMIN_ALL_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ADMIN ROLE - UPDAET SHIPPING STATUS OF ANY ORDER
export const adminUpdateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/order/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: ADMIN_UPDATE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ADMIN ROLE - DELETE ANY ORDER OF STORE
export const adminDeleteOrder = (id) => async (dispatch) => {
  dispatch({ type: ADMIN_DELETE_ORDER_REQUEST });

  try {
    await axios.delete(`http://localhost:8000/api/v1/order/admin/order/${id}`);
    dispatch({ type: ADMIN_DELETE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// USER ROLE - GET DETAILS OF EACH ORDER
export const myOrderDetails = (id) => async (dispatch) => {
  dispatch({ type: MY_ORDER_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/order/${id}`
    );

    dispatch({ type: MY_ORDER_DETAILS_SUCCESS, payload: data.data.order });
  } catch (error) {
    dispatch({
      type: MY_ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CLEAR ERRORS AFTER FAILED DISPATCH
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

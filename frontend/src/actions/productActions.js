import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCT_CREATE_REQUEST,
  ADMIN_PRODUCT_CREATE_SUCCESS,
  ADMIN_PRODUCT_CREATE_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  CLEAR_ERRORS,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
} from "../constants/productConstant";

// GET ALL PRODUCTS WITH FILTERS IF ANY
export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `http://localhost:8000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;

      if (category) {
        link = `http://localhost:8000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// ADMIN ROLE - GET ALL PRODUCTS OF STORE
export const getProductsAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/products/admin/products"
    );
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ADMIN ROLE - CREATE NEW PRODUCTS
export const createProductAdmin = (productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/products/admin/product/new",
      productData,
      config
    );
    dispatch({
      type: ADMIN_PRODUCT_CREATE_SUCCESS,
      payload: data.data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ADMIN ROLE - UPDATE ANY PRODUCT OF STORE
export const updateProductAdmin = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `http://localhost:8000/api/v1/products/admin/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: ADMIN_UPDATE_PRODUCT_SUCCESS,
      payload: data.data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ADMIN ROLE - DELETE ANY PRODUCTS OF STORE
export const deleteProductAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });

    await axios.delete(
      `http://localhost:8000/api/v1/products/admin/product/${id}`
    );
    dispatch({
      type: ADMIN_DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET SINGLE PRODUCT DETAILS
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/products/${id}`
    );
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// CLEAR ERRORS AFTER FAILED DISPATCH
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

import {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  MY_REVIEWS_REQUEST,
  MY_REVIEWS_SUCCESS,
  MY_REVIEWS_FAIL,
  MY_SINGLE_REVIEW_REQUEST,
  MY_SINGLE_REVIEW_SUCCESS,
  MY_SINGLE_REVIEW_FAIL,
  MY_REVIEW_UPDATE_REQUEST,
  MY_REVIEW_UPDATE_SUCCESS,
  MY_REVIEW_UPDATE_FAIL,
  CLEAR_ERRORS,
} from "../constants/reviewConstant";
import axios from "axios";
import { api } from "../config";

// CREATE NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${api.endpoint}/review/create`,
      reviewData,
      config
    );

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data?.data });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// GET ALL REVIEWS OF A SINGLE USER
export const getAllReviewsOfSingleUser = () => async (dispatch) => {
  try {
    dispatch({ type: MY_REVIEWS_REQUEST });

    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(`${api.endpoint}/review/me`);

    dispatch({ type: MY_REVIEWS_SUCCESS, payload: data?.data?.reviews });
  } catch (error) {
    dispatch({
      type: MY_REVIEWS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// GET SINGLE REVIEW OF A USER
export const getSingleReviewsOfUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: MY_SINGLE_REVIEW_REQUEST });

    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(`${api.endpoint}/review/me/${id}`);

    dispatch({ type: MY_SINGLE_REVIEW_SUCCESS, payload: data?.data?.review });
  } catch (error) {
    dispatch({
      type: MY_SINGLE_REVIEW_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// UPDATE REVIEW OF A SINGLE USER
export const updateSingleReviewsOfUser =
  (id, reviewData) => async (dispatch) => {
    try {
      dispatch({ type: MY_REVIEW_UPDATE_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.patch(
        `${api.endpoint}/review/edit/${id}`,
        reviewData,
        config
      );

      dispatch({ type: MY_REVIEW_UPDATE_SUCCESS, payload: data?.data?.review });
    } catch (error) {
      dispatch({
        type: MY_REVIEW_UPDATE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// CLEAR ERRORS AFTER FAILED DISPATCH
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

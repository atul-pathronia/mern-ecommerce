import {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  MY_REVIEWS_REQUEST,
  MY_REVIEWS_SUCCESS,
  MY_REVIEWS_FAIL,
  MY_SINGLE_REVIEW_REQUEST,
  MY_SINGLE_REVIEW_SUCCESS,
  MY_SINGLE_REVIEW_FAIL,
  MY_REVIEW_UPDATE_REQUEST,
  MY_REVIEW_UPDATE_SUCCESS,
  MY_REVIEW_UPDATE_FAIL,
  MY_REVIEW_UPDATE_RESET,
  CLEAR_ERRORS,
} from "../constants/reviewConstant";

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        review: action.payload,
        loading: false,
        success: true,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myReviewsReducer = (state = { allReviews: [] }, action) => {
  switch (action.type) {
    case MY_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_REVIEWS_SUCCESS:
      return {
        loading: false,
        allReviews: action.payload,
      };
    case MY_REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateMyReviewwReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case MY_REVIEW_UPDATE_REQUEST:
    case MY_SINGLE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_REVIEW_UPDATE_SUCCESS:
      return {
        loading: false,
        updatedReview: action.payload,
        isUpdated: true,
      };
    case MY_SINGLE_REVIEW_SUCCESS:
      return {
        loading: false,
        singleReview: action.payload,
      };
    case MY_REVIEW_UPDATE_FAIL:
    case MY_SINGLE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case MY_REVIEW_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

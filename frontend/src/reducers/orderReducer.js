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
  ADMIN_UPDATE_ORDER_RESET,
  ADMIN_DELETE_ORDER_REQUEST,
  ADMIN_DELETE_ORDER_SUCCESS,
  ADMIN_DELETE_ORDER_FAIL,
  ADMIN_DELETE_ORDER_RESET,
  CLEAR_ERRORS,
} from "../constants/orderConstant";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const adminAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_ORDER_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_ALL_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ADMIN_ALL_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const adminOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_ORDER_REQUEST:
    case ADMIN_DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        order: action.payload,
      };
    case ADMIN_DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case ADMIN_UPDATE_ORDER_FAIL:
    case ADMIN_DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADMIN_UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case ADMIN_DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
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

export const myOrdersDetailsReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case MY_ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
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

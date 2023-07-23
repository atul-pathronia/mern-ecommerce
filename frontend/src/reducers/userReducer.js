import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_SUCCESS,
  ADMIN_ALL_USERS_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_DETAILS_FAIL,
  ADMIN_USER_DETAILS_UPDATE_REQUEST,
  ADMIN_USER_DETAILS__UPDATE_SUCCESS,
  ADMIN_USER_DETAILS__UPDATE_FAIL,
  ADMIN_USER_DETAILS__UPDATE_RESET,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
  ADMIN_USER_DELETE_RESET,
} from "../constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loginLoading: true,
        isAuthenticated: false,
      };

    case REGISTER_REQUEST:
      return {
        registerLoading: true,
        isAuthenticated: false,
      };
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginLoading: false,
        isAuthenticated: false,
        user: null,
        loginError: action.payload,
      };
    case REGISTER_FAIL:
      //   console.log(state);
      return {
        ...state,
        registerLoading: false,
        isAuthenticated: false,
        user: null,
        registerError: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
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

// FOR USERS AND ADMIN
export const profileUpdateReducer = (state = {}, action) => {
  // console.log(action);
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case ADMIN_USER_DETAILS_UPDATE_REQUEST:
    case ADMIN_USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case ADMIN_USER_DETAILS__UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        user: action.payload,
      };
    case ADMIN_USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        message: action.payload.message,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case ADMIN_USER_DETAILS__UPDATE_FAIL:
    case ADMIN_USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case ADMIN_USER_DETAILS__UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case ADMIN_USER_DELETE_RESET:
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

// FORGOT PASSWORD
export const forgotPasswordReducer = (state = {}, action) => {
  // console.log(action);
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        message: null,
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

// ADMIN - ALL USERS
export const adminAllUsersReducer = (state = { users: [] }, action) => {
  // console.log(action);
  switch (action.type) {
    case ADMIN_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case ADMIN_ALL_USERS_FAIL:
      return {
        ...state,
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

// ADMIN - SINGLE USER
export const adminUserDetailsReducer = (state = { user: {} }, action) => {
  // console.log(action);
  switch (action.type) {
    case ADMIN_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        userFetched: false,
      };
    case ADMIN_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        userFetched: true,
      };
    case ADMIN_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userFetched: false,
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

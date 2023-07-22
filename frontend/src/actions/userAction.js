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
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
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
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
  FORGOT_PASSWORD_FAIL,
} from "../constants/userConstant";
import axios from "axios";
import { api } from "../config";

// LOGIN USER
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    // const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post(`${api.endpoint}/users/login`, {
      email,
      password,
    });

    dispatch({ type: LOGIN_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error?.response?.data?.message });
  }
};

// CREATE USER
export const register = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { "Content-type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${api.endpoint}/users/register`,
      formdata,
      config
    );
    dispatch({ type: REGISTER_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error?.response?.data?.message });
  }
};

// LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    // const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.get(`${api.endpoint}/users/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error?.response?.data?.message });
  }
};

// LOGOUT
export const logoutUser = () => async (dispatch) => {
  try {
    // dispatch({ type: LOAD_USER_REQUEST });
    // const config = { headers: { "Content-type": "application/json" } };

    await axios.get(`${api.endpoint}/users/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error?.response?.data?.message });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { "Content-type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${api.endpoint}/users/me/updateMe`,
      userdata,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data?.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// UPDATE USER PASSWORD
export const updateUserPassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.put(
      `${api.endpoint}/users/password/updatePassword`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data?.status });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post(
      `${api.endpoint}/users/password/forgot`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data?.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error && error.response.data.message,
    });
  }
};

// RESET PASSWORD
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.put(
      `${api.endpoint}/users/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data?.status });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// ADMIN ROLE - GET ALL USERS OF STORE
export const adminGetAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_USERS_REQUEST });
    // const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.get(`${api.endpoint}/users/admin/users`);

    dispatch({ type: ADMIN_ALL_USERS_SUCCESS, payload: data?.users });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_USERS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// ADMIN ROLE - GET DETAILS OF ANY USER OF STORE
export const adminGetSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_DETAILS_REQUEST });
    // const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.get(`${api.endpoint}/users/admin/user/${id}`);

    dispatch({ type: ADMIN_USER_DETAILS_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAILS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// ADMIN ROLE - UPDATE USER DETAILS OF ANY USER OF STORE
export const adminUpdateSingleUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_DETAILS_UPDATE_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.put(
      `${api.endpoint}/users/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: ADMIN_USER_DETAILS__UPDATE_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAILS__UPDATE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// ADMIN ROLE - DELETE ANY USER FROM STORE
export const adminDeleteSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_DELETE_REQUEST });
    // const config = { headers: { "Content-type": "application/json" } };

    await axios.delete(`${api.endpoint}/users/admin/user/${id}`);

    dispatch({ type: ADMIN_USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DELETE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// CLEAR ERRORS AFTER FAILED DISPATCH
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

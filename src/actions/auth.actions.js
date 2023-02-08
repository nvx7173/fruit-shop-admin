import { authConstants } from "./constants";
import axios from "../helpers/axios";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post(`/admin/signout`);

    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_ALL_USERS_REQUEST });
    const res = await axios.get(`/users`);
    if (res.status == 200) {
      dispatch({
        type: authConstants.GET_ALL_USERS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: authConstants.GET_ALL_USERS_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    if (user.role === "manager") {
      dispatch({ type: authConstants.USER_REGISTER_REQUEST });
      const res = await axios.post(`/admin/signup`, {
        ...user,
      });
      if (res.status === 201) {
        dispatch({
          type: authConstants.USER_REGISTER_SUCCESS,
          payload: { userData: JSON.parse(res.config.data) },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: authConstants.USER_REGISTER_FAILURE,
            payload: { error: res.data.error },
          });
        }
      }
    }
    if (user.role === "user") {
      dispatch({ type: authConstants.USER_REGISTER_REQUEST });
      const res = await axios.post(`/signup`, {
        ...user,
      });
      if (res.status === 201) {
        dispatch({
          type: authConstants.USER_REGISTER_SUCCESS,
          payload: { userData: JSON.parse(res.config.data) },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: authConstants.USER_REGISTER_FAILURE,
            payload: { error: res.data.error },
          });
        }
      }
    }
  };
};

export const updateUsers = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.UPDATE_USER_REQUEST });
      const res = await axios.post(`/user/update`, form);
      if (res.status === 201) {
        dispatch({ type: authConstants.UPDATE_USER_SUCCESS });
      } else {
        const { error } = res.data;
        dispatch({
          type: authConstants.UPDATE_USER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUsers = (ids) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.DELETE_USER_REQUEST });
    const res = await axios.post(`/user/delete`, {
      payload: {
        ids,
      },
    });
    if (res.status == 201) {
      dispatch({ type: authConstants.DELETE_USER_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: authConstants.DELETE_USER_FAILURE,
        payload: { error },
      });
    }
  };
};

export const getContacts = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_ALL_CONTACT_REQUEST });
    const res = await axios.post(`/contacts`);
    if (res.status == 200) {
      dispatch({
        type: authConstants.GET_ALL_CONTACT_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: authConstants.GET_ALL_CONTACT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

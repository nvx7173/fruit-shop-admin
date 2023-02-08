import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`product/create`, form);
  };
};

export const deleteProducts = (ids) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });
    const res = await axios.post(`/product/delete`, {
      payload: {
        ids,
      },
    });
    if (res.status == 201) {
      dispatch({ type: productConstants.DELETE_PRODUCT_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: { error },
      });
    }
  };
};

export const updateProducts = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });
    const res = await axios.post(`/product/update`, form);
    if (res.status === 201) {
      dispatch({ type: productConstants.UPDATE_PRODUCT_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAILURE,
        payload: { error },
      });
    }
  };
};

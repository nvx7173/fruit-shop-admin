import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const getAllOrder = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.GET_ALL_ORDERS_REQUEST });
      const res = await axios.get("/orders");
      if (res.status === 200) {
        dispatch({
          type: orderConstants.GET_ALL_ORDERS_SUCCESS,
          payload: res.data.order,
        });
      } else {
        dispatch({
          type: orderConstants.GET_ALL_ORDERS_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

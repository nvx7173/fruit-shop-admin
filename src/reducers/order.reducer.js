import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_ALL_ORDERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.GET_ALL_ORDERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        orders: action.payload,
      };
      break;
    case orderConstants.GET_ALL_ORDERS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};

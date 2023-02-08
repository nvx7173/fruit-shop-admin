import { userContants } from "../actions/constants";

const initState = {
  error: null,
  user: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userContants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userContants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload.user,
      };
      break;
    case userContants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};

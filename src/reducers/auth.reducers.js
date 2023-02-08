import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: {
    fullname: "",
    email: "",
    picture: "",
  },
  userList: [],
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
  contacts: [],
};

const buildNewUsers = (useList, user) => {
  return [
    ...useList,
    {
      _id: user._id,
      fullname: user.fullname,
      role: user.role,
      email: user.email,
    },
  ];
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.GET_ALL_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.GET_ALL_USERS_SUCCESS:
      state = {
        ...state,
        userList: action.payload.user,
        loading: false,
      };
      break;
    case authConstants.GET_ALL_USERS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.USER_REGISTER_SUCCESS:
      const userData = action.payload.userData;
      const updatedUsers = buildNewUsers(state.userList, userData);
      state = {
        ...state,
        userList: updatedUsers,
        loading: false,
      };
      break;
    case authConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case authConstants.UPDATE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.UPDATE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case authConstants.UPDATE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case authConstants.GET_ALL_CONTACT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.GET_ALL_CONTACT_SUCCESS:
      state = {
        ...state,
        contacts: action.payload.cont,
        loading: false,
      };
      break;
    case authConstants.GET_ALL_CONTACT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }

  return state;
};

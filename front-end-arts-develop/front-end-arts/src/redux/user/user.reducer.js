import UserActionTypes from "./user.type";
const INITIAL_STATE = {
  currentUser: {
    token: "",
    requestToken: "",
    userName: "",
    roles: [],
  },
  err: null,
  status: "",
  userInfo:[]
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        status: UserActionTypes.SIGN_IN_SUCCESS,
      };
    case UserActionTypes.EMAIL_SIGN_IN_PROCESSING:
      return {
        ...state,
        status: UserActionTypes.EMAIL_SIGN_IN_PROCESSING,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: INITIAL_STATE.currentUser,
        err: action.payload,
        status: UserActionTypes.SIGN_IN_FAILURE,
      };
      case UserActionTypes.SIGN_OUT_SUCCESS:
        return {
          ...state,
          status:UserActionTypes.SIGN_OUT_SUCCESS,
        };

//register
      case UserActionTypes.SIGN_UP_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
          status: UserActionTypes.SIGN_UP_SUCCESS
        };
      case UserActionTypes.SIGN_UP_PROCESSING:
        return {
          ...state,
          status: UserActionTypes.SIGN_UP_PROCESSING,
        };
      case UserActionTypes.SIGN_UP_FAILURE:
        return {
          ...state,
          err: action.payload
        };

//save 
case UserActionTypes.SAVE_USER_SUCCESS:
  return {
    ...state,
    userInfo: [...state.userInfo, action.payload],
    status: "",
  };
case UserActionTypes.SAVE_USER_PROCCESING:
  return {
    ...state,
    status: UserActionTypes.SAVE_USER_PROCCESING,
  };
case UserActionTypes.SAVE_USER__FAIL:
  return {
    ...state,
    status: UserActionTypes.SAVE_USER__FAIL,
    errors: action.payload
  };
    default:
      return state ;
  }
};
export default userReducer;

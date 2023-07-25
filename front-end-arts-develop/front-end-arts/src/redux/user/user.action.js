import UserActionTypes from "./user.type";

export const signInStart = (loginInfo) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: loginInfo,
});
export const signInProcessing = () => ({
  type: UserActionTypes.EMAIL_SIGN_IN_PROCESSING,
  payload: "",
});

export const signInSuccess = (userInfo) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: userInfo,
});

export const signInFailure = (err) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: err,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
  payload: "",
});


export const signUpStart = (registerInfo) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: registerInfo,
});
export const signUpProcessing = () => ({
  type: UserActionTypes.SIGN_UP_PROCESSING,
  payload: "",
});

export const signUpSuccess = (registerInfo) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: registerInfo,
});

export const signUpFailure = (err) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: err,
});
//SAVE CHANGE 
export const saveUserStart = (userInfo) => ({
  type: UserActionTypes.SAVE_USER_START,
  payload: userInfo,
});

export const saveUserProccesing = () => ({
  type: UserActionTypes.SAVE_USER_PROCCESING,
  payload: "",
});
export const saveUserSuccess = (users) => ({
  type:UserActionTypes.SAVE_USER_SUCCESS,
  payload: users,
});
export const saveUserFail = (error) => ({
  type:UserActionTypes.SAVE_USER__FAIL,
  payload: error,
});

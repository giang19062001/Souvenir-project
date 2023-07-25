import { all, call, put, takeLatest, delay } from "redux-saga/effects";
import api from "../../api/client";
import {
  signInFailure,
  signInProcessing,
  signInSuccess,
  signUpProcessing,
  signUpFailure,
  signUpSuccess,
  saveUserFail,
  saveUserProccesing,
  saveUserSuccess,
} from "./user.action";
import UserActionTypes from "./user.type";

const callAPILogin = async (loginInfo) => {
  try {
    const res = await api.post("/api/Logins/Login", loginInfo.payload);
    console.log(loginInfo.payload);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export function* login(loginInfo) {
  try {
    yield put(signInProcessing());

    const res = yield call(callAPILogin, loginInfo);
    console.log("res: ", res);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("refreshToken", res.data.requestToken);
    localStorage.setItem("userName", res.data.userName);
    yield put(signInSuccess(res.data));
    yield delay(2000);

    if (res.data.userRoles[0] === "admin") {
      window.location.href = "/admin";
    }
    if (res.data.userRoles[0] === "user") {
      window.location.href = "/";
    } else {
      // window.location.href = '/assistant'
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, login);
}

//resgister
//resgister
//resgister
//resgister
//resgister
//resgister
const callAPIRegister = async (registerInfo) => {
  try {
    console.log(registerInfo);
    const res = api.post("/api/Users/CreateUser", registerInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
export function* register(registerInfo) {
  try {
    yield put(signUpProcessing());
    const res = yield call(callAPIRegister, registerInfo.payload);
    yield delay(2000);
    console.log("register: ", res);
    yield put(signUpSuccess());
    yield delay(1500);
    window.location.href = "/login";
  } catch (error) {
    yield put(signUpFailure(error));
  }
}
export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, register);
}

//save
const callAPISaveUser = async (userInfo) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  let formData = new FormData();
  const obj = {
    userId: userInfo.userId,
    userFullName: userInfo.userFullName,
    userEmail: userInfo.userEmail,
    userPhone: userInfo.userPhone,
    userAddress: userInfo.userAddress,
    userGender: userInfo.userGender,
    userRole: 3,
  };

  console.log("userInfo.Image", userInfo.Image);
  if (userInfo.Image === undefined) {
    const element = userInfo.userAvatar;

    const objImage = { ...obj, userAvatar: element };

    formData.append("userJson", JSON.stringify(objImage));
  } else {
    const element = userInfo.Image[0];
    console.log("element", element);
    formData.append("files", element);
    formData.append("userJson", JSON.stringify(obj));
  }

  const res = await api.post("/api/Users/UpdateUser", formData, config);
  return res;
};
export function* saveUser({ payload: userInfo }) {
  try {
    yield put(saveUserProccesing());
    // Call API tao product:
    const res = yield call(callAPISaveUser, userInfo);
    yield put(saveUserSuccess(res.data));

    window.location.href = "/user/0";
  } catch (error) {
    yield put(saveUserFail(error));
  }
}
export function* onCreateProductStart() {
  yield takeLatest(UserActionTypes.SAVE_USER_START, saveUser);
}

// Call hàm bắt action
export function* userSaga() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onCreateProductStart),
  ]);
}

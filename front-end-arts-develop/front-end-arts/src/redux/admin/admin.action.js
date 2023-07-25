import adminActionTypes from "./admin.type";

export const createAssistantStart = (assistantInfo) => ({
    type: adminActionTypes.CREATE_ASSISTANT_START,
    payload: assistantInfo,
  });
  
  export const createAssistantProccesing = () => ({
    type: adminActionTypes.CREATE_ASSISTANT_PROCCESING,
    payload: "",
  });
  export const createAssistantSuccess = (assistantInfo) => ({
    type: adminActionTypes.CREATE_ASSISTANT_SUCCESS,
    payload: assistantInfo,
  });
  export const createAssistantFail = (error) => ({
    type: adminActionTypes.CREATE_ASSISTANT_FAIL,
    payload: error,
  });
  export const getAllUser = (userInfo) =>({
    type : adminActionTypes.GET_ALL_USER,
    payload : userInfo,
  })
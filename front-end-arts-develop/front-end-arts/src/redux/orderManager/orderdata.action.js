import orderActionTypes from "./orderdata.type";

export const getAllOrder = (orderInfo) =>({
    type : orderActionTypes.GET_ALL_ORDER,
    payload : orderInfo,
  })

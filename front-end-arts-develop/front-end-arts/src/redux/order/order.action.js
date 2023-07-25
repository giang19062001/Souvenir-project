import orderActionType from "./order.type";
// CHECK OUT
export const addOrder = (orderInfo) => ({
    type: orderActionType.ADD_ORDER,
    payload: orderInfo,
  });
  export const addOrderProcessing = orderInfo => ({
    type: orderActionType.ADD_ORDER_PROCESSING,
    payload: orderInfo,
  });
  export const addOrderSuccess = (orderInfo) => ({
    type: orderActionType.ADD_ORDER_SUCCESS,
    payload: orderInfo,
  });
  export const afterOrderSuccess = () => ({
    type: orderActionType.AFTER_ORDER_SUCCESS,
    payload:"" ,
  });
  export const addOrderFail = (error) => ({
    type: orderActionType.ADD_ORDER_FAIL,
    payload: error,
  });
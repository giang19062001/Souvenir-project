import orderDetailActionTypes from "./orderDetail.type";

export const getAllOrderDetail = (orderDetailInfo) =>({
    type : orderDetailActionTypes.GET_ALL_ORDER_DETAIL,
    payload : orderDetailInfo,
  })

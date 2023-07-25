import orderActionType from "./order.type";
const INITIAL_STATE = {
  order : {
    orderId: "",
    orderUserId: 0,
    orderAddress: "",
    orderDescription: "",
    orderCreateDate: null,
    orderStatus: 0,
    orderPaymentMethods: 0,
    orderDeliveryType: 0,
    orderTotal: 0,

  },
  status: "",
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      //check out 
      case orderActionType.ADD_ORDER_SUCCESS:
        return {
          ...state,
          order: action.payload.data,
          status: orderActionType.ADD_ORDER_SUCCESS ,
        
        };
      case orderActionType.ADD_ORDER_PROCESSING:
        return {
          ...state,
        };
        case orderActionType.AFTER_ORDER_SUCCESS:
          return {
            ...state,
            status: orderActionType.AFTER_ORDER_SUCCESS ,
          };
        case orderActionType.ADD_ORDER_FAIL:
            return {
              ...state,
              order: INITIAL_STATE.order,
              err: action.payload,

            };
    default:
      return state;
  }
};

export default orderReducer;

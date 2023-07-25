import orderDetailActionTypes from './orderDetail.type';
const INITIAL_STATE = {
  status: "",
  orderDetails: [],
};

const orderDetailsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case orderDetailActionTypes.GET_ALL_ORDER_DETAIL:
          return{
              ...state,
              orderDetails:[...action.payload]
          }
      default:
        return state;
    }
  };

export default orderDetailsReducer;
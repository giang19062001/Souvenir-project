import orderActionTypes from './orderdata.type';
const INITIAL_STATE = {
  status: "",
  orders: [],
};

const orderDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case orderActionTypes.GET_ALL_ORDER:
          return{
              ...state,
              orders:[...action.payload]
          }
      default:
        return state;
    }
  };

export default orderDataReducer;
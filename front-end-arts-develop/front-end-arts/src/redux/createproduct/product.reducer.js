import productActionTypes from './product.type';
const INITIAL_STATE = {
  status: "",
  products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products,action.payload],
        status: "",
      };
    case productActionTypes.CREATE_PRODUCT_PROCCESING:
      return {
        ...state,
        status: productActionTypes.CREATE_PRODUCT_PROCCESING,
      };
    case productActionTypes.CREATE_PRODUCT_FAIL:
      return {
        ...state,
        status: productActionTypes.CREATE_PRODUCT_FAIL,
      };
    case productActionTypes.GET_ALL_PRODUCT:
        return{
            ...state,
            products:[...action.payload]
        }
    default:
      return state;
  }
};

export default productReducer;
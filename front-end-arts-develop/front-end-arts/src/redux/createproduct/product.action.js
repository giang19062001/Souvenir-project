import productActionTypes from "./product.type";

export const createProductStart = (productInfo) => ({
    type: productActionTypes.CREATE_PRODUCT_START,
    payload: productInfo,
  });
  
  export const createProductProccesing = () => ({
    type: productActionTypes.CREATE_PRODUCT_PROCCESING,
    payload: "",
  });
  export const createProductSuccess = (productInfo) => ({
    type: productActionTypes.CREATE_PRODUCT_SUCCESS,
    payload: productInfo,
  });
  export const createProductFail = (error) => ({
    type: productActionTypes.CREATE_PRODUCT_FAIL,
    payload: error,
  });
  export const getAllProduct = (productInfo) =>({
    type : productActionTypes.GET_ALL_PRODUCT,
    payload : productInfo,
  })
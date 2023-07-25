import categoryActionTypes from "./category.type";

export const createCategoryStart = (categoryInfo) => ({
    type: categoryActionTypes.CREATE_CATEGORY_START,
    payload: categoryInfo,
  });
  
  export const createCategoryProccesing = () => ({
    type: categoryActionTypes.CREATE_CATEGORY_PROCCESING,
    payload: "",
  });
  export const createCategorySuccess = (categoryInfo) => ({
    type: categoryActionTypes.CREATE_CATEGORY_SUCCESS,
    payload: categoryInfo,
  });
  export const createCategoryFail = (error) => ({
    type: categoryActionTypes.CREATE_CATEGORY_FAIL,
    payload: error,
  });
  export const getAllCategories = (categoryInfo) =>({
    type : categoryActionTypes.GET_ALL_CATEGORIES,
    payload : categoryInfo,
  })
import categoryActionTypes from './category.type';
const INITIAL_STATE = {
  status: "",
  categories: [],
};

const categorytReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryActionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories,action.payload],
        status: "",
      };
    case categoryActionTypes.CREATE_CATEGORY_PROCCESING:
      return {
        ...state,
        status: categoryActionTypes.CREATE_CATEGORY_PROCCESING,
      };
    case categoryActionTypes.CREATE_CATEGORY_FAIL:
      return {
        ...state,
        status: categoryActionTypes.CREATE_CATEGORY_FAIL,
      };
    case categoryActionTypes.GET_ALL_CATEGORIES:
        return{
            ...state,
            categories:[...action.payload]
        }
    default:
      return state;
  }
};

export default categorytReducer;
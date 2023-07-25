import adminActionTypes from './admin.type';
const INITIAL_STATE = {
  status: "",
  users : [],
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case adminActionTypes.CREATE_ASSISTANT_SUCCESS:
      return {
        ...state,
        users: [...state.users,action.payload],
        status: "",
      };
    case adminActionTypes.CREATE_ASSISTANT_PROCCESING:
      return {
        ...state,
        status: adminActionTypes.CREATE_ASSISTANT_PROCCESING,
      };
    case adminActionTypes.CREATE_ASSISTANT_FAIL:
      return {
        ...state,
        status: adminActionTypes.CREATE_ASSISTANT_FAIL,
      };
    case adminActionTypes.GET_ALL_USER:
        return{
            ...state,
            users:[...action.payload]
        }
    default:
      return state;
  }
};

export default adminReducer;
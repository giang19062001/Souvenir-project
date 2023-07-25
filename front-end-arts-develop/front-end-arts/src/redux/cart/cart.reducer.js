import cartActionType from "./cart.type";
const INITIAL_STATE = {
  cart: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionType.ADD_ITEM_CART:
          const temp = state.cart.find((item)=>item.productId===action.payload.productId);    
          console.log("temp",temp);  
          if(temp===undefined){
            return {
              ...state,
              cart: [...state.cart,action.payload],
            }
          }else{
            const carts = state.cart.map(cartItem =>
              cartItem.productId === action.payload.productId
                ? {...cartItem, quantity: parseInt(cartItem.quantity) + parseInt(action.payload.quantity) }
                : {...cartItem}
            );
            return {
              ...state,
              cart: carts
            }
          };
          
    case cartActionType.DELETE_ITEM_CART:
      console.log(action.payload);
      return{
        
        ...state,
        cart: [...state.cart.filter((item) => item.productId!==action.payload)],
      };
      case cartActionType.DELETE_ALL_CART:
        console.log(action.payload);
        return{
          
          cart:[]
        };

    default:
      return state;
  }
};

export default cartReducer;

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";
import orderReducer from "./order/order.reducer";
import categorytReducer from './category/category.reducer';
import productReducer from './createproduct/product.reducer';
import adminReducer from './admin/admin.reducer';
import orderDetailsReducer from './orderDetail/orderDetail.reducer';
import orderDataReducer from "./orderManager/orderdata.reducer";

const persistConfig = {
  key: "root", 
  storage,
  whitelist: ["cart","category","users","orders","products","orderdetails"],
};

console.log(cartReducer);
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order:orderReducer,
  category:categorytReducer,
  products:productReducer,
  users : adminReducer,
  orders : orderDataReducer,
  orderdetails : orderDetailsReducer
});
export default persistReducer(persistConfig, rootReducer);

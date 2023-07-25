import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/client";
import { addOrderProcessing,addOrderSuccess,addOrderFail, afterOrderSuccess } from "./order.action";
import orderActionType from "./order.type";
import { selectShopCart } from "../cart/cart.selector";
import {select} from 'redux-saga/effects';
const callAPIOrder= async (orderInfo) => {

    try {

      const res = api.post("/api/Orders/CreateOrder", orderInfo, {headers: {
        "Content-Type": "application/json"}
    });
      return res;
  
    } catch (error) {
        throw new Error(error.message);
    }
  }
  const callAPIOrderDetail= async (detailInfo) => {
    try {

      const res = api.post("/api/OrderDetails/CreateOrderDetail", detailInfo, {headers: {
        "Content-Type": "application/json"}
    });
      return res;
    
    } catch (error) {
        throw new Error(error.message);
    }
  }
  export function* addOrderInfo (orderInfo) {

    const cartList = yield select(selectShopCart);

  try {  
      const res = yield call(callAPIOrder, orderInfo.payload);
      console.log("orderInfo.payload",orderInfo.payload);

      console.log("res order",res.data);
      yield put(addOrderProcessing(res.data));
      let arr = [];
      for(let i = 0 ;i<cartList.length ; i++){
        console.log("res.data.orderTypeId",res.data.orderTypeId)
        const obj = {
        detailOrderId:res.data.orderId,
        detailProductId: cartList[i].productId,
        detailProductImage: cartList[i].productImage,
        detailPrice:cartList[i].productPrice ,
        detailQuantity:cartList[i].quantity ,
        detailProductName: cartList[i].productName
        }
        arr.push(obj);
      }
      console.log("detail",arr);
      for(let i = 0 ;i<cartList.length ; i++){
        const resDetail = yield call(callAPIOrderDetail, arr[i]);
      }
      yield put(addOrderSuccess(res));
     

    } catch (error) {
        yield put(addOrderFail(error));
      }

  }
  export function* onAddOrderInfo() {
    yield takeLatest(orderActionType.ADD_ORDER, addOrderInfo);
  }


export function* orderSaga() {
  yield all([call(onAddOrderInfo)]);
}

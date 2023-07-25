import { createSelector } from "reselect";


const selectOrderState = (state) => state.order;


export const selectOrder = createSelector(
  [selectOrderState],
  (order) => order.order
);

export const selectOrderStatus = createSelector(
  [selectOrderState],
  (order) => order.status
);

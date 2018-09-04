import { UPDATE_CART } from "../actionTypes";

const initialState = {
  products: [],
  totalPrice: 0,
  count: 0
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_CART:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}
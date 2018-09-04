import { takeEvery, all, select, put } from 'redux-saga/effects';
import { ADD_TO_CART, UPDATE_CART } from '../actionTypes';

const updateCart = function* (data) {
  const { _id, price } = data;

  // Get products state
  let products = yield select(({ cart }) => cart.products);
  const product = products.find(({ id }) => id === _id);

  // Check if product is not already in the cart
  if (!product) {
    products = [...products, {id: _id, price, quantity: 1}];
  } else {
    // Find product by id and increase it's quantity
    products = [{ ...product, quantity: product.quantity + 1 }, ...products.filter(({ id }) => id !== _id)]
    console.log(products)
  }

  const totalPrice = products.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
  const count = products.length;

  yield put({ type: UPDATE_CART, payload: { products, totalPrice, count } });
}

const addToCartSaga = function* () {
  yield takeEvery(ADD_TO_CART, ({ payload }) => updateCart(payload));
}

export default function* rootSaga () {
  yield all([
    addToCartSaga()
  ]);
}
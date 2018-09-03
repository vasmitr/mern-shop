import { takeEvery, put, call, all } from 'redux-saga/effects';
import { FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_ERROR, FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS } from '../actionTypes';
import axios from '../axios';

const _requestCategories = () => {
  return axios.get('/catalog/categories/')
  .then(res => ({ res }))
  .catch(err => ({ err }));
}

const requestCategories = function* () {
  const { res, err } = yield call(_requestCategories);

  if (res) {
    yield put({ type: FETCH_CATEGORIES_SUCCESS, payload: res.data });
  } else {
    yield put({ type: FETCH_CATEGORIES_ERROR, payload: err.response.data });
  }
}

const fetchCategories = function* () {
  yield takeEvery(FETCH_CATEGORIES, () => requestCategories());
}

const _requestProducts = (data) => {
  const category_id = (data && data.category_id) || '';
  return axios.get(`/catalog/products/${ category_id }`)
  .then(res => ({ res }))
  .catch(err => ({ err }));
}

const requestProducts = function* (data) {
  const { res, err } = yield call(_requestProducts, data);

  if (res) {
    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data });
  } else {
    yield put({ type: FETCH_PRODUCTS_ERROR, payload: err.response.data });
  }
}

const fetchProducts = function* () {
  yield takeEvery(FETCH_PRODUCTS, ({ payload }) => requestProducts(payload));
}

export default function* rootSaga () {
  yield all([
    fetchCategories(),
    fetchProducts()
  ]);
}
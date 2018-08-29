import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects'
import { REGISTER_USER, REGISTER_SUCESS, REGISTER_ERROR } from '../actionTypes'

const registerUser = (data) => {
  return axios.post('http://127.0.0.1:5000/api/users/register', data)
    .then(res => ({ res }))
    .catch(err => ({ err }));
} 

const createUser = function* (data) {
  const { res, err } = yield call(registerUser, data);
  if (res) {
    yield put({ type: REGISTER_SUCESS, payload: res.data });
  } else {
    yield put({ type: REGISTER_ERROR, payload: err.response.data });
  }
}

export const registerSaga = function* () {
  yield takeEvery(REGISTER_USER, ({ payload }) => createUser(payload));
}
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { takeEvery, call, put } from 'redux-saga/effects'
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../actionTypes'

const _createUser = (data) => {
  return axios.post('http://127.0.0.1:5000/api/users/register', data)
    .then(res => ({ res }))
    .catch(err => ({ err }));
} 

const createUser = function* (data) {
  const { res, err } = yield call(_createUser, data);
  if (res) {
    yield put({ type: REGISTER_SUCCESS, payload: res.data });
  } else {
    yield put({ type: REGISTER_ERROR, payload: err.response.data });
  }
}

export const registerSaga = function* () {
  yield takeEvery(REGISTER_USER, ({ payload }) => createUser(payload));
}

const _loginUser = (data) => {
  return axios.post('http://127.0.0.1:5000/api/users/login', data)
    .then(res => ({ res }))
    .catch(err => ({ err }));
}

const loginUser = function* (data) {
  const { res, err } = yield call(_loginUser, data);
  if (res) {
    // Extract user
    const decoded = jwt_decode(res.data.token);
    // TODO: save token
    yield put({ type: LOGIN_SUCCESS, payload: decoded });
  } else {
    yield put({ type: LOGIN_ERROR, payload: err.response.data });
  }
}

export const loginSaga = function* () {
  yield takeEvery(LOGIN, ({ payload }) => loginUser(payload));
}
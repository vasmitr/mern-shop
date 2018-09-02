import axios from '../axios';
import jwt_decode from 'jwt-decode';
import { takeEvery, call, put, all } from 'redux-saga/effects';
import { history } from '../App';


import setToken from '../utils/setToken';
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from '../actionTypes'

const _createUser = (data) => {
  return axios.post('/users/register', data)
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

const registerSaga = function* () {
  yield takeEvery(REGISTER_USER, ({ payload }) => createUser(payload));
}

const _loginUser = (data) => {
  return axios.post('/users/login', data)
    .then(res => ({ res }))
    .catch(err => ({ err }));
}

const loginUser = function* (data) {
  const { res, err } = yield call(_loginUser, data);
  if (res) {
    const { token } = res.data;
    // Extract user
    const decoded = jwt_decode(token);
    // Set Authorization header
    setToken(token);
    // Store in browser
    localStorage.setItem('token', token);

    history.push('/');
    
    yield put({ type: LOGIN_SUCCESS, payload: decoded });
  } else {
    yield put({ type: LOGIN_ERROR, payload: err.response.data });
  }
}

const loginSaga = function* () {
  yield takeEvery(LOGIN, ({ payload }) => loginUser(payload));
}

const _logoutUser = function () {
  setToken(null);
  localStorage.removeItem('token');
  history.push('/');
}

const logoutSaga = function* () {
  yield takeEvery(LOGOUT, ({ history }) => _logoutUser(history));
}

export default function* () {
  yield all([
    registerSaga(),
    loginSaga(),
    logoutSaga()
  ])
}
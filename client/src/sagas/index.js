import { all } from 'redux-saga/effects';

import authSagas from './authSagas';

export default function* () {
  yield all([
    authSagas()
  ]);
}

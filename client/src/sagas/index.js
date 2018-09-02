import { all } from 'redux-saga/effects';

import authSagas from './authSagas';
import catalogSagas from './catalogSagas';

export default function* () {
  yield all([
    authSagas(),
    catalogSagas()
  ]);
}

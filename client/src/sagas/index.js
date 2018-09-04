import { all } from 'redux-saga/effects';

import authSagas from './authSagas';
import catalogSagas from './catalogSagas';
import cartSagas from './cartSagas';

export default function* () {
  yield all([
    authSagas(),
    catalogSagas(),
    cartSagas()
  ]);
}

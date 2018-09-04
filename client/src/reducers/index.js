import { combineReducers } from 'redux';

import auth from './auth';
import catalog from './catalog';
import cart from './cart';

export default combineReducers({
  auth,
  catalog,
  cart
});

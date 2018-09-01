import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { register } from '../reducers'
import { registerSaga, loginSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({register}),
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(registerSaga);
sagaMiddleware.run(loginSaga);

const action = (type, payload) => store.dispatch({type, payload})

export { store, action };

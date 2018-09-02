import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { auth } from '../reducers'
import { registerSaga, loginSaga, logoutSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ auth }),
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(registerSaga);
sagaMiddleware.run(loginSaga);
sagaMiddleware.run(logoutSaga);

const action = (type, payload) => store.dispatch({type, payload})

export { store, action };
